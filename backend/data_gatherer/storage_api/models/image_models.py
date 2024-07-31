from django.db import models
from storage_api.models.project_models import Project


class Image(models.Model):
    userId = models.IntegerField()
    isDataGathered = models.BooleanField(default=False)
    project = models.ForeignKey(
        Project,
        on_delete=models.CASCADE
    )

    class Meta:
        unique_together = ['project', 'userId']

    def __str__(self):
        return "img %d, prj %s" % (self.userId, self.project_id)


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

    def __str__(self):
        return "crop %s of img %s" % (self.id, self.image_id)
