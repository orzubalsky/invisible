# -*- coding: utf-8 -*-
import datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Adding model 'Page'
        db.create_table(u'audiobook_page', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('created', self.gf('django.db.models.fields.DateTimeField')(auto_now_add=True, blank=True)),
            ('updated', self.gf('django.db.models.fields.DateTimeField')(auto_now=True, blank=True)),
            ('is_active', self.gf('django.db.models.fields.BooleanField')(default=True, max_length=1)),
            ('work', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['audiobook.Work'])),
            ('number', self.gf('django.db.models.fields.IntegerField')()),
        ))
        db.send_create_signal(u'audiobook', ['Page'])

        # Deleting field 'Submission.page_number'
        db.delete_column(u'audiobook_submission', 'page_number')

        # Deleting field 'Submission.work'
        db.delete_column(u'audiobook_submission', 'work_id')

        # Adding field 'Submission.page'
        db.add_column(u'audiobook_submission', 'page',
                      self.gf('django.db.models.fields.related.ForeignKey')(default=4, to=orm['audiobook.Page']),
                      keep_default=False)


    def backwards(self, orm):
        # Deleting model 'Page'
        db.delete_table(u'audiobook_page')

        # Adding field 'Submission.page_number'
        db.add_column(u'audiobook_submission', 'page_number',
                      self.gf('django.db.models.fields.IntegerField')(default=4, max_length=4, unique=True),
                      keep_default=False)

        # Adding field 'Submission.work'
        db.add_column(u'audiobook_submission', 'work',
                      self.gf('django.db.models.fields.related.ForeignKey')(default=1, to=orm['audiobook.Work']),
                      keep_default=False)

        # Deleting field 'Submission.page'
        db.delete_column(u'audiobook_submission', 'page_id')


    models = {
        u'audiobook.page': {
            'Meta': {'ordering': "['work', 'number']", 'object_name': 'Page'},
            'created': ('django.db.models.fields.DateTimeField', [], {'auto_now_add': 'True', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'is_active': ('django.db.models.fields.BooleanField', [], {'default': 'True', 'max_length': '1'}),
            'number': ('django.db.models.fields.IntegerField', [], {}),
            'updated': ('django.db.models.fields.DateTimeField', [], {'auto_now': 'True', 'blank': 'True'}),
            'work': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['audiobook.Work']"})
        },
        u'audiobook.submission': {
            'Meta': {'ordering': "['page']", 'object_name': 'Submission'},
            'audio_file': ('django.db.models.fields.files.FileField', [], {'max_length': '100'}),
            'created': ('django.db.models.fields.DateTimeField', [], {'auto_now_add': 'True', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'is_active': ('django.db.models.fields.BooleanField', [], {'default': 'True', 'max_length': '1'}),
            'page': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['audiobook.Page']"}),
            'updated': ('django.db.models.fields.DateTimeField', [], {'auto_now': 'True', 'blank': 'True'})
        },
        u'audiobook.work': {
            'Meta': {'object_name': 'Work'},
            'created': ('django.db.models.fields.DateTimeField', [], {'auto_now_add': 'True', 'blank': 'True'}),
            'embed_code': ('django.db.models.fields.TextField', [], {'null': 'True', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'is_active': ('django.db.models.fields.BooleanField', [], {'default': 'True', 'max_length': '1'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '200'}),
            'page_count': ('django.db.models.fields.IntegerField', [], {}),
            'updated': ('django.db.models.fields.DateTimeField', [], {'auto_now': 'True', 'blank': 'True'})
        }
    }

    complete_apps = ['audiobook']