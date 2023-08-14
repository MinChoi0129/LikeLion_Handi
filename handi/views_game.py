from rest_framework.generics import *
from rest_framework.response import Response
from rest_framework import status
from .models import MediaEntry
from random import shuffle


class Game(RetrieveAPIView):
    def get(self, request, *args, **kwargs):
        media_entries = list(MediaEntry.objects.all())
        shuffle(media_entries)
        media_entries = media_entries[:39]

        game_data = []
        for media_entry in media_entries:
            pair = [media_entry.name, media_entry.video_url]
            game_data.append(pair)

        return Response({"game_data": game_data}, status=status.HTTP_200_OK)
