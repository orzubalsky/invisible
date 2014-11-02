# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('audiobook', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='VoicemailBox',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('updated', models.DateTimeField(auto_now=True)),
                ('is_active', models.BooleanField(default=1, max_length=1)),
                ('title', models.CharField(max_length=100, null=True)),
                ('slug', models.SlugField(max_length=120)),
                ('work', models.ForeignKey(to='audiobook.TextChunkWork')),
            ],
            options={
                'abstract': False,
            },
            bases=(models.Model,),
        ),
    ]
