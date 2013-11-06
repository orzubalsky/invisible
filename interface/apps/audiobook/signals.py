from django.db.models.signals import post_save
from django.dispatch import receiver
from audiobook.models import *
from audiobook.tasks import *

# adding 'dispatch_uid' because this signal was getting reigstered
# twice. 'dispatch_uid' just needs to be some unique string.
#
# more info here on a better way to fix this problem:
# http://stackoverflow.com/questions/2345400/why-is-post-save-being-raised-twice-during-the-save-of-a-django-model
@receiver(post_save, sender=ChunkSubmission, dispatch_uid="interface.apps.audiobook.signals")
def chunksubmission_save_callback(sender, instance, **kwargs):
    # convert the audio with a celery task
    # process_audio.delay(instance)
    pass
