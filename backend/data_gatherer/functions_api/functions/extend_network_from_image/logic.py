from django.db.transaction import atomic
import string as string_lib

from rest_framework import status

from storage_api.models.data_models import IGUser, Hashtag, UserHashtagUse
from storage_api.models.image_models import ImgCrop, Image
from rest_framework.exceptions import ValidationError


def _prepare_string(hashtag_content):
    hashtag_content = hashtag_content[1:].strip()
    hashtag_content = hashtag_content.translate(str.maketrans('', '', string_lib.punctuation))
    return hashtag_content.lower()


@atomic
def extend_network_from_image(img_username_text, img_hashtags_text:str, project, image):
    if project is None:
        raise ValidationError("Non è stato passato alcun progetto", status.HTTP_500_INTERNAL_SERVER_ERROR)

    if project is None:
        raise ValidationError("Non è stata passata alcuna immagine", status.HTTP_500_INTERNAL_SERVER_ERROR)

    if img_hashtags_text is None or img_username_text is None:
        raise ValidationError("Attenzione! Non sono ancora stati raccolti dati dall'immagine!", status.HTTP_500_INTERNAL_SERVER_ERROR)

    img_username_text = (img_username_text
                         .replace('\n', ' ')
                         .strip())
    img_hashtags_text = (img_hashtags_text
                         .replace('\n', ' ')
                         .replace('#', ' #'))

    user_queryset = IGUser.objects.filter(
        project=project,
        name=img_username_text
    )
    if user_queryset.count() == 0:
        user = IGUser.objects.create(
            project=project,
            name=img_username_text,
            createdFromImage=image
        )
    else:
        user = user_queryset.last()

    strings = img_hashtags_text.split(" ")
    hashtag_entities = []

    for hashtag_content in strings:
        if len(hashtag_content) <= 1: continue
        if hashtag_content[0] == '#':
            hashtag_content = _prepare_string(hashtag_content)

            hashtag_queryset = Hashtag.objects.filter(
                project=project,
                content=hashtag_content,
            )

            if hashtag_queryset.count() == 0:
                hashtag = Hashtag.objects.create(
                    project=project,
                    content=hashtag_content,
                    createdFromImage=image
                )
            else:
                hashtag = hashtag_queryset.last()

            hashtag_entities.append(hashtag)

    UserHashtagUse.objects.filter(
        image=image,
        project=image.project
    ).delete()

    for item in hashtag_entities:
        hashtag_entity:Hashtag = item
        UserHashtagUse.objects.get_or_create(
            project=project,
            igUser=user,
            hashtag=hashtag_entity,
            image=image
        )

    image.isDataGathered = True
    image.save()


