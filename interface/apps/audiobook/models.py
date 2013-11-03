from django.db.models import *
from django.db.models.query import QuerySet
from django.utils import timezone
from django.utils.translation import ugettext_lazy as _
from django.core.files.storage import FileSystemStorage
from django.core.files import File
from django.conf import settings
from django.template.defaultfilters import slugify
from tinymce.models import HTMLField


# set upload directory to use the UPLOAD_ROOT set in settings
# UPLOAD_ROOT is defined differently in development or production
file_storage = FileSystemStorage(
    location=settings.UPLOAD_ROOT,
    base_url='/uploads'
)


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
        if hasattr(self, "name") and self.name:
            return self.name
        else:
            return "%s" % (type(self))


class Work(Base):
    """
    A work to be read collectively.
    """
    class Meta:
        abstract = True

    name = CharField(
        verbose_name=_("name"),
        max_length=200,
        help_text=_("The title of the book or text")
    )


class GoogleBookWorkQuerySet(QuerySet):
    def public(self):
        return self.filter(is_active=True)


class GoogleBookWorkManager(Manager):
    def get_query_set(self):
        return GoogleBookWorkQuerySet(
            self.model,
            using=self._db
        ).select_related(
            'page__submission', ).prefetch_related('page_set')


class GoogleBookWork(Work):
    """
    """
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

    objects = GoogleBookWorkManager()

    def save(self, *args, **kwargs):
        """Create Page objects if saved for the first time."""
        created = False
        if self.pk is None:
            created = True
        super(Base, self).save(*args, **kwargs)
        if created is True:
            for i in range(self.page_count):
                page = Page(work=self, number=i+1)
                page.save()


class PageQuerySet(QuerySet):
    def public(self):
        return self.filter(is_active=True)


class PageManager(Manager):
    def get_query_set(self):
        return PageQuerySet(self.model, using=self._db).select_related(
            'submission',
        )


class Page(Base):
    """
    """
    class Meta:
        ordering = ['work', 'number']

    work = ForeignKey(GoogleBookWork)
    number = IntegerField(verbose_name=_("Page Number"))

    objects = PageManager()

    def __unicode__(self):
        return "page %i in %s" % (self.number, self.work)


class GoogleBookWorkSubmission(Base):
    """
    A submission for a single page in the work.
    """
    class Meta:
        ordering = ['page']

    def audio_filename(self, filename):
        return 'uploads/%s/page_%i_%s' % (
            slugify(self.page.work.name),
            self.page.number,
            filename
        )

    page = OneToOneField(Page)
    audio_file = FileField(
        storage=file_storage,
        upload_to=audio_filename,
    )

    def __unicode__(self):
        return "audio for %s" % (self.page)


class TextWork(Work):
    """
    """
    text = TextField(verbose_name=_("Full Text"), blank=False, null=False)


class TextWorkSubmission(Base):
    """
    A submission for a single page in the work.
    """
    class Meta:
        ordering = ['-start_index']

    def audio_filename(self, filename):
        return 'uploads/%s/%i_%i_%s' % (
            slugify(self.work.name),
            self.start_index,
            self.end_index,
            filename
        )

    work = ForeignKey(TextWork)
    start_index = IntegerField()
    end_index = IntegerField()
    audio_file = FileField(
        storage=file_storage,
        upload_to=audio_filename,
    )

    def __unicode__(self):
        return "audio for %s" % (self.work)


class TextChunkWork(Work):
    """
    """
    def text_filename(self, filename):
        return 'uploads/%s/text_%s' % (
            slugify(self.name),
            filename
        )

    text_file = FileField(
        storage=file_storage,
        upload_to=text_filename,
    )

    def save(self, *args, **kwargs):
        """Create Chunk objects if saved for the first time."""
        created = False
        if self.pk is None:
            created = True

        super(TextChunkWork, self).save(*args, **kwargs)

        if created is True:
            f = open(self.text_file.path, 'r')
            myfile = File(f)

            text = ''

            for i, line in enumerate(myfile):
                if i % 15 is 0:
                    chunk = Chunk(work=self, text=text, number=i)
                    chunk.save()
                    text = ''
                else:
                    text += line


class ChunkQuerySet(QuerySet):
    def public(self):
        return self.filter(is_active=True)


class ChunkManager(Manager):
    def get_query_set(self):
        return ChunkQuerySet(self.model, using=self._db).select_related(
            'chunksubmission',
        )


class Chunk(Base):
    """
    """
    class Meta:
        ordering = ['work', 'number']

    work = ForeignKey(TextChunkWork)
    number = IntegerField(verbose_name=_("Chunk Number"))
    text = HTMLField(verbose_name=_("Text"), blank=False, null=False)

    objects = ChunkManager()

    def __unicode__(self):
        return "chunk %i in %s" % (self.number, self.work)


class ChunkSubmission(Base):
    """
    A submission for a single text chunk in the work.
    """
    class Meta:
        ordering = ['chunk']

    def audio_filename(self, filename):
        return 'uploads/%s/page_%i_%s' % (
            slugify(self.chunk.work.name),
            self.chunk.number,
            filename
        )

    chunk = OneToOneField(Chunk)
    audio_file = FileField(
        storage=file_storage,
        upload_to=audio_filename,
    )

    def __unicode__(self):
        return "audio for %s" % (self.chunk)


