from django.db import models


# Create your models here.
class Character(models.Model):
    name = models.CharField(max_length=50, blank=False, null=False)
    current_HP = models.IntegerField(blank=False, null=False)
    max_HP = models.IntegerField(blank=False, null=False)
    ac = models.IntegerField(blank=False, null=False)
    player = models.BooleanField(default=False, blank=False, null=False)
    init = models.IntegerField(blank=True, null=True)
    combat_session = models.ForeignKey('CombatSession', on_delete=models.CASCADE, blank=True, null=True)

    class Meta:
        ordering = ['-init']

    def __str__(self):
        return self.name


class CombatSession(models.Model):
    name = models.CharField(blank=False, null=False)
    combat_index = models.IntegerField(blank=False, null=False, default=0)

    def __str__(self):
        return self.name