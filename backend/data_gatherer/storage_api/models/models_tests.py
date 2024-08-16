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
        pass

    def test_save_new_entity_with_no_pre_existing_entities(self):
        raise Exception

    def test_save_new_entity_with_pre_existing_entities(self):
        raise Exception

    def test_recognize_text_from_readable_image(self):
        raise Exception

    def test_recognize_text_from_unreadable_image(self):
        raise Exception

    def test_recognize_text_from_invalid_image(self):
        raise Exception


class ProjectModelTestCase(TestCase):
    pass


class ProjectDefaultCropModelTestCase(TestCase):
    pass

