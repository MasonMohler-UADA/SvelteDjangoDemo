"""
URL configuration for SvelteDjangoDemo project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include

from api.views import CharacterViewSet, CombatSessionViewSet, RegisterAPI
from rest_framework.routers import DefaultRouter

from knox import views as knox_views
from api.views import LoginView

router = DefaultRouter()
router.register(r'combat_sessions', CombatSessionViewSet, basename = "combat_sessions")

characters_list = CharacterViewSet.as_view({
    'get':'list',
    'post':'create'
                                            })

characters_detail = CharacterViewSet.as_view({
    'get':'retrieve',
    'put':'update',
    'patch':'partial_update',
})

characters_delete = CharacterViewSet.as_view({
    'delete':'destroy'
})

urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/register/', RegisterAPI.as_view(), name='register'),
    path('auth/login/', LoginView.as_view(), name="login"),
    path('auth/', include('knox.urls')),
    path('', include(router.urls)),
    path('characters/', characters_list),
    path('characters/<int:pk>/', characters_detail),
    path('characters/delete', characters_delete),
]
