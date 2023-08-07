import os
import random
from jamo import h2j, j2hcj
from rest_framework.generics import *
from django.http import JsonResponse

all_jamo_list = [
    "ㄱ",
    "ㄴ",
    "ㄷ",
    "ㄹ",
    "ㅁ",
    "ㅂ",
    "ㅅ",
    "ㅇ",
    "ㅈ",
    "ㅊ",
    "ㅋ",
    "ㅌ",
    "ㅍ",
    "ㅎ",
    "ㅏ",
    "ㅑ",
    "ㅓ",
    "ㅕ",
    "ㅗ",
    "ㅛ",
    "ㅜ",
    "ㅠ",
    "ㅡ",
    "ㅣ",
    "ㄲ",
    "ㄸ",
    "ㅃ",
    "ㅆ",
    "ㅉ",
    "ㄳ",
    "ㄵ",
    "ㄶ",
    "ㄺ",
    "ㄻ",
    "ㄼ",
    "ㄽ",
    "ㄾ",
    "ㄿ",
    "ㅀ",
    "ㅄ",
    "ㅐ",
    "ㅒ",
    "ㅔ",
    "ㅖ",
    "ㅘ",
    "ㅙ",
    "ㅚ",
    "ㅝ",
    "ㅞ",
    "ㅟ",
    "ㅢ",
]


def getSeparatedJaMoList(raw_string: str):
    return [jamo for jamo in list(j2hcj(h2j(raw_string))) if jamo in all_jamo_list]


def getPathsFromFileNames(jamos: list):
    BASE_PATH = os.path.dirname(os.path.abspath(__file__))
    BASE_PATH = BASE_PATH[: BASE_PATH.find("handi") - 1]
    return [
        os.path.join(
            BASE_PATH,
            "static",
            "image",
            "study",
            "consonants_vowels",
            str(all_jamo_list.index(jamo)),
        )
        + ".png"
        for jamo in jamos
    ]


def convertImagesIntoVideo(paths, pathOut, fps=2):
    import cv2

    frame_array = []
    for _, path in enumerate(paths):
        img = cv2.imread(path)
        height, width, _ = img.shape
        size = (width, height)
        frame_array.append(img)
    out = cv2.VideoWriter(pathOut, cv2.VideoWriter_fourcc(*"mp4v"), fps, size)
    for i in range(len(frame_array)):
        out.write(frame_array[i])
    cv2.destroyAllWindows()
    out.release()


class Translator(RetrieveAPIView):
    def get(self, request, *args, **kwargs):
        BASE_PATH = os.path.dirname(os.path.abspath(__file__))
        BASE_PATH = BASE_PATH[: BASE_PATH.find("handi") - 1]
        print(BASE_PATH)
        pure_jamo_list = getSeparatedJaMoList(request.query_params["sentence"])
        image_file_paths = getPathsFromFileNames(pure_jamo_list)

        random_file_name = str(random.randint(1000000, 9999999))
        video_path_out = (
            os.path.join(BASE_PATH, "media", "translate", random_file_name) + ".mp4"
        )

        convertImagesIntoVideo(image_file_paths, video_path_out)

        return JsonResponse({"video_url": video_path_out})
