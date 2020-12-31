from django.contrib.auth import get_user_model
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.renderers import JSONRenderer
from api.serializers import CreateUserSerializer
from .smsc_api import *
import random
from .models import Subject, Question, Profile, Battle
from django.contrib.auth.models import User
from django.forms.models import model_to_dict
import datetime
from django.contrib.auth.models import update_last_login
from rest_framework.authtoken.views import ObtainAuthToken
from django.db.models import Q
from exponent_server_sdk import DeviceNotRegisteredError
from exponent_server_sdk import PushClient
from exponent_server_sdk import PushMessage
from exponent_server_sdk import PushResponseError
from exponent_server_sdk import PushServerError
from requests.exceptions import ConnectionError
from requests.exceptions import HTTPError


# Basic arguments. You should extend this function with the push features you
# want to use, or simply pass in a `PushMessage` object.
def send_push_message(token, message, extra=None):
    try:
        response = PushClient().publish(
            PushMessage(to=token,
                        body=message,
                        data=extra))
    except PushServerError as exc:
        # Encountered some likely formatting/validation error.
        rollbar.report_exc_info(
            extra_data={
                'token': token,
                'message': message,
                'extra': extra,
                'errors': exc.errors,
                'response_data': exc.response_data,
            })
        raise
    except (ConnectionError, HTTPError) as exc:
        # Encountered some Connection or HTTP error - retry a few times in
        # case it is transient.
        rollbar.report_exc_info(
            extra_data={'token': token, 'message': message, 'extra': extra})
        raise self.retry(exc=exc)

    try:
        # We got a response back, but we don't know whether it's an error yet.
        # This call raises errors so we can handle them with normal exception
        # flows.
        response.validate_response()
    except DeviceNotRegisteredError:
        # Mark the push token as inactive
        from notifications.models import PushToken
        PushToken.objects.filter(token=token).update(active=False)
    except PushResponseError as exc:
        # Encountered some other per-notification error.
        rollbar.report_exc_info(
            extra_data={
                'token': token,
                'message': message,
                'extra': extra,
                'push_response': exc.push_response._asdict(),
            })
        raise self.retry(exc=exc)


class LoginToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        result = super().post(request, *args, **kwargs)
        token = Token.objects.get(key=result.data['token'])
        update_last_login(None, token.user)
        return result


codes = {}
class CreateUserAPIView(CreateAPIView):
    serializer_class = CreateUserSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        token = Token.objects.create(user=serializer.instance)
        token_data = {"token": token.key}
        update_last_login(None, token.user)
        return Response({**serializer.data, **token_data}, status=status.HTTP_201_CREATED, headers=headers)


class LogoutUserAPIView(APIView):
    queryset = get_user_model().objects.all()

    def get(self, request, format=None):
        # simply delete the token to force a login
        # request.user.auth_token.delete()
        return Response(status=status.HTTP_200_OK)

class SendMessage(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request,  *args, **kwargs):
        smsc = SMSC()
        print(request.data)
        cod = str(random.randint(1000,10000))
        global codes
        codes[request.data['username']] = cod
        print(cod)
        r = smsc.send_sms("7" + request.data['username'],cod,sender="EntFun")
        return Response(status=status.HTTP_200_OK)

