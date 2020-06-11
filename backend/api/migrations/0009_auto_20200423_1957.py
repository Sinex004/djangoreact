# Generated by Django 2.2.7 on 2020-04-23 13:57

import django.contrib.postgres.fields.jsonb
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_auto_20200423_1602'),
    ]

    operations = [
        migrations.AlterField(
            model_name='battle',
            name='questions',
            field=django.contrib.postgres.fields.jsonb.JSONField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='battle',
            name='user1Answers',
            field=django.contrib.postgres.fields.jsonb.JSONField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='battle',
            name='user2Answers',
            field=django.contrib.postgres.fields.jsonb.JSONField(blank=True, null=True),
        ),
    ]
