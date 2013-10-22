from django.shortcuts import render_to_response
from django.http import HttpResponse, HttpResponseServerError, \
    HttpResponseRedirect
from django.template import RequestContext
from django.core.cache import cache
from audiobook.models import *
from audiobook.forms import *


def book(request):
    """
    """
    try:
        work = Work.objects.get(name='invisible man')
    except Work.DoesNotExist:
        work = Work(
            name='invisible man',
            page_count=600,
            embed_code='<iframe frameborder="0" scrolling="no" style="border-bottom:2px solid #AAA" src="http://books.google.fr/books?id=YpTA74jz018C&lpg=PP1&hl=fr&pg=PP1&output=embed" width=500 height=500></iframe>'
        )
        work.save()

    if request.method == 'POST':
        form = SubmissionForm(request.POST, request.FILES)

        if form.is_valid():
            form.save()
            return HttpResponseRedirect('/')
    else:
        form = SubmissionForm()


    return render_to_response('index.html', {
        'work': work,
        'form': form,
    }, context_instance=RequestContext(request))


def upload_progress(request):
        """
        A view to report back on upload progress.
        Return JSON object with information about the progress of an upload.

        Copied from:
        http://djangosnippets.org/snippets/678/

        See upload.py for file upload handler.
        """
        #import ipdb
        #ipdb.set_trace()
        progress_id = ''
        if 'X-Progress-ID' in request.GET:
            progress_id = request.GET['X-Progress-ID']
        elif 'X-Progress-ID' in request.META:
            progress_id = request.META['X-Progress-ID']
        if progress_id:
            from django.utils import simplejson
            cache_key = "%s_%s" % (request.META['REMOTE_ADDR'], progress_id)
            data = cache.get(cache_key)
            return HttpResponse(simplejson.dumps(data))
        else:
            return HttpResponseServerError(
                'Server Error: You must provide X-Progress-ID header '
                'or query param.'
            )
