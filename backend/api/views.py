from django.contrib.auth import get_user_model
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token
from rest_framework import status
from rest_framework.views import APIView
from api.serializers import CreateUserSerializer
from .smsc_api import *
import random

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
        cod = str(random.randint(100000,1000000))
        global codes
        codes[request.data['username']] = cod
        print(cod)
        r = smsc.send_sms("7" + request.data['username'],cod, sender="sms")
        return Response(status=status.HTTP_200_OK)

class CheckMessage(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        global codes
        if codes[request.data['username']] == request.data['cod']:
            return Response(status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_417_EXPECTATION_FAILED)
        