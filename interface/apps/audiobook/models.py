from django.db.models import *
from django.db.models.query import QuerySet
from django.utils import timezone
from django.utils.translation import ugettext_lazy as _
from django.template.defaultfilters import slugify


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


class WorkQuerySet(QuerySet):
    def public(self):
        return self.filter(is_active=True)


class WorkManager(Manager):
    def get_query_set(self):
        return WorkQuerySet(self.model, using=self._db).select_related(
                'page__submission', 
            ).prefetch_related('page_set')


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
    objects = WorkManager()

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

    work = ForeignKey(Work)
    number = IntegerField(verbose_name=_("Page Number"))

    objects = PageManager()

    def __unicode__(self):
        return "page %i in %s" % (self.number, self.work)


class Submission(Base):
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
        upload_to=audio_filename,
    )

    def __unicode__(self):
        return "audio for %s" % (self.page)
