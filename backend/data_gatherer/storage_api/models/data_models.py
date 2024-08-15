from django.db import models
from storage_api.models.image_models import Image
from storage_api.models.project_models import Project
from django.contrib import admin


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
        return "PRJ %s, #%s" % (self.project, self.content)


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
    alias = models.CharField(
        max_length=300,
        unique=True,
        null=True,
        blank=True
    )

    @property
    @admin.display(description='Name displayed in adj matrix')
    def matrix_name(self):
        if self.alias is not None:
            return "%s (%s)" % (self.alias, self.name)
        return "%s" % self.name

    class Meta:
        unique_together = ['project', 'name']

    def save(self, *args, **kwargs):
        if not self.alias:
            self.alias = None
        super(IGUser, self).save(*args, **kwargs)

    def __str__(self):
        return "PRJ: %s, %s" % (self.project.name, self.name)


class UserHashtagUse(models.Model):
    project = models.ForeignKey(
        Project,
        on_delete=models.RESTRICT
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
        on_delete=models.RESTRICT
    )

    class Meta:
        unique_together = ['image', 'hashtag', 'igUser', 'project']


