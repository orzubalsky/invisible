from django.core.files.uploadhandler import FileUploadHandler
from django.core.files.uploadedfile import TemporaryUploadedFile
from django.core.cache import cache


class UploadProgressCachedHandler(FileUploadHandler):
    """
    Tracks progress for file uploads.
    The http post request must contain a header or query parameter,
    'X-Progress-ID', which should contain a unique string to identify
    the upload to be tracked.

    Copied from:
    http://djangosnippets.org/snippets/678/

    See views.py for upload_progress function...
    """

    def __init__(self, request=None):
        super(UploadProgressCachedHandler, self).__init__(request)
        self.progress_id = None
        self.cache_key = None

    def handle_raw_input(self, input_data, META, content_length, boundary, encoding=None):
        """
        """
        self.content_length = content_length
        if 'X-Progress-ID' in self.request.GET:
            self.progress_id = self.request.GET['X-Progress-ID']
        elif 'X-Progress-ID' in self.request.META:
            self.progress_id = self.request.META['X-Progress-ID']
        if self.progress_id:
            self.cache_key = "%s_%s" % (
                self.request.META['REMOTE_ADDR'],
                self.progress_id
            )
            cache.set(self.cache_key, {
                'length': self.content_length,
                'uploaded': 0
            })

    def new_file(self, field_name, file_name, content_type, content_length, charset=None):
        """
        """
        self.field_name = field_name
        self.file_name = file_name
        self.content_type = content_type
        self.content_length = content_length
        self.charset = charset

        self.file = TemporaryUploadedFile(
            self.file_name,
            self.content_type,
            0,
            self.charset
        )

    def receive_data_chunk(self, raw_data, start):
        """
        """
        if self.cache_key:
            data = cache.get(self.cache_key)
            data['uploaded'] += self.chunk_size
            cache.set(self.cache_key, data)
            self.file.write(raw_data)
        return raw_data

    def file_complete(self, file_size):
        """
        """
        self.file.seek(0)
        self.file.size = file_size
        self.file.close()
        return self.file

    def upload_complete(self):
        """
        """
        if self.cache_key:
            cache.delete(self.cache_key)
