from django.db import models
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
