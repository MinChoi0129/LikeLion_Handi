from django.http import JsonResponse
from rest_framework.generics import *
from .models import User
from .serializers import UserSerializer


# CREATE a User or Get All Users
class UserList(ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


# READ User
class UserDetail(RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


# UPDATE User
class UserUpdate(UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


# DELETE User
class UserDelete(DestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserRank(RetrieveAPIView):
    def get(self, request, *args, **kwargs):
        all_users = User.objects.all()
        print(kwargs)
        me = User.objects.get(id=kwargs['pk'])
        my_score, my_name = me.game_score, me.name
        return JsonResponse({
            "me": (my_score, my_name),
            "all_users": sorted([(user.game_score, user.name) for user in all_users], reverse=True)
        }, json_dumps_params={'ensure_ascii': False})

    queryset = User.objects.all()
    serializer_class = UserSerializer
