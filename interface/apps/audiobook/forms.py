from django.forms import *
from audiobook.models import *


class SubmissionForm (ModelForm):
    class Meta:
        model = Submission
        fields = ['audio_filename', ]

    #page_number = forms.ModelChoiceField(queryset=Page.objects.all(), widget=forms.HiddenInput, error_messages={'required': 'please select a page'})
    audio_filename = forms.CharField(widget=forms.HiddenInput, error_messages={'required': 'Please upload a video file'})