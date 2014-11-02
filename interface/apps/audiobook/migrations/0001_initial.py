# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import audiobook.models
import django.core.files.storage


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Chunk',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('updated', models.DateTimeField(auto_now=True)),
                ('is_active', models.BooleanField(default=1, max_length=1)),
                ('number', models.IntegerField(verbose_name='Chunk Number')),
                ('text', models.TextField(verbose_name='Text')),
            ],
            options={
                'ordering': ['work', 'number'],
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='ChunkSubmission',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('updated', models.DateTimeField(auto_now=True)),
                ('is_active', models.BooleanField(default=1, max_length=1)),
                ('audio_file', models.FileField(storage=django.core.files.storage.FileSystemStorage(base_url=b'/uploads', location=b'/Users/orzubalsky/code/invisible/interface/settings/../media'), upload_to=audiobook.models.chunk_audio_filename)),
                ('chunk', models.OneToOneField(to='audiobook.Chunk')),
            ],
            options={
                'ordering': ['chunk'],
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='GoogleBookWork',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('updated', models.DateTimeField(auto_now=True)),
                ('is_active', models.BooleanField(default=1, max_length=1)),
                ('name', models.CharField(help_text='The title of the book or text', max_length=200, verbose_name='name')),
                ('page_count', models.IntegerField(help_text='The number of pages in the book or text', verbose_name='Page count')),
                ('embed_code', models.TextField(help_text='If the book or text is on google books, the embed code can be pasted below', null=True, verbose_name='Embed code', blank=True)),
            ],
            options={
                'abstract': False,
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='GoogleBookWorkSubmission',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('updated', models.DateTimeField(auto_now=True)),
                ('is_active', models.BooleanField(default=1, max_length=1)),
                ('audio_file', models.FileField(storage=django.core.files.storage.FileSystemStorage(base_url=b'/uploads', location=b'/Users/orzubalsky/code/invisible/interface/settings/../media'), upload_to=audiobook.models.googlebook_audio_filename)),
            ],
            options={
                'ordering': ['page'],
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Page',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('updated', models.DateTimeField(auto_now=True)),
                ('is_active', models.BooleanField(default=1, max_length=1)),
                ('number', models.IntegerField(verbose_name='Page Number')),
                ('work', models.ForeignKey(to='audiobook.GoogleBookWork')),
            ],
            options={
                'ordering': ['work', 'number'],
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='TextChunkWork',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('updated', models.DateTimeField(auto_now=True)),
                ('is_active', models.BooleanField(default=1, max_length=1)),
                ('name', models.CharField(help_text='The title of the book or text', max_length=200, verbose_name='name')),
                ('text_file', models.FileField(storage=django.core.files.storage.FileSystemStorage(base_url=b'/uploads', location=b'/Users/orzubalsky/code/invisible/interface/settings/../media'), upload_to=audiobook.models.text_filename)),
            ],
            options={
                'abstract': False,
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='TextWork',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('updated', models.DateTimeField(auto_now=True)),
                ('is_active', models.BooleanField(default=1, max_length=1)),
                ('name', models.CharField(help_text='The title of the book or text', max_length=200, verbose_name='name')),
                ('text', models.TextField(verbose_name='Full Text')),
            ],
            options={
                'abstract': False,
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='TextWorkSubmission',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('updated', models.DateTimeField(auto_now=True)),
                ('is_active', models.BooleanField(default=1, max_length=1)),
                ('start_index', models.IntegerField()),
                ('end_index', models.IntegerField()),
                ('audio_file', models.FileField(storage=django.core.files.storage.FileSystemStorage(base_url=b'/uploads', location=b'/Users/orzubalsky/code/invisible/interface/settings/../media'), upload_to=audiobook.models.textwork_audio_filename)),
                ('work', models.ForeignKey(to='audiobook.TextWork')),
            ],
            options={
                'ordering': ['-start_index'],
            },
            bases=(models.Model,),
        ),
        migrations.AddField(
            model_name='googlebookworksubmission',
            name='page',
            field=models.OneToOneField(to='audiobook.Page'),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='chunk',
            name='work',
            field=models.ForeignKey(to='audiobook.TextChunkWork'),
            preserve_default=True,
        ),
    ]
