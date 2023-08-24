from django.contrib import admin
from django.urls import path, include
from handi import views_page
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path("", views_page.main, name="main"),
    path("", include("handi.urls")),
    path("login/", views_page.login, name="login"),
    path("signup/", views_page.signup, name="signup"),
    path("translate/", views_page.translate, name="translate"),
    path("lecture/", views_page.lecture, name="lecture"),
    path("lecture/<int:lecture_id>/", views_page.inLecture, name="inLecture"),
    path("game/", views_page.game, name="game"),
    path("game/start/", views_page.inGame, name="inGame"),
    path("admin/", admin.site.urls),
    path("accounts/", include("allauth.urls")),
    path("contact/", views_page.contact, name="contact"),
    path("lecture/<int:lecture_id>/quiz/word/", views_page.quizWord, name="quizWord"),
    path(
        "lecture/<int:lecture_id>/study/word/", views_page.studyWord, name="studyWord"
    ),
    path(
        "lecture/<int:lecture_id>/study/sentence/",
        views_page.studySentence,
        name="studySentence",
    ),
    path(
        "lecture/<int:lecture_id>/quiz/sentence/",
        views_page.quizSentence,
        name="quizSentence",
    ),
    path(
        "lecture/<int:lecture_id>/result/word/",
        views_page.wordResult,
        name="wordResult",
    ),
    path(
        "lecture/<int:lecture_id>/result/sentence/",
        views_page.sentenceResult,
        name="sentenceResult",
    ),
    path(
    "mypage/<str:user>/",
    views_page.myPage,
    name="myPage",
    ),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
