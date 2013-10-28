# -*- coding: utf-8 -*-
import datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Deleting model 'Submission'
        db.delete_table(u'audiobook_submission')

        # Deleting model 'Work'
        db.delete_table(u'audiobook_work')

        # Adding model 'TextWork'
        db.create_table(u'audiobook_textwork', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('created', self.gf('django.db.models.fields.DateTimeField')(auto_now_add=True, blank=True)),
            ('updated', self.gf('django.db.models.fields.DateTimeField')(auto_now=True, blank=True)),
            ('is_active', self.gf('django.db.models.fields.BooleanField')(default=True, max_length=1)),
            ('name', self.gf('django.db.models.fields.CharField')(max_length=200)),
            ('text', self.gf('django.db.models.fields.TextField')()),
        ))
        db.send_create_signal(u'audiobook', ['TextWork'])

        # Adding model 'GoogleBookWorkSubmission'
        db.create_table(u'audiobook_googlebookworksubmission', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('created', self.gf('django.db.models.fields.DateTimeField')(auto_now_add=True, blank=True)),
            ('updated', self.gf('django.db.models.fields.DateTimeField')(auto_now=True, blank=True)),
            ('is_active', self.gf('django.db.models.fields.BooleanField')(default=True, max_length=1)),
            ('page', self.gf('django.db.models.fields.related.OneToOneField')(to=orm['audiobook.Page'], unique=True)),
            ('audio_file', self.gf('django.db.models.fields.files.FileField')(max_length=100)),
        ))
        db.send_create_signal(u'audiobook', ['GoogleBookWorkSubmission'])

        # Adding model 'TextWorkSubmission'
        db.create_table(u'audiobook_textworksubmission', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('created', self.gf('django.db.models.fields.DateTimeField')(auto_now_add=True, blank=True)),
            ('updated', self.gf('django.db.models.fields.DateTimeField')(auto_now=True, blank=True)),
            ('is_active', self.gf('django.db.models.fields.BooleanField')(default=True, max_length=1)),
            ('work', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['audiobook.TextWork'])),
            ('start_index', self.gf('django.db.models.fields.IntegerField')()),
            ('end_index', self.gf('django.db.models.fields.IntegerField')()),
            ('audio_file', self.gf('django.db.models.fields.files.FileField')(max_length=100)),
        ))
        db.send_create_signal(u'audiobook', ['TextWorkSubmission'])

        # Adding model 'GoogleBookWork'
        db.create_table(u'audiobook_googlebookwork', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('created', self.gf('django.db.models.fields.DateTimeField')(auto_now_add=True, blank=True)),
            ('updated', self.gf('django.db.models.fields.DateTimeField')(auto_now=True, blank=True)),
            ('is_active', self.gf('django.db.models.fields.BooleanField')(default=True, max_length=1)),
            ('name', self.gf('django.db.models.fields.CharField')(max_length=200)),
            ('page_count', self.gf('django.db.models.fields.IntegerField')()),
            ('embed_code', self.gf('django.db.models.fields.TextField')(null=True, blank=True)),
        ))
        db.send_create_signal(u'audiobook', ['GoogleBookWork'])


        # Changing field 'Page.work'
        db.alter_column(u'audiobook_page', 'work_id', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['audiobook.GoogleBookWork']))

    def backwards(self, orm):
        # Adding model 'Submission'
        db.create_table(u'audiobook_submission', (
            ('audio_file', self.gf('django.db.models.fields.files.FileField')(max_length=100)),
            ('updated', self.gf('django.db.models.fields.DateTimeField')(auto_now=True, blank=True)),
            ('created', self.gf('django.db.models.fields.DateTimeField')(auto_now_add=True, blank=True)),
            ('is_active', self.gf('django.db.models.fields.BooleanField')(default=True, max_length=1)),
            ('page', self.gf('django.db.models.fields.related.OneToOneField')(to=orm['audiobook.Page'], unique=True)),
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
        ))
        db.send_create_signal(u'audiobook', ['Submission'])

        # Adding model 'Work'
        db.create_table(u'audiobook_work', (
            ('updated', self.gf('django.db.models.fields.DateTimeField')(auto_now=True, blank=True)),
            ('name', self.gf('django.db.models.fields.CharField')(max_length=200)),
            ('created', self.gf('django.db.models.fields.DateTimeField')(auto_now_add=True, blank=True)),
            ('embed_code', self.gf('django.db.models.fields.TextField')(null=True, blank=True)),
            ('page_count', self.gf('django.db.models.fields.IntegerField')()),
            ('is_active', self.gf('django.db.models.fields.BooleanField')(default=True, max_length=1)),
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
        ))
        db.send_create_signal(u'audiobook', ['Work'])

        # Deleting model 'TextWork'
        db.delete_table(u'audiobook_textwork')

        # Deleting model 'GoogleBookWorkSubmission'
        db.delete_table(u'audiobook_googlebookworksubmission')

        # Deleting model 'TextWorkSubmission'
        db.delete_table(u'audiobook_textworksubmission')

        # Deleting model 'GoogleBookWork'
        db.delete_table(u'audiobook_googlebookwork')


        # Changing field 'Page.work'
        db.alter_column(u'audiobook_page', 'work_id', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['audiobook.Work']))

    models = {
        u'audiobook.googlebookwork': {
            'Meta': {'object_name': 'GoogleBookWork'},
            'created': ('django.db.models.fields.DateTimeField', [], {'auto_now_add': 'True', 'blank': 'True'}),
            'embed_code': ('django.db.models.fields.TextField', [], {'null': 'True', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'is_active': ('django.db.models.fields.BooleanField', [], {'default': 'True', 'max_length': '1'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '200'}),
            'page_count': ('django.db.models.fields.IntegerField', [], {}),
            'updated': ('django.db.models.fields.DateTimeField', [], {'auto_now': 'True', 'blank': 'True'})
        },
        u'audiobook.googlebookworksubmission': {
            'Meta': {'ordering': "['page']", 'object_name': 'GoogleBookWorkSubmission'},
            'audio_file': ('django.db.models.fields.files.FileField', [], {'max_length': '100'}),
            'created': ('django.db.models.fields.DateTimeField', [], {'auto_now_add': 'True', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'is_active': ('django.db.models.fields.BooleanField', [], {'default': 'True', 'max_length': '1'}),
            'page': ('django.db.models.fields.related.OneToOneField', [], {'to': u"orm['audiobook.Page']", 'unique': 'True'}),
            'updated': ('django.db.models.fields.DateTimeField', [], {'auto_now': 'True', 'blank': 'True'})
        },
        u'audiobook.page': {
            'Meta': {'ordering': "['work', 'number']", 'object_name': 'Page'},
            'created': ('django.db.models.fields.DateTimeField', [], {'auto_now_add': 'True', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'is_active': ('django.db.models.fields.BooleanField', [], {'default': 'True', 'max_length': '1'}),
            'number': ('django.db.models.fields.IntegerField', [], {}),
            'updated': ('django.db.models.fields.DateTimeField', [], {'auto_now': 'True', 'blank': 'True'}),
            'work': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['audiobook.GoogleBookWork']"})
        },
        u'audiobook.textwork': {
            'Meta': {'object_name': 'TextWork'},
            'created': ('django.db.models.fields.DateTimeField', [], {'auto_now_add': 'True', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'is_active': ('django.db.models.fields.BooleanField', [], {'default': 'True', 'max_length': '1'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '200'}),
            'text': ('django.db.models.fields.TextField', [], {}),
            'updated': ('django.db.models.fields.DateTimeField', [], {'auto_now': 'True', 'blank': 'True'})
        },
        u'audiobook.textworksubmission': {
            'Meta': {'ordering': "['start_index']", 'object_name': 'TextWorkSubmission'},
            'audio_file': ('django.db.models.fields.files.FileField', [], {'max_length': '100'}),
            'created': ('django.db.models.fields.DateTimeField', [], {'auto_now_add': 'True', 'blank': 'True'}),
            'end_index': ('django.db.models.fields.IntegerField', [], {}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'is_active': ('django.db.models.fields.BooleanField', [], {'default': 'True', 'max_length': '1'}),
            'start_index': ('django.db.models.fields.IntegerField', [], {}),
            'updated': ('django.db.models.fields.DateTimeField', [], {'auto_now': 'True', 'blank': 'True'}),
            'work': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['audiobook.TextWork']"})
        }
    }

    complete_apps = ['audiobook']