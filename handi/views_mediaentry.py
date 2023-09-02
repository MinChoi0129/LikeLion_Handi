from rest_framework.generics import *
from .models import MediaEntry
from .serializers import MediaEntrySerializer
from rest_framework.generics import *


class MediaEntryList(ListCreateAPIView):
    queryset = MediaEntry.objects.all()
    serializer_class = MediaEntrySerializer


class MediaEntryDetail(RetrieveAPIView):
    queryset = MediaEntry.objects.all()
    serializer_class = MediaEntrySerializer
