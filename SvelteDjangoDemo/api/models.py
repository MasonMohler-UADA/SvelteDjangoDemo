from django.db import models


# Create your models here.
class Character(models.Model):
    name = models.CharField(max_length=50, blank=False, null=False)
    current_HP = models.IntegerField(blank=False, null=False)
    max_HP = models.IntegerField(blank=False, null=False)
    ac = models.IntegerField(blank=False, null=False)
    player = models.BooleanField(default=False, blank=False, null=False)

    def __str__(self):
        return self.name


class CombatSession(models.Model):
    name = models.CharField(blank=False, null=False)
    combat_index = models.IntegerField(blank=False, null=False)
    characters = models.ManyToManyField('CombatParticipant')

    def __str__(self):
        return self.name


class CombatParticipant(models.Model):
    character = models.ForeignKey(Character, on_delete=models.CASCADE)
    combat_session = models.ForeignKey(CombatSession, on_delete=models.CASCADE)
    initiative = models.IntegerField(blank=False, null=False)

    class Meta:
        unique_together = ('character', 'combat_session')
        ordering = ['-initiative']

    def __str__(self):
        return f"{self.character} in {self.combat_session} (Initiative: {self.initiative})"