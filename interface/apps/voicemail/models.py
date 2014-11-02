from audiobook.models import *


class VoicemailBox(Base):
    title = CharField(max_length=100, blank=False, null=True)
    slug = SlugField(max_length=120, blank=False, null=False)
    work = ForeignKey(TextChunkWork)

    def __unicode__(self):
        return self.title
