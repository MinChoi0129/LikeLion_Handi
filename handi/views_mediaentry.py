from rest_framework.generics import *
from .models import MediaEntry
from .serializers import MediaEntrySerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.generics import *
from rest_framework.views import APIView

# video_url = models.CharField(max_length=250)
# image_url = models.CharField(max_length=250)
# data = models.JSONField()

# post => video_url, image_url, data
# get => Json이름_number


class MediaEntryList(ListCreateAPIView):
    queryset = MediaEntry.objects.all()
    serializer_class = MediaEntrySerializer


class MediaEntryDetail(RetrieveAPIView):
    queryset = MediaEntry.objects.all()
    serializer_class = MediaEntrySerializer
