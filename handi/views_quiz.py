from rest_framework.generics import *
from rest_framework.response import Response
from rest_framework import status
from .models import Lecture, QuizResult
from random import shuffle
from collections import deque
from .serializers import QuizResultSerializer


class Quiz(RetrieveAPIView):
    def get(self, request, *args, **kwargs):
        lecture = Lecture.objects.get(id=kwargs["lecture_id"])
        mediaenties = list(lecture.media_entries.all())
        shuffle(mediaenties)
        n = len(mediaenties)

        mediaenties_for_type_A_quiz = deque(mediaenties[: n // 2])
        mediaenties_for_type_B_quiz = deque(mediaenties[n // 2 :])
        mediaenties = deque(mediaenties)
        type_A_quizzes, type_B_quizzes = [], []

        for mediaentry in mediaenties_for_type_A_quiz:
            answer_name = mediaentry.name
            answer_video_url = mediaentry.video_url

            wrong_answer_video_urls = []
            while len(wrong_answer_video_urls) != 4:
                wrong_answer = mediaenties.popleft()
                if wrong_answer.video_url != answer_video_url:
                    wrong_answer_video_urls.append(wrong_answer.video_url)
                mediaenties.append(wrong_answer)

            type_A_quizzes.append(
                {
                    "name": answer_name,
                    "image_urls": [answer_video_url] + wrong_answer_video_urls,
                    # 프론트측에서 urls shuffle 해줘야함. 백엔드에서 정답은 무조건 0번 인덱스
                }
            )

        for mediaentry in mediaenties_for_type_B_quiz:
            answer_name = mediaentry.name
            answer_video_url = mediaentry.video_url

            wrong_answer_names = []
            while len(wrong_answer_names) != 3:
                wrong_answer = mediaenties.popleft()
                if wrong_answer.name != answer_name:
                    wrong_answer_names.append(wrong_answer.name)
                mediaenties.append(wrong_answer)

            type_B_quizzes.append(
                {
                    "video_url": answer_video_url,
                    "answer_name": answer_name,
                    "names": [answer_name] + wrong_answer_names,
                    # 프론트측에서 names shuffle 해줘야함. 백엔드에서 정답은 무조건 0번 인덱스
                }
            )

        return Response(
            {
                "length": n,
                "sub_category": lecture.sub_category,
                "type_A_quizzes": type_A_quizzes,
                "type_B_quizzes": type_B_quizzes,
            },
            status=status.HTTP_200_OK,
        )


class QuizResults(ListCreateAPIView):
    def get(self, request, *args, **kwargs):
        quizresult = QuizResult.objects.filter(
            user=request.user.id, lecture=kwargs["lecture_id"]
        )
        serializer = QuizResultSerializer(quizresult, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        serializer = QuizResultSerializer(
            data={
                "user": request.user.id,
                "lecture": kwargs["lecture_id"],
                "RightPer": request.data["RightPer"],
                "wrong_choices": request.data["wrong_choices"],
            }
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class QuizResultDelete(DestroyAPIView):
    def delete(self, request, *args, **kwargs):
        quizresult = QuizResult.objects.filter(
            user=request.user.id, lecture=kwargs["lecture_id"]
        )
        quizresult.delete()
        return Response({"success": True}, status=status.HTTP_204_NO_CONTENT)
