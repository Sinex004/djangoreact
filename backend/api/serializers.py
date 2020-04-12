from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import Subject


class CreateUserSerializer(serializers.ModelSerializer):
    username = serializers.CharField()

    class Meta:
        model = get_user_model()
        fields = ('username',)
        read_only_fields = ('is_staff', 'is_superuser', 'is_active',)

    def create(self, validated_data):
        user = super(CreateUserSerializer, self).create(validated_data)
        user.save()
        return user

# class CreateSubjectSerializer(serializers.ModelSerializer):
#     subject_name=serializers.CharField()
#     class Meta:
#         model = Subject
#         fields = ('subject_name',)
#     def create(self, validated_data):
#         subject = Subject.objects.create(**validated_data)
#         subject.save()
#         return subject

class SubjectSerializer(serializers.ModelSerializer):
    subject_name=serializers.CharField(max_length=30)
    class Meta:
        model = Subject
        fields = ('subject_name',)