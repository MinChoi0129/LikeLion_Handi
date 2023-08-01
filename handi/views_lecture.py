from django.shortcuts import render
from rest_framework.generics import *
from .models import Lecture
from .serializers import LectureSerializer

# Create your views here.


class LectureList(ListCreateAPIView):
    queryset = Lecture.objects.all()
    serializer_class = LectureSerializer


# READ Lecture(s)
class LectureDetail(RetrieveAPIView):
    queryset = Lecture.objects.all()
    serializer_class = LectureSerializer


# UPDATE Lecture
class LectureUpdate(UpdateAPIView):
    queryset = Lecture.objects.all()
    serializer_class = LectureSerializer


# DELETE Lecture
class LectureDelete(DestroyAPIView):
    queryset = Lecture.objects.all()
    serializer_class = LectureSerializer
