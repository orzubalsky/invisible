from audiobook.models import *
from django.contrib import admin


class ChunkSubmissionInline(admin.TabularInline):
    model = ChunkSubmission
    extra = 2
    fields = ['chunk', 'audio_file']


class ChunkInline(admin.TabularInline):
    model = Chunk
    extra = 2
    fields = ['number', 'text']


class ChunkSubmissionAdmin(admin.ModelAdmin):
    fields = ['chunk', 'audio_file', 'is_active']


class ChunkAdmin(admin.ModelAdmin):
    inlines = [ChunkSubmissionInline]
    fields = ['work', 'number', 'text']


class TextChunkWorkAdmin(admin.ModelAdmin):
    inlines = [ChunkInline]
    list_display = ('name', 'text_file')


admin.site.register(TextChunkWork, TextChunkWorkAdmin)
admin.site.register(ChunkSubmission, ChunkSubmissionAdmin)
admin.site.register(Chunk, ChunkAdmin)
