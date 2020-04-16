from django.contrib.auth import get_user_model
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.renderers import JSONRenderer
from api.serializers import CreateUserSerializer, SubjectSerializer, ProfileSerializer
from .smsc_api import *
import random
from .models import Subject, Question, Profile
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
        users = User.objects.select_related('profile').all()
        print(users)
        rating = []
        for user in users:
            rating.append(user.profile)
        return Response(rating, status=status.HTTP_200_OK)
    def post(self, request):
    
        print(request.data['username'])
        user = User.objects.get(username=request.data['username'])
        rating =model_to_dict(Profile.objects.get(user=user))        
        print(rating)
        return Response(rating, status=status.HTTP_200_OK)
        

        