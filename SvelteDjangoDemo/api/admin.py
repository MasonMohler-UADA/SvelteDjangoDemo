from django.contrib import admin

from api.models import Character, CombatSession

# Register your models here.
admin.site.register(CombatSession)
admin.site.register(Character)
