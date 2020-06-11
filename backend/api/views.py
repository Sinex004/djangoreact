from django.contrib.auth import get_user_model
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.renderers import JSONRenderer
from api.serializers import CreateUserSerializer, SubjectSerializer
from .smsc_api import *
import random
from .models import Subject, Question, Profile, Battle
from django.contrib.auth.models import User
from django.forms.models import model_to_dict


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
        print('Длина subjects ===== ' + str(len(subjects)))
        print(subjects[0])
        return Response(subjects, status=status.HTTP_200_OK)

class GetRating(APIView):
    permission_classes = [IsAuthenticated]
    # serializer_class = ProfileSerializer

    def get(self,request):
        users = Profile.objects.select_related('user').all()
        # ratings = Profile.objects.all()
        print(users)
        temp = User.objects.select_related('profile').all()
        rating = []
        for use in users:
            if(use.user.username=='prove'):
                continue
            print(use.user.username)
            rating.append({"username": use.user.username,"rating":use.rating})
        return Response(rating, status=status.HTTP_200_OK)

    def post(self, request):
        print(request.data['username'])
        user = User.objects.select_related('profile').get(username=request.data['username'])
        if('rating' in request.data):
            user.profile.rating= user.profile.rating + request.data['rating']
            user.save()
            return Response(model_to_dict(user.profile), status=status.HTTP_200_OK)
        else:
            return Response(model_to_dict(user.profile), status=status.HTTP_200_OK)
    
class GetBattle(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self,request):
        user = User.objects.get(username=request.data['username'])
        print(user)
        battles = Battle.objects.filter(started=0)
        if(len(battles)>0):
            battle = battles[0]
            battle.user2 = user
            battle.started = -1
            battle.save()
            print(model_to_dict(battle))
            result = {'battleId':battle.id, 'stat':'second'}
            return Response(result, status=status.HTTP_200_OK)
        else:
            battle = Battle.objects.create(user1= user )
            print(model_to_dict(battle))
            result = {'battleId':battle.id, 'stat':'first'}
            return Response(result, status=status.HTTP_200_OK)

# class GetOpponent(APIView):
#     permission_classes = [IsAuthenticated]
#     def post(self, request):
#         battle = Battle.objects.get(id= request.data['battleId'])
#         if battle.started == -1:
#             return Response( status=status.HTTP_200_OK)
            

class GetQuestionsForBattle(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        battle = Battle.objects.get(id= request.data['battleId'])
        questions = []
        if battle.started == -1:
            battle = Battle.objects.get(id=request.data['battleId'])
            print('this')
            print(battle.questions)
            if len(battle.questions) ==0:
                print('if')
                questions = Question.objects.filter(subject_id=3).order_by('?')[:10].values()
                print(questions)
                
                battle.questions = {'questions':list(questions)}
                battle.save()
            else:
                print('else')
                questions = battle.questions['questions'] #if questions is filled. mean that opponent is ready
            return Response(questions, status=status.HTTP_200_OK)
        else: #if questions is empty.mean that opponent not ready
            return Response(questions, status=status.HTTP_200_OK)


class GetResult(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        battle = Battle.objects.get(id=request.data['battleId'])
        user = User.objects.get(username=request.data['username'])
        if battle.user1 == user.id:
            battle.user1Answers = request.data['Answers']
            battle.user1Result = request.data['Result']
        else:
            battle.user2Answers = request.data['Answers']
            battle.user2Result = request.data['Result']
        battle.save()
        return Response(model_to_dict(battle), status=status.HTTP_200_OK)
        
