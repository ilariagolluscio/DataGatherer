from django.db import models
from django.contrib.auth.models import User

from storage_api.models.image_models import ImgCrop


class Project(models.Model):
    author = models.ForeignKey(
        User,
        on_delete=models.PROTECT,
    )
    name = models.CharField(
        max_length=50,
    )

    class Meta:
        unique_together = ['author', 'name']

    def __str__(self):
        return "%s" % self.name


class ProjectDefaultCrop(models.Model):
    author = models.ForeignKey(
        User,
        on_delete=models.PROTECT,
    )
    project = models.ForeignKey(
        Project,
        on_delete=models.CASCADE
    )

    topPercent = models.FloatField()
    leftPercent = models.FloatField()
    heightPercent = models.FloatField()
    widthPercent = models.FloatField()

    fieldName = models.CharField(max_length=30)

    class Meta:
        unique_together = ['project', 'fieldName']
