# Generated by Django 4.2.14 on 2024-08-15 21:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('storage_api', '0016_alter_projectdefaultcrop_unique_together'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='imgcrop',
            name='isDefault',
        ),
        migrations.AlterField(
            model_name='projectdefaultcrop',
            name='fieldName',
            field=models.CharField(help_text='Questo campo è impostato, al salvataggio, uguale al valore di imgCrop di riferimento', max_length=30),
        ),
    ]
