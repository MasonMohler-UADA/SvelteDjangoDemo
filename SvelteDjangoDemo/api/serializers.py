from django.contrib.auth.models import User
from django.contrib.auth.validators import UnicodeUsernameValidator
from knox.models import AuthToken

from api.models import Character, CombatSession
from rest_framework import serializers


class UsernameSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username']


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'id', 'password')
        extra_kwargs = {'password': {'write_only': True}}
    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
        )
        return user

class LoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'password')

class CharacterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Character
        fields = "__all__"

class CombatSessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = CombatSession
        fields = "__all__"

