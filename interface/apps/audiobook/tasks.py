import celery, subprocess, pipes, os
from celery.utils.log import get_task_logger
from django.conf import settings
from django.template.defaultfilters import slugify


@celery.task
def test():
    logger = test.get_logger()
    logger.info('running test app')


@celery.task
def process_audio(submission_obj):
    """ """

    # get the path to the uploaded audio file
    audio_filename = submission_obj.audio_file.path

    # run all conversions on input file
    subdir = slugify(submission_obj.chunk.work.name)
    if convert_audio(audio_filename, subdir) is True:

        # change flag on object
        submission_obj.is_converted = True
        submission_obj.save()

        return True


def convert_audio(input_file, subdir=None):
    """ convert an audio file """
    logger = process_audio.get_logger()
    logger.info('converting audio from: %s' % input_file)

    # split path into its components
    drive, path_and_file = os.path.splitdrive(input_file)
    path, filename = os.path.split(path_and_file)
    filename, extension = os.path.splitext(filename)

    # escape input for shell process
    safe_input = pipes.quote(input_file)
    safe_filename = '%s/uploads/%s/%s' % (
        settings.UPLOAD_ROOT,
        subdir,
        filename
    )

    logger.info('safe input: %s' % safe_input)
    logger.info('safe filename: %s' % safe_filename)

    # mp3 (H.264 / AAC)
    mp3 = 'ffmpeg -i %s -vn -ar 44100 -ac 2 -ab 192k -f mp3 %s.mp3' % (
        safe_input,
        safe_filename
    )

    # m4a
    m4a = 'ffmpeg -i %s -acodec libfaac -ac 2 -ab 192k %s.m4a' % (
        safe_input,
        safe_filename
    )

    commands = []
    if extension != '.mp3':
        commands.append(mp3)
    if extension != '.m4a':
        commands.append(m4a)

    # run the commands
    for command in commands:
        logger.info('running command: %s' % command)
        subprocess.call(command, shell=True)

    return True
