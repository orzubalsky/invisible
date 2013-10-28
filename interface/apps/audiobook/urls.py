from django.conf.urls import patterns, include, url

urlpatterns = patterns('audiobook.views',
    url(r'^upload_progress/$', 'upload_progress', name="upload-progress"),
    url(r'^$', 'textwork', name='textwork'),
)
