# -*- coding: utf-8 -*-
import datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Deleting field 'TextChunkWork.text'
        db.delete_column(u'audiobook_textchunkwork', 'text')

        # Adding field 'TextChunkWork.text_file'
        db.add_column(u'audiobook_textchunkwork', 'text_file',
                      self.gf('django.db.models.fields.files.FileField')(default='a', max_length=100),
                      keep_default=False)


    def backwards(self, orm):
        # Adding field 'TextChunkWork.text'
        db.add_column(u'audiobook_textchunkwork', 'text',
                      self.gf('tinymce.models.HTMLField')(default='a'),
                      keep_default=False)

        # Deleting field 'TextChunkWork.text_file'
        db.delete_column(u'audiobook_textchunkwork', 'text_file')


    models = {
        u'audiobook.chunk': {
            'Meta': {'ordering': "['work', 'number']", 'object_name': 'Chunk'},
            'created': ('django.db.models.fields.DateTimeField', [], {'auto_now_add': 'True', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'is_active': ('django.db.models.fields.BooleanField', [], {'default': 'True', 'max_length': '1'}),
            'number': ('django.db.models.fields.IntegerField', [], {}),
            'text': ('tinymce.models.HTMLField', [], {}),
            'updated': ('django.db.models.fields.DateTimeField', [], {'auto_now': 'True', 'blank': 'True'}),
            'work': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['audiobook.TextChunkWork']"})
        },
        u'audiobook.chunksubmission': {
            'Meta': {'ordering': "['chunk']", 'object_name': 'ChunkSubmission'},
            'audio_file': ('django.db.models.fields.files.FileField', [], {'max_length': '100'}),
            'chunk': ('django.db.models.fields.related.OneToOneField', [], {'to': u"orm['audiobook.Page']", 'unique': 'True'}),
            'created': ('django.db.models.fields.DateTimeField', [], {'auto_now_add': 'True', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'is_active': ('django.db.models.fields.BooleanField', [], {'default': 'True', 'max_length': '1'}),
            'updated': ('django.db.models.fields.DateTimeField', [], {'auto_now': 'True', 'blank': 'True'})
        },
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
        u'audiobook.textchunkwork': {
            'Meta': {'object_name': 'TextChunkWork'},
            'created': ('django.db.models.fields.DateTimeField', [], {'auto_now_add': 'True', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'is_active': ('django.db.models.fields.BooleanField', [], {'default': 'True', 'max_length': '1'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '200'}),
            'text_file': ('django.db.models.fields.files.FileField', [], {'max_length': '100'}),
            'updated': ('django.db.models.fields.DateTimeField', [], {'auto_now': 'True', 'blank': 'True'})
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
            'Meta': {'ordering': "['-start_index']", 'object_name': 'TextWorkSubmission'},
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