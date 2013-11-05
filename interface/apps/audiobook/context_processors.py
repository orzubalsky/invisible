from django.conf import settings


def google_analytics(request):
    try:
        if settings.GOOGLE_ANALYTICS_KEY:
            return {'GOOGLE_ANALYTICS_KEY': settings.GOOGLE_ANALYTICS_KEY}
    except:
        return {}
