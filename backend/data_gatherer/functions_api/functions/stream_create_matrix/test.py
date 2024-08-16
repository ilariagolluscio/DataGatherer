import io

from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import TestCase, Client

from storage_api.models.data_models import *
from storage_api.models.image_models import *
from storage_api.models.project_models import *


class StreamCreateMatrix(TestCase):

    def setUp(self):
        from django.conf import settings

        self.project1 = Project.objects.create(
            name='Test'
        )

        self.project2 = Project.objects.create(
            name='Test2'
        )

        with open(settings.TEST_MEDIA_ROOT + '/test_screenshot.png', 'rb') as infile:
            _file = SimpleUploadedFile('test_screenshot', infile.read())
            self.image = Image.objects.create(
                file=_file,
                userId=0,
                isDataGathered=False,
                project=self.project1,
                average_hash=None,
                isSimilarTo=None
            )

        with open(settings.TEST_MEDIA_ROOT + '/test_screenshot.png', 'rb') as infile:
            _file = SimpleUploadedFile('test_screenshot', infile.read())
            self.image2 = Image.objects.create(
                file=_file,
                userId=25,
                isDataGathered=False,
                project=self.project1,
                average_hash=None,
                isSimilarTo=None
            )

    def tearDown(self):
        UserHashtagUse.objects.filter(
            image=self.image
        ).delete()

        self.image.file.delete()
        self.image.delete()

        UserHashtagUse.objects.filter(
            image=self.image2
        ).delete()

        self.image2.file.delete()
        self.image2.delete()

    def test_normal_operations(self):
        h_a = Hashtag.objects.create(
            project=self.project1,
            content='a',
            createdFromImage=self.image
        )

        h_b = Hashtag.objects.create(
            project=self.project1,
            content='b',
            createdFromImage=self.image
        )

        h_1 = Hashtag.objects.create(
            project=self.project2,
            content='1',
            createdFromImage=self.image
        )

        h_2 = Hashtag.objects.create(
            project=self.project2,
            content='2',
            createdFromImage=self.image
        )

        u_a = IGUser.objects.create(
            project=self.project1,
            name='usera',
            createdFromImage=self.image
        )

        u_b = IGUser.objects.create(
            project=self.project1,
            name='userb',
            createdFromImage=self.image
        )

        u_1 = IGUser.objects.create(
            project=self.project2,
            name='user1',
            createdFromImage=self.image
        )

        UserHashtagUse.objects.create(  # u_a 1st use of h1
            project=self.project1,
            igUser=u_a,
            hashtag=h_a,
            image=self.image
        )

        UserHashtagUse.objects.create(  # u_a 2nd use of h_a
            project=self.project1,
            igUser=u_a,
            hashtag=h_a,
            image=self.image2
        )

        UserHashtagUse.objects.create(  # u_a 1st use of h_b
            project=self.project1,
            igUser=u_a,
            hashtag=h_b,
            image=self.image
        )

        UserHashtagUse.objects.create( # u_b 1st use of h_b
            project=self.project1,
            igUser=u_b,
            hashtag=h_b,
            image=self.image
        )

        UserHashtagUse.objects.create(
            project=self.project2,
            igUser=u_1,
            hashtag=h_1,
            image=self.image
        )

        UserHashtagUse.objects.create(
            project=self.project2,
            igUser=u_1,
            hashtag=h_2,
            image=self.image
        )

        c = Client()
        response = c.get('/fx_api/matrix/%s/' % self.project1.pk)

        content = io.BytesIO(b"".join(response.streaming_content))
        wrapper = io.TextIOWrapper(content, encoding='utf-8')

        resulting_csv = wrapper.read()

        assert resulting_csv == ";usera;userb\na;2;0\nb;1;1\n"

    def test_export_matrix_with_no_data(self):
        c = Client()
        response = c.get('/fx_api/matrix/%s/' % self.project1.pk)

        content = io.BytesIO(b"".join(response.streaming_content))
        wrapper = io.TextIOWrapper(content, encoding='utf-8')

        resulting_csv = wrapper.read()

        assert resulting_csv == "%s%s%s" % (chr(34), chr(34), chr(10))

    def test_export_matrix_with_no_user_hashtag_uses(self):
        h_a = Hashtag.objects.create(
            project=self.project1,
            content='a',
            createdFromImage=self.image
        )

        h_b = Hashtag.objects.create(
            project=self.project1,
            content='b',
            createdFromImage=self.image
        )

        h_1 = Hashtag.objects.create(
            project=self.project2,
            content='1',
            createdFromImage=self.image
        )

        h_2 = Hashtag.objects.create(
            project=self.project2,
            content='2',
            createdFromImage=self.image
        )

        u_a = IGUser.objects.create(
            project=self.project1,
            name='usera',
            createdFromImage=self.image
        )

        u_b = IGUser.objects.create(
            project=self.project1,
            name='userb',
            createdFromImage=self.image
        )

        u_1 = IGUser.objects.create(
            project=self.project2,
            name='user1',
            createdFromImage=self.image
        )

        UserHashtagUse.objects.create(
            project=self.project2,
            igUser=u_1,
            hashtag=h_1,
            image=self.image
        )

        UserHashtagUse.objects.create(
            project=self.project2,
            igUser=u_1,
            hashtag=h_2,
            image=self.image
        )

        c = Client()
        response = c.get('/fx_api/matrix/%s/' % self.project1.pk)

        content = io.BytesIO(b"".join(response.streaming_content))
        wrapper = io.TextIOWrapper(content, encoding='utf-8')

        resulting_csv = wrapper.read()

        assert resulting_csv == "%s%s%s" % (chr(34), chr(34), chr(10))


