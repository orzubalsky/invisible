from audiobook.models import *
from django.contrib import admin


class SubmissionsInline(admin.TabularInline):
    model = Submission
    extra = 2
    fields = ['work', 'page_number', 'audio_file']


class SubmissionAdmin(admin.ModelAdmin):
    fields = ['work', 'page_number', 'audio_file', 'is_active']


class WorkAdmin(admin.ModelAdmin):
    inlines = [SubmissionsInline]
    list_display = ('name', 'page_count')

admin.site.register(Work, WorkAdmin)
admin.site.register(Submission, SubmissionAdmin)
