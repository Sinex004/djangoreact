from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import Subject, Profile


class CreateUserSerializer(serializers.ModelSerializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True,
                                     style={'input_type': 'password'})
    class Meta:
        model = get_user_model()
        fields = ('username', 'password',)
        write_only_fields = ('password')

        read_only_fields = ('is_staff', 'is_superuser', 'is_active',)

    def create(self, validated_data):
        user = super(CreateUserSerializer, self).create(validated_data)
        user.set_password(validated_data['password'])
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

# class ProfileSerializer(serializers.ModelSerializer):
#     rating=serializers.IntegerField()
#     class Meta:
#         model = Profile
#         fields = ('rating',)