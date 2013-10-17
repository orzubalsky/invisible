from django.conf.urls import patterns, include, url

urlpatterns = patterns('audiobook.views',
    url(r'start$', 'start', name="start"),
    url(r'ajax-upload$', 'import_uploader', name="my-ajax-upload"),
    url(r'^$', 'book'),
    url(r'^add/$', 'add'),
)
