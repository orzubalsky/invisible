from django.forms import *
from audiobook.models import *


class SubmissionForm(ModelForm):
    class Meta:
        model = Submission
        fields = ['audio_file', 'page']

    page = forms.ModelChoiceField(
        queryset=Page.objects.all(),
        #widget=forms.HiddenInput,
        error_messages={'required': 'please select a page'}
    )
    audio_file = forms.FileField(
        error_messages={'required': 'Please upload an audio file'}
    )
