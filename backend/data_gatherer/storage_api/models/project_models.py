from django.db import models

from storage_api.models.image_models import ImgCrop


class Project(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return "%s" % self.name


class ProjectDefaultCrop(models.Model):
    project = models.ForeignKey(
        Project,
        on_delete=models.CASCADE
    )
    imgCrop = models.ForeignKey(
        ImgCrop,
        on_delete=models.CASCADE,
    )
    fieldName = models.CharField(
        max_length=30,
        help_text='Questo campo è impostato, al salvataggio, uguale al valore di imgCrop di riferimento'
    )

    def save(
        self, *args, **kwargs
    ):
        self.fieldName = self.imgCrop.fieldName
        super().save(*args, **kwargs)

    class Meta:
        unique_together = ['project', 'fieldName']



