from django.shortcuts import render
from api.serializers import CharacterSerializer, CombatSessionSerializer
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError

from api.models import Character, CombatSession

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

    def retrieve(self, request, pk=None, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        data = serializer.data

        characters = Character.objects.filter(combat_session_id=self.kwargs.get('pk'))

        # Add character context for frontend
        context = {
            "context": {
                "characters": CharacterSerializer(characters, many=True).data,
            }
        }
        data.update(context)

        return Response(data)
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data = request.data)

        try:
            serializer.is_valid(raise_exception = True)
        except ValidationError as e:
            raise ValidationError(e)
        
        self.perform_create(serializer)
        print(serializer.instance)
        session_id = serializer.instance.id
        character_ids = request.data.getlist('character_ids') #maybe this should be character_ids = request.body? maybe getAll?

        Character.objects.filter(id__in=character_ids).update(combat_session_id=session_id)

        return Response(serializer.data)




