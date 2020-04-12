from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Subject(models.Model):
    subject_name=models.CharField(max_length=30)
    def __str__(self):
        return self.subject_name

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    rating = models.DecimalField( max_digits=5, decimal_places=2,default=0)
 
    def __unicode__(self):
        return self.user
 
    class Meta:
        verbose_name = 'Профиль'
        verbose_name_plural = 'Профили'

class Question(models.Model):
    subject=models.ForeignKey(Subject, on_delete=models.CASCADE)
    question = models.CharField(max_length=150)
    answer = models.CharField(max_length=50)
    var1 = models.CharField(max_length=50)
    var2 = models.CharField(max_length=50)
    var3 = models.CharField(max_length=50)
    def __str__(self):
        return self.question
