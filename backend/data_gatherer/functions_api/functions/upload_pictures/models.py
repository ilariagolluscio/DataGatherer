from django.db import models

from functions_api.functions.upload_pictures.logic import average_hash
from storage_api.models.image_models import Image


# Do not erase, it's needed for migrations work.
@DeprecationWarning
class ImageFile(models.Model):
    file = models.FileField(upload_to='images/', unique=True)
    referencesImage = models.OneToOneField(
        Image,
        on_delete=models.CASCADE
    )
    average_hash = models.CharField(max_length=4000, blank=True, null=True)

    def __str__(self):
        return "%s, image of %s" % (self.id, self.referencesImage)
