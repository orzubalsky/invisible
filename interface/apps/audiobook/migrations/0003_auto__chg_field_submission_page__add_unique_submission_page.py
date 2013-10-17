# -*- coding: utf-8 -*-
import datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):

        # Changing field 'Submission.page'
        db.alter_column(u'audiobook_submission', 'page_id', self.gf('django.db.models.fields.related.OneToOneField')(to=orm['audiobook.Page'], unique=True))
        # Adding unique constraint on 'Submission', fields ['page']
        db.create_unique(u'audiobook_submission', ['page_id'])


    def backwards(self, orm):
        # Removing unique constraint on 'Submission', fields ['page']
        db.delete_unique(u'audiobook_submission', ['page_id'])


        # Changing field 'Submission.page'
        db.alter_column(u'audiobook_submission', 'page_id', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['audiobook.Page']))

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
            'page': ('django.db.models.fields.related.OneToOneField', [], {'to': u"orm['audiobook.Page']", 'unique': 'True'}),
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