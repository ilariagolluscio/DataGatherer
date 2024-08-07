import csv

from django.http import HttpResponse, StreamingHttpResponse

from storage_api.models.data_models import Hashtag, IGUser, UserHashtagUse
from storage_api.models.image_models import ImgCrop, Image
from storage_api.models.project_models import Project


class Counter:
    val = 0

    def increase(self):
        self.val = self.val + 1

    def get(self):
        return self.val


class CSVBuffer:
    def write(self, value):
        return value


def csv_serializer(hashtag: Hashtag, prj_users, project: Project, counter_instance: Counter, first_row):
    if counter_instance.get() == 0:
        counter_instance.increase()
        return first_row

    row = [hashtag.content]
    for item in prj_users:
        user: IGUser = item
        row.append(UserHashtagUse.objects.filter(
            igUser=user,
            hashtag=hashtag,
            project=project
        ).count())
    return row


def stream_create_matrix(project: Project, response: StreamingHttpResponse):
    prj_hashtags = Hashtag.objects.filter(
        project=project
    )
    prj_users = IGUser.objects.filter(
        project=project
    )

    for hashtag in prj_hashtags:
        uses = UserHashtagUse.objects.filter(
            hashtag=hashtag
        ).count()

        if uses == 0:
            prj_hashtags = prj_hashtags.exclude(pk=hashtag.pk)

    for user in prj_users:
        uses = UserHashtagUse.objects.filter(
            igUser=user
        ).count()

        if uses == 0:
            prj_users = prj_users.exclude(pk=user.pk)

    username_strings = ['']
    for user in prj_users:
        username_strings.append(
            user.name
        )

    writer = csv.writer(CSVBuffer(), delimiter=';')

    iterator = prj_hashtags.iterator()

    counter_instance = Counter()

    response = StreamingHttpResponse((writer.writerow(csv_serializer(
        hashtag_item, prj_users, project, counter_instance, username_strings
    )) for hashtag_item in iterator), content_type="text/csv")

    return response
