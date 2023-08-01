from django.urls import path
from .views_lecture import *
from .views_lecture_manager import *
from .views_user import *
from .views_mediaentry import *

urlpatterns = [
    # users (모든 유저들을 read / 유저 한 명을 create)
    path("api/users/", UserList.as_view()),
    path("api/user/<pk>/", UserDetail.as_view()),
    path("api/user/update/<pk>/", UserUpdate.as_view()),
    path("api/user/delete/<pk>/", UserDelete.as_view()),

    # path("api/", LectureList.as_view()),
    # path("api/", LectureDetail.as_view()),
    # path("api/", LectureUpdate.as_view()),
    # path("api/", LectureDelete.as_view()),

    # path("api/", MediaEntryList.as_view()),
    # path("api/", MediaEntryDetail.as_view()),
    # path("api/",  MediaEntryUpdate.as_view()),
    # path("api/", MediaEntryDelete.as_view()),

    # path("api/", LectureManagerList.as_view()),
    # path("api/", LectureManagerDetail.as_view()),
    # path("api/", LectureManagerUpdate.as_view()),
    # path("api/", LectureManagerDelete.as_view()),
]
