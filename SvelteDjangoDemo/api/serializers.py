from api.models import Character, CombatParticipant, CombatSession
from rest_framework import serializers

class CharacterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Character
        fields = "__all__"

class CombatParticipantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Character
        fields = "__all__"

class CombatSessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Character
        fields = "__all__"

