from rest_framework.generics import *
from .models import MediaEntry
from .serializers import MediaEntrySerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.generics import *
from rest_framework.views import APIView


class MediaEntryList(ListCreateAPIView):
    queryset = MediaEntry.objects.all()
    serializer_class = MediaEntrySerializer


class MediaEntryDetail(RetrieveAPIView):
    queryset = MediaEntry.objects.all()
    serializer_class = MediaEntrySerializer
