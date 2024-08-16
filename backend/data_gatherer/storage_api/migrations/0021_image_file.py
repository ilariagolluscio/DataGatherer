# Generated by Django 4.2.14 on 2024-08-16 13:30

from django.db import migrations, models
from django import setup
from django.apps import apps


def move_file_from_img_file_to_img(apps, schema_editor):
    Image = apps.get_model("storage_api", "image")

    for item in Image.objects.all():
        item.file = item.imagefile.file
        item.save()


class Migration(migrations.Migration):
    dependencies = [
        ('storage_api', '0020_alter_imgdata_unique_together'),
    ]

    operations = [
        migrations.AddField(
            model_name='image',
            name='file',
            field=models.FileField(default=None, null=True, blank=True, unique=True, upload_to='imgs/'),
            preserve_default=False,
        ),
        migrations.RunPython(move_file_from_img_file_to_img),
    ]
