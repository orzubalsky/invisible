from audiobook.models import *
from django.contrib import admin


class TextWorkSubmissionInline(admin.TabularInline):
    model = TextWorkSubmission
    extra = 2
    fields = ['work', 'start_index', 'end_index', 'audio_file']


class TextWorkSubmissionAdmin(admin.ModelAdmin):
    fields = ['work', 'start_index', 'end_index', 'audio_file', 'is_active']


class TextWorkAdmin(admin.ModelAdmin):
    inlines = [TextWorkSubmissionInline]
    list_display = ('name', 'text')


admin.site.register(TextWork, TextWorkAdmin)
admin.site.register(TextWorkSubmission, TextWorkSubmissionAdmin)
