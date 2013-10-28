from django import template
import re

register = template.Library()


def render_text(parser, token):
    try:
        # split_contents() knows not to split quoted strings.
        args = token.split_contents()
        if len(args) == 2:
            tag_name, work = args

    except ValueError:
        raise template.TemplateSyntaxError, "%r tag requires at least two arguments" % token.contents.split()[0]

    return TextRenderNode(work)


class TextRenderNode(template.Node):
    def __init__(self, work):
        self.work = template.Variable(work)

    def render(self, context):
        work = self.work.resolve(context)

        html = work.text

        for submission in work.textworksubmission_set.all():
            html = html[:submission.start_index] + '<span class="uploaded">' + html[submission.start_index:]
            html = html[:submission.end_index] + '</span>' + html[submission.end_index:]
            print html

        return html


register.tag('render_text', render_text)
