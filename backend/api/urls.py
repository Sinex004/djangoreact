from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token
from .views import CreateUserAPIView, LogoutUserAPIView, SendMessage, CheckMessage, GetSubjects, GetQuestions, GetRating, GetBattle, GetQuestionsForBattle, GetResult, LoginToken, Profile, ProfileGet,battle,searchBattle

urlpatterns = [
    path('auth/login/',LoginToken.as_view(),name='auth_user_login'),
    path('auth/register/',CreateUserAPIView.as_view(), name='auth_user_create'),
    path('auth/logout/', LogoutUserAPIView.as_view(),name='auth_user_logout'),
    path('auth/send/', SendMessage.as_view(), name="auth_sms_send"),  
    path('auth/check/', CheckMessage.as_view(), name="auth_sms_check"),
    path("GetQuestions30/", GetQuestions.as_view(), name="get_questions_30"),
    # path("addSubject/", SubjectCreate.as_view(), name="subject_create"),
    path("GetSubjects/", GetSubjects.as_view(), name="get_subjects"),
    path("GetRating/", GetRating.as_view(), name="get_rating"),    
    path("GetBattle/", GetBattle.as_view(), name="get_battle"), 
    path("GetResultBattle/", GetResult.as_view(), name="get_results_of_battle"),    
    path("GetQuestionsForBattle/", GetQuestionsForBattle.as_view(), name="get_questions_for_battle"),    
    path("Profile/", Profile.as_view(), name="profile"),    
    path("ProfileGet/", ProfileGet.as_view(), name="profile_get"),    
    path("battleGet/", battle.as_view(), name="battle_in"),    
    path("searchbattle/", searchBattle.as_view(), name="battle_search"),    
    

]
