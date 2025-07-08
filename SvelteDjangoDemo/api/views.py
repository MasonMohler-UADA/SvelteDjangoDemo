from django.shortcuts import render
from api.serializers import CharacterSerializer, CombatSessionSerializer, CombatParticipantSerializer
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError

from api.models import Character, CombatSession, CombatParticipant

# Create your views here.
class CharacterViewSet(ModelViewSet):
    queryset = Character.objects.all()
    serializer_class = CharacterSerializer

    # GET /producers/<int:pk>/
    # This is the default detail view. It can be removed entirely if no custom behavior is needed.
    def retrieve(self, request, pk=None, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        print(self.get_object().name)
        return Response(serializer.data)
    
class CombatSessionViewSet(ModelViewSet):
    queryset = CombatSession.objects.all()
    serializer_class = CombatSessionSerializer

    # GET /characters/
    # This is the default list view. It can be removed entirely if no custom behavior is needed.
    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data = request.data)

        try:
            serializer.is_valid(raise_exception = True)
        except ValidationError as e:
            raise ValidationError(e)
        
        new_combat_session = self.perform_create(serializer)

        character_ids = request.data.get('character_ids')
        new_combat_session.characters.set(character_ids)

        


        session_name = serializer.get('name') # Assuming I can do this and then pass in a 'name' with my request? I don't quite know
        combat_index = 0
        characters = serializer.get('characters')



        return Response(response)

class CombatParticipantViewSet(ModelViewSet):
    queryset = CombatParticipant.objects.all()
    serializer_class = CombatParticipantSerializer



