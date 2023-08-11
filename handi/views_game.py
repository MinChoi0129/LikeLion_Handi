from rest_framework.generics import *
from rest_framework.response import Response
from rest_framework import status


class Game(RetrieveAPIView):
    def get(self, request, *args, **kwargs):
        return Response({}, status=status.HTTP_400_BAD_REQUEST)
