from django.db.transaction import atomic

from storage_api.models.data_models import IGUser, Hashtag, UserHashtagUse
from storage_api.models.image_models import ImgCrop, Image
from rest_framework.exceptions import ValidationError


@atomic
def extend_network_from_image(img_username_text, img_hashtags_text:str, project, image):
    if img_hashtags_text is None or img_username_text is None:
        raise ValidationError("Attenzione! Non sono ancora stati raccolti dati dall'immagine!")

    img_username_text = img_username_text.replace('\n', ' ').strip()
    img_hashtags_text = img_hashtags_text.replace('\n', ' ')

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

    for string in strings:
        if len(string) <= 1: continue
        if string[0] == '#':
            string = string[1:].strip()

            hashtag_queryset = Hashtag.objects.filter(
                project=project,
                content=string,
            )

            if hashtag_queryset.count() == 0:
                hashtag = Hashtag.objects.create(
                    project=project,
                    content=string,
                    createdFromImage=image
                )
            else:
                hashtag = hashtag_queryset.last()

            hashtag_entities.append(hashtag)

    if len(hashtag_entities) == 0:
        raise ValidationError('Nel testo, non sono presenti hashtags!')

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


