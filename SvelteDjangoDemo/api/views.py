from django.db import transaction
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

    def destroy(self, request, *args, **kwargs):
        # Expects a list of IDs in the request body (e.g., {'ids': [1, 2, 3]})
        ids_to_delete = request.data.getlist('character_ids', [])
        if not ids_to_delete:
            return Response({'detail': 'No IDs provided for deletion.'})
        queryset = self.get_queryset().filter(id__in=ids_to_delete)
        print(queryset)
        deleted_count, _ = queryset.delete()
        return Response({f'{deleted_count} objects deleted successfully.'})

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
        
        # self.perform_create(serializer)
        combat_session = serializer.save()
        print(serializer.instance)
        session_id = serializer.instance.id
        characters = request.data.get('characters')
        updates = []

        for entry in characters:
            character = Character.objects.get(id=entry['id'])
            character.init = entry['initiative']
            character.combat_session_id = session_id
            updates.append(character)

        try:
            with transaction.atomic():
                Character.objects.bulk_update(updates, ['init', 'combat_session_id'])
        except Exception as e:
            print(e)
            combat_session.delete()

        return Response(serializer.data)




