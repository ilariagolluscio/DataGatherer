from django.db import models

from services.ocr_services import read_text_from_img
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
    topPercent = models.FloatField()
    leftPercent = models.FloatField()
    heightPercent = models.FloatField()
    widthPercent = models.FloatField()
    isDefault = models.BooleanField(default=False)
    recognizedText = models.TextField(max_length=10000, blank=True)
    reviewedText = models.TextField(max_length=10000, blank=True, null=True)

    image = models.ForeignKey(
        Image,
        on_delete=models.CASCADE
    )

    def save(
        self, force_insert=False, force_update=False, using=None, update_fields=None
    ):
        self.recognizedText = read_text_from_img(
            self.image.imagefile.file.path,
            self.topPercent,
            self.leftPercent,
            self.widthPercent,
            self.heightPercent
        )

        if self.isDefault:
            queryset = ImgCrop.objects.filter(isDefault=True, fieldName=self.fieldName)
            for item in queryset:
                item.isDefault = False
                item.save()

        super().save(force_insert, force_update, using, update_fields)

    def __str__(self):
        return "crop %s of img %s" % (self.id, self.image_id)
