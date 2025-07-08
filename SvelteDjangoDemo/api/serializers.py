from api.models import Character, CombatSession
from rest_framework import serializers

class CharacterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Character
        fields = "__all__"

class CombatSessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = CombatSession
        fields = "__all__"

