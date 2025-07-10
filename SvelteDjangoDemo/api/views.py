from django.contrib.auth import authenticate, login
from django.db import transaction
from django.shortcuts import render
from knox.auth import TokenAuthentication
from knox.models import AuthToken
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated

from api.serializers import CharacterSerializer, CombatSessionSerializer, RegisterSerializer, LoginSerializer
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError

from api.models import Character, CombatSession

from knox.views import LoginView as KnoxLoginView
from rest_framework.authentication import BasicAuthentication

class LoginView(KnoxLoginView):
    authentication_classes = [TokenAuthentication]
    serializer_class = LoginSerializer
    permission_classes = (AllowAny,)

    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)  # This is important for session-based auth, but for DRF Knox, the token is key
            # Generate Knox token for the authenticated user
            token = AuthToken.objects.create(user)[1]  # [1] gets the token string
            return Response({'token': token, 'username': user.username})
        else:
            return Response({'error': 'Invalid Credentials'})
class RegisterAPI(GenericAPIView):
    serializer_class = RegisterSerializer
    permission_classes = (AllowAny,)
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        instance, token = AuthToken.objects.create(user)
        return Response({'user': {'id': user.id, 'username': user.username}, 'token': token})


# Create your views here.
class CharacterViewSet(ModelViewSet):
    queryset = Character.objects.all()
    serializer_class = CharacterSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data={**request.data, 'owner': request.user.id})
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def get_queryset(self):
        user = self.request.user
        return Character.objects.filter(owner=user.id).all()


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
    serializer_class = CombatSessionSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        user = self.request.user
        print(self.request.user)
        print(CombatSession.objects.filter(owner=user.id).all())
        return CombatSession.objects.filter(owner=user.id).all()

    # GET /combat_sessions/
    # This is the default list view. It can be removed entirely if no custom behavior is needed.
    # def list(self, request, *args, **kwargs):
    #     queryset = self.filter_queryset(self.get_queryset())
    #     serializer = self.get_serializer(queryset, many=True)
    #     return Response(serializer.data)

    def retrieve(self, request, pk=None, *args, **kwargs):
        instance = self.get_object()
        print(instance)
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
        serializer = self.get_serializer(data={**request.data, 'owner': request.user.id})
        print(request.user)

        try:
            serializer.is_valid(raise_exception = True)
        except ValidationError as e:
            print(e)
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







