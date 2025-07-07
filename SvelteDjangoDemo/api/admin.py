from django.contrib import admin

from api.models import Character, CombatSession, CombatParticipant

# Register your models here.
admin.site.register(CombatParticipant)
admin.site.register(CombatSession)
admin.site.register(Character)
