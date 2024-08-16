from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import TestCase
from django.test import Client

from storage_api.models.image_models import Image
from storage_api.models.project_models import Project


class HashtagViewSetTestCase(TestCase):
    pass


class IGUserViewSetTestCase(TestCase):
    pass


class UserHashtagUseViewSetTestCase(TestCase):
    pass


class ImageViewSetTestCase(TestCase):
    pass


class ImgCropViewSetTestCase(TestCase):

    def setUp(self):
        from django.conf import settings

        self.project = Project.objects.create(
            name='Test'
        )

        with open(settings.MEDIA_ROOT + '/test/test_screenshot.png', 'rb') as infile:
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

    def test_creation_without_pre_existing_entities(self):
        c = Client()
        response = c.post('/storage_api/img_crops/', {
            'fieldName': 'Username',
            'topPercent': 0,
            'leftPercent': 0,
            'heightPercent': 100,
            'widthPercent': 50.55555555,
            'recognizedText': '',
            'image': self.image.pk
        })

        assert response.status_code == 201

    def test_creation_with_pre_existing_entities(self):
        c = Client()
        c.post('/storage_api/img_crops/', {
            'fieldName': 'Username',
            'topPercent': 0,
            'leftPercent': 0,
            'heightPercent': 100,
            'widthPercent': 50.55555555,
            'recognizedText': '',
            'image': self.image.pk
        })

        response = c.post('/storage_api/img_crops/', {
            'fieldName': 'Username',
            'topPercent': 0,
            'leftPercent': 0,
            'heightPercent': 10,
            'widthPercent': 50.55555555,
            'recognizedText': '',
            'image': self.image.pk
        })

        assert response.status_code == 201


class ImgDataViewSetTestCase(TestCase):

    def setUp(self):
        from django.conf import settings

        self.project = Project.objects.create(
            name='Test'
        )

        with open(settings.MEDIA_ROOT + '/test/test_screenshot.png', 'rb') as infile:
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

    def test_creation_without_pre_existing_entities(self):
        c = Client()

        response = c.post('/storage_api/img_data/', {
            'fieldName': 'Username',
            'value': 'bubi',
            'image': self.image.pk
        })

        assert response.status_code == 201

    def test_creation_with_pre_existing_entities(self):
        c = Client()

        response = c.post('/storage_api/img_data/', {
            'fieldName': 'Username',
            'value': 'bubi',
            'image': self.image.pk
        })

        assert response.status_code == 201

        response = c.post('/storage_api/img_data/', {
            'fieldName': 'Username',
            'value': 'bubi',
            'image': self.image.pk
        })

        assert response.status_code == 201

        response = c.post('/storage_api/img_data/', {
            'fieldName': 'Username',
            'value': 'bubidtfyvu',
            'image': self.image.pk
        })

        assert response.status_code == 201


class ProjectViewSetTestCase(TestCase):
    pass


class ProjectDefaultCropViewSetTestCase(TestCase):

    def setUp(self):
        self.project = Project.objects.create(
            name="test"
        )

    def test_creation_without_pre_existing_entities(self):
        c = Client()
        response = c.post('/storage_api/prj_default_crop/', {
            'project': self.project.pk,
            'topPercent': 0,
            'leftPercent': 0,
            'heightPercent': 1,
            'widthPercent': 9.9999999,
            'fieldName': 'Bub',
        })

        assert response.status_code == 201

    def test_creation_with_pre_existing_entities(self):
        c = Client()
        response = c.post('/storage_api/prj_default_crop/', {
            'project': self.project.pk,
            'topPercent': 0,
            'leftPercent': 0,
            'heightPercent': 1,
            'widthPercent': 9.9999999,
            'fieldName': 'Bub',
        })

        assert response.status_code == 201

        response = c.post('/storage_api/prj_default_crop/', {
            'project': self.project.pk,
            'topPercent': 0,
            'leftPercent': 0,
            'heightPercent': 1,
            'widthPercent': 9.9999999,
            'fieldName': 'Bub',
        })

        assert response.status_code == 201

        response = c.post('/storage_api/prj_default_crop/', {
            'project': self.project.pk,
            'topPercent': 0,
            'leftPercent': 85,
            'heightPercent': 11,
            'widthPercent': 9.9999,
            'fieldName': 'Bub',
        })

        assert response.status_code == 201
