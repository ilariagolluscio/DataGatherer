from django.db import models
from storage_api.models.image_models import Image


class IgData(models.Model):
    username = models.CharField(max_length=500)
    image = models.ForeignKey(
        Image,
        on_delete=models.CASCADE
    )


class Hashtag(models.Model):
    Content = models.CharField(max_length=500)
    igData = models.ForeignKey(
        IgData,
        on_delete=models.CASCADE
    )
