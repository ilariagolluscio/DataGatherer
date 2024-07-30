from django.db import models


class ImageFile(models.Model):
    file = models.FileField(upload_to='images/', unique=True)
