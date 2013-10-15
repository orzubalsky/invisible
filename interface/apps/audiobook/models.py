from django.db.models import *
from django.utils import timezone
from django.utils.translation import ugettext_lazy as _


class Base(Model):
    """
    Abstract base model class which other models are based on.
    Includes crud date meta data and active/inactive status
    """
    class Meta:
            abstract = True

    created = DateTimeField(auto_now_add=True, editable=False)
    updated = DateTimeField(auto_now=True, editable=False)
    is_active = BooleanField(max_length=1, default=1)

    def save(self, *args, **kwargs):
        """Save timezone-aware values for created and updated fields."""
        if self.pk is None:
            self.created = timezone.now()
        self.updated = timezone.now()
        super(Base, self).save(*args, **kwargs)

    def __unicode__(self):
        if hasattr(self, "author") and self.author:
            return self.author
        else:
            return "%s" % (type(self))


class Work(Base):
    """
    A work to be read collectively.
    """
    name = CharField(
        verbose_name=_("name"),
        max_length=200,
        help_text=_("The title of the book or text")
    )
    page_count = IntegerField(
        verbose_name=_("Page count"),
        help_text=_("The number of pages in the book or text")
    )
    embed_code = TextField(
        verbose_name=_("Embed code"),
        blank=True,
        null=True,
        help_text=_(
            "If the book or text is on google books, "
            "the embed code can be pasted below"
        )
    )


class Submission(Base):
    """
    A submission for a single page in the work.
    """
    class Meta:
        ordering = ['work', 'page_number']

    def audio_filename(self, filename):
        return 'uploads/%s/page_%i_%s' % (
            self.work.name,
            self.page_number,
            filename
        )

    work = ForeignKey(Work)
    page_number = IntegerField(
        max_length=4,
        verbose_name="page number",
        unique=True
    )
    audio_file = FileField(
        upload_to=audio_filename,
    )

    def __unicode__(self):
        return "page %i for %s" % (self.page_number, self.work)
