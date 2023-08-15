from rest_framework.generics import *
from rest_framework.response import Response
from rest_framework import status
from .models import Lecture
from random import shuffle
from collections import deque


class Quiz(RetrieveAPIView):
    def get(self, request, *args, **kwargs):
        mediaenties = list(
            Lecture.objects.get(id=kwargs["lecture_id"]).media_entries.all()
        )
        shuffle(mediaenties)
        n = len(mediaenties)

        mediaenties_for_type_A_quiz = deque(mediaenties[: n // 2])
        mediaenties_for_type_B_quiz = deque(mediaenties[n // 2 :])

        type_A_quizzes, type_B_quizzes = [], []

        for mediaentry in mediaenties_for_type_A_quiz:
            answer_name = mediaentry.name
            answer_image_url = mediaentry.image_url

            wrong_answer_video_urls = []
            for _ in range(5):
                wrong_answer = mediaenties_for_type_B_quiz.popleft()
                wrong_answer_image_urls.append(wrong_answer.image_url)
                mediaenties_for_type_B_quiz.append(wrong_answer)

            type_A_quizzes.append(
                {
                    "name": answer_name,
                    "image_urls": [answer_image_url] + wrong_answer_image_urls,
                    # 프론트측에서 urls shuffle 해줘야함. 백엔드에서 정답은 무조건 0번 인덱스
                }
            )

        for mediaentry in mediaenties_for_type_B_quiz:
            answer_name = mediaentry.name
            answer_video_url = mediaentry.video_url

            wrong_answer_names = []
            for _ in range(3):
                wrong_answer = mediaenties_for_type_A_quiz.popleft()
                wrong_answer_names.append(wrong_answer.name)
                mediaenties_for_type_A_quiz.append(wrong_answer)

            type_B_quizzes.append(
                {
                    "video_url": answer_video_url,
                    "names": [answer_name] + wrong_answer_names,
                    # 프론트측에서 names shuffle 해줘야함. 백엔드에서 정답은 무조건 0번 인덱스
                }
            )

        return Response(
            {
                "jamo_quiz_list": type_A_quizzes,
                "word_quiz_list": type_B_quizzes,
            },
            status=status.HTTP_200_OK,
        )
