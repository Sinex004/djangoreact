from django.db import models
from django.contrib.postgres.fields import JSONField
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

# Create your models here.
class Subject(models.Model):
    subject_name=models.CharField(max_length=30)
    def __str__(self):
        return self.subject_name

# class Rating(models.Model):
#     user = models.OneToOneField(User, verbose_name=_(""), on_delete=models.CASCADE)
#     rate = models.IntegerField(default=0)
#     def __str__(self):
#         return self.rating

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    rating = models.IntegerField(default=0)
    city = models.TextField(blank=True, null=True)
    school = models.TextField(blank=True, null=True)
    pushToken = models.TextField(blank=True, default=dict)

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()


class Question(models.Model):
    subject=models.ForeignKey(Subject, on_delete=models.CASCADE)
    question = models.CharField(max_length=600)
    answer = models.CharField(max_length=200)
    var1 = models.CharField(max_length=200)
    var2 = models.CharField(max_length=200)
    var3 = models.CharField(max_length=200)
    def __str__(self):
        return self.question

class Battle(models.Model):
    user1 = models.ForeignKey(User , null=True, related_name='user1', on_delete=models.SET_NULL)
    user2 = models.ForeignKey(User , null=True, blank=True, related_name='user2', on_delete=models.SET_NULL)
    started = models.IntegerField(default=1)
    
    questions = JSONField( blank=True,default= dict)
    user1Answers = JSONField( blank=True,default= dict)
    user2Answers = JSONField( blank=True,default= dict)
    
    user1Round1 = models.CharField(max_length=5, default='0', blank=True, null=True)
    user2Round1 = models.CharField(max_length=5, default='0', blank=True, null=True)
    user1Round2 = models.CharField(max_length=5, default='0', blank=True, null=True)
    user2Round2 = models.CharField(max_length=5, default='0', blank=True, null=True)
    user1Round3 = models.CharField(max_length=5, default='0', blank=True, null=True)
    user2Round3 = models.CharField(max_length=5, default='0', blank=True, null=True)
    user1Round4 = models.CharField(max_length=5, default='0', blank=True, null=True)
    user2Round4 = models.CharField(max_length=5, default='0', blank=True, null=True)

    user1Total = models.IntegerField(default=0, blank=True, null=True)
    user2Total = models.IntegerField(default=0, blank=True, null=True)
    
    result =  models.CharField(max_length=15,default='0', blank=True, null=True)
    
    def __str__(self):
        return str(self.id)