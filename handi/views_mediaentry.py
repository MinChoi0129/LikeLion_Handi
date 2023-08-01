from django.shortcuts import render
from rest_framework.generics import *
from .models import MediaEntry
from .serializers import MediaEntrySerializer

# Create your views here.

# CREATE MediaEntry


class MediaEntryList(ListCreateAPIView):
    queryset = MediaEntry.objects.all()
    serializer_class = MediaEntrySerializer

# READ MediaEntry(s)


class MediaEntryDetail(RetrieveAPIView):
    queryset = MediaEntry.objects.all()
    serializer_class = MediaEntrySerializer

# UPDATE MediaEntry


class MediaEntryUpdate(UpdateAPIView):
    queryset = MediaEntry.objects.all()
    serializer_class = MediaEntrySerializer


# DELETE MediaEntry
class MediaEntryDelete(DestroyAPIView):
    queryset = MediaEntry.objects.all()
    serializer_class = MediaEntrySerializer
