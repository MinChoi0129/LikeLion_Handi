from django.http import FileResponse
from rest_framework.generics import *
from jamo import h2j, j2hcj
import os
import random


def convertImagesIntoMP4(paths, pathOut, fps=2):
    import cv2
    frame_array = []
    for idx, path in enumerate(paths):
        img = cv2.imread(path)
        height, width, layers = img.shape
        size = (width, height)
        frame_array.append(img)
    out = cv2.VideoWriter(pathOut, cv2.VideoWriter_fourcc(*'DIVX'), fps, size)
    for i in range(len(frame_array)):
        out.write(frame_array[i])
    out.release()


class Translator(RetrieveAPIView):
    def get(self, request, *args, **kwargs):
        BASE_PATH = os.path.dirname(os.path.abspath(__file__))
        BASE_PATH = BASE_PATH[: BASE_PATH.find("handi") - 1]

        raw_string = request.data["sentence"]
        jamo_list = list(j2hcj(h2j(raw_string)))

        all_jamo_list = ['ㄱ', 'ㄴ', 'ㄷ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅅ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ',
                         'ㅏ', 'ㅑ', 'ㅓ', 'ㅕ', 'ㅗ', 'ㅛ', 'ㅜ', 'ㅠ', 'ㅡ', 'ㅣ',
                         'ㄲ', 'ㄸ', 'ㅃ', 'ㅆ', 'ㅉ',
                         'ㄳ', 'ㄵ', 'ㄶ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅄ',
                         'ㅐ', 'ㅒ', 'ㅔ', 'ㅖ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅢ']
        pure_jamo_list = [jamo for jamo in jamo_list if jamo in all_jamo_list]
        print(pure_jamo_list)

        paths = [
            BASE_PATH
            + "\\static\\image\\study\\consonants_vowels\\"
            + str(all_jamo_list.index(jamo))
            + '.png'
            for jamo in pure_jamo_list
        ]

        random_file_name = str(random.randint(1000, 9999))

        path_out = \
            BASE_PATH + "\\media\\translate\\" \
            + random_file_name + '.mp4'

        convertImagesIntoMP4(paths, path_out)

        return FileResponse(
            open(path_out, "rb"),
            content_type="video/mp4",
            # as_attachment=(True if request.data["mode"] == "download" else False),
            as_attachment=False
        )
