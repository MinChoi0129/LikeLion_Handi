from rest_framework.generics import *
from rest_framework.response import Response
from .models import Lecture
from .serializers import LectureSerializer


# Create a Lecuture or Get All Lectures
class LectureList(ListCreateAPIView):
    def post(self, request, *args, **kwargs):
        lecture = Lecture.objects.filter(name__contains = request.data['name'])
        serializer = LectureSerializer(lecture, many=True)
        return Response(serializer.data)
    
    queryset = Lecture.objects.all()
    serializer_class = LectureSerializer


# READ Lecture
class LectureDetail(RetrieveAPIView):
    queryset = Lecture.objects.all()
    serializer_class = LectureSerializer
