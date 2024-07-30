from rest_framework.views import APIView
from rest_framework import authentication, permissions


class LogicApiBaseAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    class Meta:
        abstract = True