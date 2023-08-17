from django.shortcuts import render
from .models import User
from django.shortcuts import get_object_or_404


def main(request):
    if request.user.is_authenticated:
        if not request.user.name:
            users = request.user
            users.name = request.user.username
            users.save()
        return render(request, "index.html")
    return render(request, "index.html")


def contact(request):
    return render(request, "contact.html")


def test(request):
    return render(request, "test.html")


def login(request):
    return render(request, "login.html")


def signup(request):
    return render(request, "signup.html")


def translate(request):
    return render(request, "translation.html")


def lecture(request):
    return render(request, "studyHome2.html")


def inLecture(request, lecture_id):
    return render(request, "lectureCategory.html", {"lecture_id": lecture_id})


def studyWord(request, lecture_id):
    return render(request, "studyWord.html", {"lecture_id": lecture_id})


def studySentence(request, lecture_id):
    return render(request, "studySituation.html", {"lecture_id": lecture_id})


def quizSign(request, lecture_id):
    return render(request, "TestSign.html", {"lecture_id": lecture_id})


def quizWord(request, lecture_id):
    return render(request, "TestWord.html", {"lecture_id": lecture_id})


def quizSentence(request, lecture_id):
    return render(request, "TestSituation.html", {"lecture_id": lecture_id})


def wordResult(request, lecture_id):
    return render(request, "WordResult.html", {"lecture_id": lecture_id})


def sentenceResult(request, lecture_id):
    return render(request, "SituationResult.html", {"lecture_id": lecture_id})


# 추후 메인 게임 페이지로 변경
def game(request):
    return render(request, "gameInformation.html")


def inGame(request):
    print(request.user.id)
    user = get_object_or_404(User, pk=request.user.id)
    print(user.game_score)
    return render(request, "game.html", {"user": user})
