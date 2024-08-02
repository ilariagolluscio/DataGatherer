from storage_api.models.image_models import ImgCrop, Image


def save_reviewed_text(username_img_crop: ImgCrop, hashtag_img_crop: ImgCrop, user_rt: str, hashtag_rt: str):
    username_img_crop.reviewedText = user_rt
    username_img_crop.save()
    hashtag_img_crop.reviewedText = hashtag_rt
    hashtag_img_crop.save()
