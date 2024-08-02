from django.db import models
from storage_api.models.image_models import Image
from storage_api.models.project_models import Project


class ImgData(models.Model):
    content = models.CharField(max_length=500)
    tag = models.CharField(max_length=30)
    image = models.ForeignKey(
        Image,
        on_delete=models.CASCADE
    )

    def __str__(self):
        return "[%s] %s" % (self.tag, self.content)


class Hashtag(models.Model):
    project = models.ForeignKey(
        Project,
        on_delete=models.CASCADE
    )
    content = models.CharField(max_length=500)
    createdFromImage = models.ForeignKey(
        Image,
        on_delete=models.SET_NULL,
        null=True
    )

    class Meta:
        unique_together = ['project', 'content']

    def __str__(self):
        return "# %s" % self.content


class IGUser(models.Model):
    project = models.ForeignKey(
        Project,
        on_delete=models.CASCADE
    )
    name = models.CharField(max_length=300)
    description = models.TextField(max_length=500, null=True, blank=True)
    createdFromImage = models.ForeignKey(
        Image,
        on_delete=models.SET_NULL,
        null=True
    )

    class Meta:
        unique_together = ['project', 'name']

    def __str__(self):
        return "%s" % self.name


class UserHashtagUse(models.Model):
    project = models.ForeignKey(
        Project,
        on_delete=models.CASCADE
    )
    igUser = models.ForeignKey(
        IGUser,
        on_delete=models.RESTRICT
    )
    hashtag = models.ForeignKey(
        Hashtag,
        on_delete=models.RESTRICT
    )
    image = models.ForeignKey(
        Image,
        on_delete=models.CASCADE
    )

    class Meta:
        unique_together = ['image', 'hashtag', 'igUser', 'project']
