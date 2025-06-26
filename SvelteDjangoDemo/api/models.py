from django.db import models

# Create your models here.
class Character(models.Model):
    name = models.CharField(max_length=50, blank=False, null=False)
    currentHP = models.IntegerField(blank=False, null=False)
    maxHP = models.IntegerField(blank=False, null=False)
    ac = models.IntegerField(blank=False, null=False)
    init = models.IntegerField(blank=False, null=False)
    player = models.BooleanField(default=False, blank=False, null=False)