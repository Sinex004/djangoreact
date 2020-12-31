from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import *
from .smsc_api import *
import random
from .forms import PhoneForm, CheckForm

class HelloView(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request):
        content = {'message': 'Hello, World!'}
        return Response(content)

# def index(request):
#     return render(request, 'api/index.html', context)
our_cod = ""
def authed(phone):
    smsc = SMSC()
    print(phone)
    global our_cod 
    our_cod = str(random.randint(100000,1000000))
    r = smsc.send_sms(phone,our_cod, sender="sms")
def home(request):
    if request.method == "POST":
        print("wws")
        form = PhoneForm(request.POST)
        if form.is_valid():
            number = form.cleaned_data.get("phone")
            authed(number)
    else:
        form = PhoneForm()
    return render(request, 'home.html', {'form': form})
    
def check(request):
    if request.method == "POST":
        global our_cod
        form = CheckForm(request.POST)
        if form.is_valid():
            user_cod = form.cleaned_data.get("cod")
            if user_cod == our_cod:
                print("Success")
            else:
                print("Denied")
            
    else:
        form = CheckForm()
    return render(request, 'check.html', {'form': form})
    