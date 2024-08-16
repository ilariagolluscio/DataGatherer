import rest_framework.exceptions
from django.core.exceptions import ObjectDoesNotExist
from django.core.files.uploadedfile import SimpleUploadedFile
from django.db.models import RestrictedError
from django.test import TestCase

from functions_api.functions.extend_network_from_image.logic import extend_network_from_image
from storage_api.models.data_models import *
from storage_api.models.image_models import *
from storage_api.models.project_models import *

import os
pre_path = os.environ.get('TEST_PRE_PATH', default='')

class ExtendNetworkFromImage(TestCase):

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

        with open(settings.TEST_MEDIA_ROOT + '/test_screenshot.png', 'rb') as infile:
            _file = SimpleUploadedFile('test_screenshot', infile.read())
            self.image2 = Image.objects.create(
                file=_file,
                userId=2,
                isDataGathered=False,
                project=self.project,
                average_hash=None,
                isSimilarTo=None
            )

    def tearDown(self):
        UserHashtagUse.objects.filter(
            image=self.image
        ).delete()

        UserHashtagUse.objects.filter(
            image=self.image2
        ).delete()

        self.image.file.delete()
        self.image.delete()

        self.image2.file.delete()
        self.image2.delete()

    def test_extend_network_from_image_with_no_data(self):
        try:
            extend_network_from_image(
                '',
                '',
                None,
                None
            )
        except rest_framework.exceptions.ValidationError:
            return

        raise Exception('Questo test dovrebbe fallire')


    def test_delete_image(self):
        extend_network_from_image(
            'pippo',
            '#ciao #sus',
            self.project,
            self.image
        )
        try:
            self.image.delete()
        except RestrictedError:
            return

        raise Exception("Questo test dovrebbe fallire")

    def test_extend_network_with_correct_data(self):
        extend_network_from_image(
            'pippo',
            '#ciao #sus',
            self.project,
            self.image
        )

        extend_network_from_image(
            'pippo',
            '#ciao #sus',
            self.project,
            self.image2
        )

        IGUser.objects.get(
            project=self.project,
            name='pippo',
            description=None,
            createdFromImage=self.image
        )

        Hashtag.objects.get(
            project=self.project,
            content='ciao',
            createdFromImage=self.image
        )

        Hashtag.objects.get(
            project=self.project,
            content='sus',
            createdFromImage=self.image
        )

    def test_extend_network_with_no_user(self):
        extend_network_from_image(
            '',
            '#ciao #sus',
            self.project,
            self.image
        )

        Hashtag.objects.get(
            project=self.project,
            content='ciao',
            createdFromImage=self.image
        )

        Hashtag.objects.get(
            project=self.project,
            content='sus',
            createdFromImage=self.image
        )

    def test_extend_network_with_no_hashtags(self):
        extend_network_from_image(
            'pippo',
            '',
            self.project,
            self.image
        )

        IGUser.objects.get(
            project=self.project,
            name='pippo',
            description=None,
            createdFromImage=self.image
        )

    def test_extend_network_with_badly_given_hashtags_string(self):
        extend_network_from_image(
            'pippo!\n',
            '#cia@o!#sus#sas\n#sosser\nwa\n antonio',
            self.project,
            self.image
        )

        IGUser.objects.get(
            project=self.project,
            name='pippo!',
            description=None,
            createdFromImage=self.image
        )

        Hashtag.objects.get(
            project=self.project,
            content='ciao',
            createdFromImage=self.image
        )

        Hashtag.objects.get(
            project=self.project,
            content='sus',
            createdFromImage=self.image
        )

        Hashtag.objects.get(
            project=self.project,
            content='sas',
            createdFromImage=self.image
        )

        Hashtag.objects.get(
            project=self.project,
            content='sosser',
            createdFromImage=self.image
        )

        try:
            Hashtag.objects.get(
                project=self.project,
                content='antonio',
                createdFromImage=self.image
            )
        except ObjectDoesNotExist:
            return

        raise Exception("Non dovrebbe funzionare!")

        