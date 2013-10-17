from django.shortcuts import render_to_response, get_object_or_404
from django.template import RequestContext
from django.http import HttpResponseRedirect, HttpResponse
from django.core.urlresolvers import reverse
from django.forms.formsets import formset_factory
from django.core import serializers
from django.utils import simplejson as json
from ajaxuploader.views import AjaxFileUploader
from django.middleware.csrf import get_token
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

    return render_to_response('index.html', {
        'work': work,
    }, context_instance=RequestContext(request))


def detail(request, video_id):
    if request.method == "POST":
        data = serializers.serialize('json', Video.objects.filter(pk=video_id))
        return HttpResponse(data, mimetype='application/json')
            
    # fallback on view template
    video = get_object_or_404(Video, pk=video_id)
    return render_to_response('detail.html', {'video': video})
    
    
def next(request, video_id):
    if request.method == "POST":
        current_video = get_object_or_404(Video, pk=video_id)
        if current_video.page.number == 86:
            next_page = 1
        else:
            next_page = current_video.page.number + 1;
        next_video = Video.objects.filter(page__number=next_page).order_by('?')[0]
        data = serializers.serialize('json', [next_video])
        return HttpResponse(data, mimetype='application/json')

    
def add(request):
    pages = Page.objects.all().order_by('number')
    
    if request.method == 'POST':
        form = VideoForm(request.POST)
        
        if form.is_valid():
            validForm = form.save(commit=False)
            validForm.save_upload(form.cleaned_data.get('page_number'), form.cleaned_data.get('filename'))
            return HttpResponseRedirect('/')                   
    else :
        form = VideoForm()
    
    return render_to_response('add.html', {'pages': pages, 'form': form}, context_instance=RequestContext(request))
    

def start(request):
    csrf_token = get_token(request)
    return render_to_response('import.html', {'csrf_token': csrf_token}, context_instance = RequestContext(request))

import_uploader = AjaxFileUploader()
