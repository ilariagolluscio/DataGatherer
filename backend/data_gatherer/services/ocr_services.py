from PIL import Image
from pytesseract import pytesseract


def read_text_from_img(img_path, top_percent, left_percent, width_percent, height_percent):
    path_to_tesseract = "/usr/local/bin/tesseract"
    image_path = img_path

    print(image_path)

    img = Image.open(image_path)

    left = left_percent * 0.01 * img.width
    top = top_percent * 0.01 * img.height
    right = (width_percent * 0.01 * img.width) + left
    bottom = (height_percent * 0.01 * img.height) + top

    crop_img = img.crop((left, top, right, bottom))

    pytesseract.tesseract_cmd = path_to_tesseract

    crop_img = crop_img.convert('L')
    text = pytesseract.image_to_string(crop_img)

    print(text)

    if text == "":
        return "N.A."

    return text[:-1]
