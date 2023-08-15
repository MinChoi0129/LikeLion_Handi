import os, numpy as np
import random
from jamo import h2j, j2hcj
from rest_framework.generics import *
from django.http import JsonResponse, FileResponse

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


def convertImagesIntoVideo(paths, pathOut, fps=1):
    import cv2

    frame_array = []
    new_size = (940, 940)
    for _, path in enumerate(paths):
        img = cv2.imread(path)
        height, width, _ = img.shape

        ash = new_size[1] / height
        asw = new_size[0] / width
        if asw < ash:
            sizeas = (int(width * asw), int(height * asw))
        else:
            sizeas = (int(width * ash), int(height * ash))

        img = cv2.resize(img, dsize=sizeas)
        base_pic = np.zeros((new_size[1], new_size[0], 3), np.uint8)
        base_pic[
            int(new_size[1] / 2 - sizeas[1] / 2) : int(new_size[1] / 2 + sizeas[1] / 2),
            int(new_size[0] / 2 - sizeas[0] / 2) : int(new_size[0] / 2 + sizeas[0] / 2),
            :,
        ] = img

        frame_array.append(base_pic)
    out = cv2.VideoWriter(pathOut, cv2.VideoWriter_fourcc(*"mp4v"), fps, new_size)
    for i in range(len(frame_array)):
        out.write(frame_array[i])
    cv2.destroyAllWindows()
    out.release()


class Translator(RetrieveAPIView):
    def post(self, request, *args, **kwargs):
        BASE_PATH = os.path.dirname(os.path.abspath(__file__))
        BASE_PATH = BASE_PATH[: BASE_PATH.find("handi") - 1]

        if request.data["mode"] == "download":
            video_url = request.data["video_url"]
            video_abs_url = os.path.join(BASE_PATH, video_url)
            return FileResponse(
                open(video_abs_url, "rb"),
                content_type="video/mp4",
                as_attachment=True,
            )
        elif request.data["mode"] == "watch":
            pure_jamo_list = getSeparatedJaMoList(request.data["sentence"])
            image_file_paths = getPathsFromFileNames(pure_jamo_list)

            random_file_name = str(random.randint(1000000, 9999999))

            video_rel_url = (
                os.path.join("media", "translate", random_file_name) + ".mp4"
            )
            video_abs_url = (
                os.path.join(BASE_PATH, "media", "translate", random_file_name) + ".mp4"
            )

            convertImagesIntoVideo(image_file_paths, video_abs_url)
            return JsonResponse({"video_url": video_rel_url})
        else:
            return JsonResponse({{"success": False}})
