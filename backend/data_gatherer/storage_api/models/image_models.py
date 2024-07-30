from django.db import models
from storage_api.models.project_models import Project


class Image(models.Model):
    userId = models.IntegerField(unique=True)
    isDataGathered = models.BooleanField(default=False)
    project = models.ForeignKey(
        Project,
        on_delete=models.CASCADE
    )


class ImgCrop(models.Model):
    fieldName = models.CharField(max_length=30)
    topX = models.FloatField()
    topY = models.FloatField()
    height = models.FloatField()
    width = models.FloatField()
    recognizedText = models.TextField(max_length=10000)
    image = models.ForeignKey(
        Image,
        on_delete=models.CASCADE
    )
