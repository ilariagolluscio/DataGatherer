import csv

from django.http import HttpResponse

from storage_api.models.data_models import Hashtag, IGUser, UserHashtagUse
from storage_api.models.image_models import ImgCrop, Image
from storage_api.models.project_models import Project


def create_matrix(project: Project, response: HttpResponse):
    writer = csv.writer(response, delimiter=';', )

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

    hashtag_strings = ['']

    for hashtag in prj_hashtags:
        hashtag_strings.append(
            hashtag.content
        )

    writer.writerow(hashtag_strings)
    for user in prj_users:
        row = [user.name]
        for hashtag in prj_hashtags:
            row.append(
                UserHashtagUse.objects.filter(
                    igUser=user,
                    hashtag=hashtag,
                    project=project
                ).count()
            )
        writer.writerow(row)

    return response
