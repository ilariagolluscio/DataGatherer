from storage_api.models.image_models import ImgCrop, Image
from storage_api.models.project_models import ProjectDefaultCrop


def apply_default_crop_to_target_image(img_instance: Image, defaultCrop: ProjectDefaultCrop):
    newCrop = ImgCrop(
        fieldName=defaultCrop.fieldName,
        topPercent=defaultCrop.topPercent,
        leftPercent=defaultCrop.leftPercent,
        widthPercent=defaultCrop.widthPercent,
        heightPercent=defaultCrop.heightPercent,
        recognizedText="",
        image=img_instance,
        author = defaultCrop.project.author,
    )
    newCrop.save()
    return newCrop
