from django.shortcuts import render


def main(request):
    return render(request, "index.html")


def login(request):
    return render(request, "login.html")


def signup(request):
    return render(request, "signup.html")


def translate(request):
    return render(request, "translation.html")


def lecture(request):
    return render(request, "studyHome.html")


def inLecture(request, lecture_id):
    return render(request, "lectureCategory.html", {"lecture_id": lecture_id})


def studyWord(request, lecture_id):
    return render(request, "studyWord.html", {"lecture_id": lecture_id})


def studySentence(request, lecture_id):
    return render(request, "studySituation.html", {"lecture_id": lecture_id})


# 추후 메인 게임 페이지로 변경
def game(request):
    return render(request, "game.html")
