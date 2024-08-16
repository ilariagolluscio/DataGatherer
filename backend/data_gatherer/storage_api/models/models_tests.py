from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import TestCase
from storage_api.models.project_models import *
from storage_api.models.image_models import *
from storage_api.models.data_models import *


class HashtagModelTestCase(TestCase):
    pass


class IgModelTestCase(TestCase):

    def setUp(self):
        self.project = Project.objects.create(
            name='TestPrj'
        )

    def test_ig_user_matrix_name_with_alias(self):
        name = 'Pippo'
        alias = 'Geronimo'

        ig_user = IGUser.objects.create(
            project=self.project,
            name=name,
            createdFromImage=None,
            alias=alias
        )

        assert ig_user.matrix_name == "%s (%s)" % (alias, name)

    def test_ig_user_matrix_name_without_alias(self):
        name = 'Pippo'
        alias = None

        ig_user = IGUser.objects.create(
            project=self.project,
            name=name,
            createdFromImage=None,
            alias=alias
        )

        assert ig_user.matrix_name == "%s" % name

    def test_save_ig_user_with_blank_alias(self):
        name = 'Pippo'
        alias = ''

        ig_user = IGUser.objects.create(
            project=self.project,
            name=name,
            createdFromImage=None,
            alias=alias
        )

        assert ig_user.alias is None


class UserHashtagUseModelTestCase(TestCase):
    pass


class ImageModelTestCase(TestCase):
    pass


class ImgDataModelTestCase(TestCase):
    pass


class ImgCropModelTestCase(TestCase):

    def setUp(self):
        from django.conf import settings

        self.project = Project.objects.create(
            name='Test'
        )

        with open(settings.TEST_MEDIA_ROOT + '/test_screenshot.png', 'rb') as infile:
            _file = SimpleUploadedFile('test_screenshot', infile.read())
            self.image = Image.objects.create(
                file=_file,
                userId=0,
                isDataGathered=False,
                project=self.project,
                average_hash=None,
                isSimilarTo=None
            )

    def tearDown(self):
        self.image.file.delete()
        self.image.delete()

    def test_save_new_entity_with_no_pre_existing_entities(self):
        ImgCrop.objects.create(
            fieldName='Username',
            topPercent=0.1,
            leftPercent=0.1,
            heightPercent=0.2,
            widthPercent=0.2,
            recognizedText='4w3r904g',
            reviewedText='t4ej2',
            image=self.image
        )

    def test_save_new_entity_with_pre_existing_entities(self):
        ImgCrop.objects.create(
            fieldName='Username',
            topPercent=0.1,
            leftPercent=0.1,
            heightPercent=0.2,
            widthPercent=0.2,
            recognizedText='4w3r904g',
            reviewedText='t4ej2',
            image=self.image
        )

        ImgCrop.objects.create(
            fieldName='Username',
            topPercent=0.1,
            leftPercent=0.1,
            heightPercent=0.2,
            widthPercent=0.2,
            recognizedText='4w3r904g',
            reviewedText='t4ej2',
            image=self.image
        )

    def test_recognize_text_from_readable_image(self):
        from django.conf import settings

        with open(settings.TEST_MEDIA_ROOT + '/cropped_readable_screenshot.png', 'rb') as infile:
            _file = SimpleUploadedFile('test_screenshot_1', infile.read())
            local_img = Image.objects.create(
                file=_file,
                userId=1,
                isDataGathered=False,
                project=self.project,
                average_hash=None,
                isSimilarTo=None
            )

        img_crop = ImgCrop.objects.create(
            fieldName='Username',
            topPercent=0,
            leftPercent=0,
            heightPercent=100,
            widthPercent=100,
            recognizedText='4w3r904g',
            reviewedText='t4ej2',
            image=local_img
        )

        print("B iwa")
        print('\'%s\'' % img_crop.recognizedText)

        assert img_crop.recognizedText.strip() == 'niolajet + Follow'

        local_img.file.delete()
        local_img.delete()

    def test_recognize_text_from_unreadable_image(self):
        from django.conf import settings

        with open(settings.TEST_MEDIA_ROOT + '/cropped_unreadable_screenshot.png', 'rb') as infile:
            _file = SimpleUploadedFile('test_screenshot_2', infile.read())
            local_img = Image.objects.create(
                file=_file,
                userId=1,
                isDataGathered=False,
                project=self.project,
                average_hash=None,
                isSimilarTo=None
            )

        img_crop = ImgCrop.objects.create(
            fieldName='Username',
            topPercent=0,
            leftPercent=0,
            heightPercent=100,
            widthPercent=100,
            recognizedText='4w3r904g',
            reviewedText='t4ej2',
            image=local_img
        )

        print("A iwa")
        print('\'%s\'' % img_crop.recognizedText)

        if img_crop.recognizedText == '':
            img_crop.recognizedText = 'N.A.'

        assert img_crop.recognizedText == 'N.A.'

        local_img.file.delete()
        local_img.delete()

    def test_recognize_text_from_invalid_image(self):
        from django.conf import settings

        with open(settings.TEST_MEDIA_ROOT + '/cropped_unreadable_screenshot.png', 'rb') as infile:
            _file = SimpleUploadedFile('test_screenshot_2', infile.read())
            local_img = Image.objects.create(
                file=_file,
                userId=1,
                isDataGathered=False,
                project=self.project,
                average_hash=None,
                isSimilarTo=None
            )

        try:

            ImgCrop.objects.create(
                fieldName='Username',
                topPercent=100,
                leftPercent=100,
                heightPercent=0,
                widthPercent=0,
                recognizedText='4w3r904g',
                reviewedText='t4ej2',
                image=local_img
            )

        except ValidationError:
            local_img.file.delete()
            local_img.delete()
            return

        raise Exception('Questo test dovrebbe fallire')


class ProjectModelTestCase(TestCase):
    pass


class ProjectDefaultCropModelTestCase(TestCase):
    pass
