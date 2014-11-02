from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
from twilio.twiml import Response
from django_twilio.decorators import twilio_view
from django.core.urlresolvers import reverse
from voicemail.models import VoicemailBox


@twilio_view
def answer(request, slug=None):

    r = Response()
    r.say("Thank you for contributing to the invisible library.")

    make_selection(r)

    return r


def make_selection(response, slug):

    r.say(
        "Please enter the page number you wish to record, "
        "followed by the pound sign. "
    )
    action = reverse('handle-selection', kwargs={'slug': slug})

    r.gather(action=action, method='post')


@twilio_view
def handle_selection(request, slug):

    voicemailbox = get_object_or_404(VoicemailBox, slug=slug)

    chunk = voicemailbox.work.chunk_set.filter(number=request.POST.get('Digits'))

    if chunk.chunksubmission:


    r = Response()
    r.say(
        "Thank you. "
        "Please start reading, "
        "when you are done, you can hang up. "
    )
    
    action = reverse('handle-recording', kwargs={'slug': slug})

    r.record(action=action, timeout=20, maxLength=360, playBeep=True)


@csrf_exempt
def handle_recording(request, slug=None):

    voicemailbox = get_object_or_404(VoicemailBox, slug=slug)

    voicemailbox.collection.add_voicemail(
        audio_url=request.POST.get('RecordingUrl'),
        title='recorded in %s for %s' % (location, voicemailbox.target_location),
        location=voicemailbox.target_location,
    )
    return HttpResponse()
