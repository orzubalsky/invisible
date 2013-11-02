from django.forms import *
from audiobook.models import *


class ChunkSubmissionForm(ModelForm):
    class Meta:
        model = ChunkSubmission
        fields = ['audio_file', 'chunk']

    chunk = forms.ModelChoiceField(
        queryset=Chunk.objects.all(),
        error_messages={'required': 'Please select text'}
    )
    audio_file = forms.FileField(
        error_messages={'required': 'Please upload an audio file'}
    )


class TextWorkSubmissionForm(ModelForm):
    class Meta:
        model = TextWorkSubmission
        fields = ['audio_file', 'start_index', 'end_index']

    audio_file = forms.FileField(
        error_messages={'required': 'Please upload an audio file'}
    )


class GoogleBookSubmissionForm(ModelForm):
    class Meta:
        model = GoogleBookWorkSubmission
        fields = ['audio_file', 'page']

    page = forms.ModelChoiceField(
        queryset=Page.objects.all(),
        error_messages={'required': 'please select a page'}
    )
    audio_file = forms.FileField(
        error_messages={'required': 'Please upload an audio file'}
    )

