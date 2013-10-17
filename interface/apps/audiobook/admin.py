from audiobook.models import *
from django.contrib import admin


class PageInline(admin.TabularInline):
    model = Page
    extra = 0
    fields = ['number', ]


class SubmissionsInline(admin.TabularInline):
    model = Submission
    extra = 2
    fields = ['page', 'audio_file']


class SubmissionAdmin(admin.ModelAdmin):
    fields = ['page', 'audio_file', 'is_active']


class PageAdmin(admin.ModelAdmin):
    inlines = [SubmissionsInline]
    list_display = ('work', 'number')


class WorkAdmin(admin.ModelAdmin):
    inlines = [PageInline]
    list_display = ('name', 'page_count')


admin.site.register(Work, WorkAdmin)
admin.site.register(Page, PageAdmin)
admin.site.register(Submission, SubmissionAdmin)
