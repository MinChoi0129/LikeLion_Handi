from django.urls import path
from .views_translate import Translator
from .views_lecture import *
from .views_lecture_manager import *
from .views_user import *
from .views_mediaentry import *

urlpatterns = [
    path("api/translate/", Translator.as_view()),

    path("api/users/", UserList.as_view()),
    path("api/user/<pk>/", UserDetail.as_view()),
    path("api/user/update/<pk>/", UserUpdate.as_view()),
    path("api/user/delete/<pk>/", UserDelete.as_view()),
    path("api/users/rank/<pk>/", UserRank.as_view()),

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
