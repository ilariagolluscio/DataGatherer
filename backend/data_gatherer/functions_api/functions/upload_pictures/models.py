from django.db import models
from storage_api.models.image_models import Image


class ImageFile(models.Model):
    file = models.FileField(upload_to='images/', unique=True)
    referencesImage = models.OneToOneField(
        Image,
        on_delete=models.CASCADE
    )

    def __str__(self):
        return "%s, image of %s" % (self.id, self.referencesImage)