class CheckMessage(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        global codes
        if codes[request.data['username']] == request.data['cod']:
            return Response(status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_417_EXPECTATION_FAILED)
        
class GetQuestions(APIView):
    permission_classes = [IsAuthenticated]
    # permission_classes = [AllowAny]

    def post(self,request, *args, **kwargs):
        print(request.data)
        questions = Question.objects.filter(subject_id=request.data['subject_id']).order_by('?')[:10].values()
        # random_questions = random.sample(questions, 5)
        print('Длина questions ===== ' + str(len(questions)))
        print(questions[0])
        return Response(questions, status=status.HTTP_200_OK)


# class SubjectCreate(CreateAPIView):
#     serializer_class = CreateSubjectSerializer
#     permission_classes = [AllowAny]
#     def create(self, request, *args, **kwargs):
#         serializer = self.get_serializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         self.perform_create(serializer)
#         headers = self.get_success_headers(serializer.data)
#         return Response({**serializer.data}, status=status.HTTP_201_CREATED, headers=headers)
        

class GetSubjects(APIView):
    permission_classes = [IsAuthenticated]
    # permission_classes = [AllowAny]
    # serializer_class = SubjectSerializer
    def get(self, request):
        subjects = Subject.objects.all().values()
        return Response(subjects, status=status.HTTP_200_OK)


class Profile(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = User.objects.select_related('profile').get(username=request.data['username'])
        return Response({'first_name': user.first_name, 'last_name':user.last_name, 'city':user.profile.city, 'school':user.profile.school,'rating':user.profile.rating}, status=status.HTTP_200_OK)

    def post(self, request):
        user = User.objects.select_related('profile').get(username=request.data['username'])
        user.profile.city = request.data['city']
        user.profile.school = request.data['school']
        user.first_name = request.data['name']
        user.last_name = request.data['surname']
        user.profile.pushToken =request.data['pushToken']
        user.save()
        return Response( status=status.HTTP_200_OK)


class SavePushToken(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = User.objects.select_related('profile').get(username=request.data['username'])
        user.profile.pushToken =request.data['pushToken']
        user.save()
        return Response( status=status.HTTP_200_OK)


class SendPush(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        user = User.objects.select_related('profile').get(username=request.data['username'])
        user2 = User.objects.select_related('profile').get(username=request.data['enemy'])
        send_push_message(token = user2.profile.pushToken, message = user.first_name + " хочет сразиться" )
        return Response( status=status.HTTP_200_OK)

# -----------------------------------------------------++++++++++++
class ProfileGet(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = User.objects.select_related('profile').get(username=request.data['username'])
        return Response({'first_name': user.first_name, 'last_name':user.last_name, 'city':user.profile.city, 'school':user.profile.school,'rating':user.profile.rating}, status=status.HTTP_200_OK)


class GetRating(APIView):
    permission_classes = [IsAuthenticated]

    def get(self,request):
        users = User.objects.select_related('profile').all()
        # ratings = Profile.objects.all()
        print(users)
        # temp = User.objects.select_related('profile').all()
        rating = []
        for use in users:
            if(use.username=='prove'):
                continue
            rating.append({"name": use.first_name,"rating":use.profile.rating, "number":use.username})
        return Response(rating, status=status.HTTP_200_OK)

    def post(self, request):
        
        user = User.objects.select_related('profile').get(username=request.data['username'])
        if('rating' in request.data):
            user.profile.rating= user.profile.rating + request.data['rating']
            user.save()
            return Response(model_to_dict(user.profile), status=status.HTTP_200_OK)
        else:
            return Response(model_to_dict(user.profile), status=status.HTTP_200_OK)
# create a battle and invite enemy
class GetBattle(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self,request):
        user = User.objects.get(username=request.data['username'])
        today = datetime.date.today() + datetime.timedelta(days=1)
        last_hour = datetime.date.today() - datetime.timedelta(minutes=30)
        last_users=User.objects.filter(Q(last_login__range=(last_hour, today)),~Q(username='prove'),~Q(username=request.data['username']))
        random_user = random.randint(0,len(last_users)-1)
        print(last_users)
        enemy= last_users[random_user]
        battle = Battle.objects.create(user1= user, user2=enemy )
        print(model_to_dict(battle))
        if request.data['choose'] == 'random':
            questions1 = Question.objects.filter(subject_id=).order_by('?')[:3].values()
            questions2 = Question.objects.filter(subject_id=3).order_by('?')[:3].values()
            questions3 = Question.objects.filter(subject_id=3).order_by('?')[:3].values()
            questions4 = Question.objects.filter(subject_id=3).order_by('?')[:3].values()
            battle.questions = {'questions_round_1':list(questions1), 'questions_round_2':list(questions2), 'questions_round_3':list(questions3), 'questions_round_4':list(questions4)}
            battle.save()
        if request.data['choose'] == 'subject':
            questions1 = Question.objects.filter(subject_id=request.data['subject_id']).order_by('?')[:3].values()
            questions2 = Question.objects.filter(subject_id=request.data['subject_id']).order_by('?')[:3].values()
            questions3 = Question.objects.filter(subject_id=request.data['subject_id']).order_by('?')[:3].values()
            questions4 = Question.objects.filter(subject_id=request.data['subject_id']).order_by('?')[:3].values()
            battle.questions = {'questions_round_1':list(questions1), 'questions_round_2':list(questions2), 'questions_round_3':list(questions3), 'questions_round_4':list(questions4)}
            battle.save()
        result = {'battleId':battle.id, 'enemy': enemy.username }
        send_push_message(token = enemy.profile.pushToken, message = user.first_name + " хочет сразиться" )
        return Response(result, status=status.HTTP_200_OK)

class GetOpponent(APIView):
    permission_classes = [IsAuthenticated]
# dodeat'
    def post(self, request):
        battle = Battle.objects.get(id= request.data['battleId'])
        
        battle.accept = request.data['accept']
        send_push_message(token = enemy.profile.pushToken, message , extra= )
        return Response(status=status.HTTP_200_OK)
            
            

class GetQuestionsForBattle(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        battle = Battle.objects.get(id= request.data['battleId'])
        if battle.started == 1:
            battle.started +=1
            battle.save()
            print('------------1')
            return Response(battle.questions['questions_round_1'], status=status.HTTP_200_OK)
        elif battle.started == 2:
            battle.started +=1
            battle.save()
            print('------------2')
            return Response(battle.questions['questions_round_1'], status=status.HTTP_200_OK)
        

        elif battle.started == 3:
            battle.started +=1
            battle.save()
            print('------------3')
            return Response(battle.questions['questions_round_2'], status=status.HTTP_200_OK)

        elif battle.started == 4:
            battle.started +=1
            battle.save()
            print('------------4')
            return Response(battle.questions['questions_round_2'], status=status.HTTP_200_OK)


        elif battle.started == 5:
            battle.started +=1
            battle.save()
            print('------------5')
            return Response(battle.questions['questions_round_3'], status=status.HTTP_200_OK)

        elif battle.started == 6:
            battle.started +=1
            battle.save()
            print('------------6')
            return Response(battle.questions['questions_round_3'], status=status.HTTP_200_OK)


        elif battle.started == 7:
            battle.started +=1
            battle.save()
            print('------------7')
            return Response(battle.questions['questions_round_4'], status=status.HTTP_200_OK)
        elif battle.started == 8:
            battle.started +=1
            battle.save()
            print('------------8')

            return Response(battle.questions['questions_round_4'], status=status.HTTP_200_OK)
        # return Response(battle.questions, status=status.HTTP_200_OK)


class battle(APIView):
    permission_classes= [AllowAny]

    def post(self,request):
        user = User.objects.get(username=request.data['username'])
        battles=Battle.objects.select_related('user1','user2').filter(Q(user1=user.id) |  Q(user2=user.id) ,~Q(started=10))
        batte = []
        for bat in battles:
            batte.append({'battleId':bat.id,'result':bat.result, 'started':bat.started,'user1':bat.user1.first_name,'user2':bat.user2.first_name, 'total1':bat.user1Total, 'total2':bat.user2Total })
            
        return Response(batte, status=status.HTTP_200_OK)
        

class searchBattle(APIView):
    permission_classes=[AllowAny]

    def post(self, request):
        battle = Battle.objects.get(id=request.data['battleId'])
        if str(battle.user1) ==request.data['phone']:
            return Response({'battle':model_to_dict(battle),'users':{'name1':battle.user1.first_name, 'name2':battle.user2.first_name, 'you':1}}, status=status.HTTP_200_OK)
        else:
            return Response({'battle':model_to_dict(battle),'users':{'name1':battle.user1.first_name, 'name2':battle.user2.first_name, 'you':2}}, status=status.HTTP_200_OK)

class GetResult(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        battle = Battle.objects.get(id=request.data['battleId'])
        user = User.objects.get(username=request.data['username'])
        if str(battle.user1) == request.data['username']:
            print('first user in battle')
            if battle.started == 2 or battle.started == 3:
                battle.user1Round1 = request.data['round']
                battle.user1Total = battle.user1Total + request.data['score']
            elif battle.started == 4 or battle.started == 5:
                battle.user1Round2 = request.data['round']
                battle.user1Total = battle.user1Total + request.data['score']

            elif battle.started == 6 or battle.started == 7:
                battle.user1Round3 = request.data['round']
                battle.user1Total = battle.user1Total + request.data['score']

            elif battle.started == 8 or battle.started == 9:
                battle.user1Round4 = request.data['round']
                battle.user1Total = battle.user1Total + request.data['score']

                
        else:
            print('second user in battle')
            if battle.started == 2 or battle.started == 3:
                battle.user2Round1 = request.data['round']
                battle.user2Total = battle.user2Total + request.data['score']

            elif battle.started == 4 or battle.started == 5:
                battle.user2Round2 = request.data['round']
                battle.user2Total = battle.user2Total + request.data['score']

            elif battle.started == 6 or battle.started == 7:
                battle.user2Round3 = request.data['round']
                battle.user2Total = battle.user2Total + request.data['score']

            elif battle.started == 8 or battle.started == 9:
                battle.user2Round4 = request.data['round']
                battle.user2Total = battle.user2Total + request.data['score']
        if battle.started == 9:
            if battle.user1Total > battle.user2Total:
                battle.user1.profile.rating =battle.user1.profile.rating + 10
                battle.result = battle.user1
            elif battle.user1Total < battle.user2Total:
                battle.result = battle.user2
                battle.user2.profile.rating =battle.user2.profile.rating + 10

            else:
                battle.result = 11111
            
        battle.save()
        return Response(model_to_dict(battle), status=status.HTTP_200_OK)
        
