# Generated by Django 5.2.3 on 2025-07-07 20:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_alter_combatsession_participants'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='combatsession',
            name='participants',
        ),
        migrations.AddField(
            model_name='combatsession',
            name='characters',
            field=models.ManyToManyField(blank=True, to='api.combatparticipant'),
        ),
    ]
