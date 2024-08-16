# Generated by Django 4.2.14 on 2024-08-16 13:30

from django.db import migrations, models


def move_file_from_img_file_to_img(apps, schema_editor):
    # We can't import the Person model directly as it may be a newer
    # version than this migration expects. We use the historical version.
    ImageFile = apps.get_model("functions_api", "ImageFile")

    for item in ImageFile.objects.all():
        img_file = item
        img = img_file.referencesImage
        img.file = img_file.file
        img.save()


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
