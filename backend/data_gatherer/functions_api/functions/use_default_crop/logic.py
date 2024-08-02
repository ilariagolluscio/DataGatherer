from storage_api.models.image_models import ImgCrop, Image


def apply_default_crop_to_target_image(img_instance: Image, crop_instance: ImgCrop):
    newCrop = ImgCrop(
        fieldName=crop_instance.fieldName,
        topPercent=crop_instance.topPercent,
        leftPercent=crop_instance.leftPercent,
        widthPercent=crop_instance.widthPercent,
        heightPercent=crop_instance.heightPercent,
        isDefault=False,
        recognizedText="",
        image=img_instance
    )
    newCrop.save()
    return newCrop