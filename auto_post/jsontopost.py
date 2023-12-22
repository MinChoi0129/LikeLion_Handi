from requests_toolbelt import MultipartEncoder
from multiprocessing import Pool, cpu_count
import requests, json, os


def post(url, field_data):
    m = MultipartEncoder(fields=field_data)
    headers = {"Content-Type": m.content_type}
    res = requests.post(url, headers=headers, data=m)
    return res.status_code, res.json()


def postMediaEntries(json_data, f):
    name = f[5:-5]
    request_json = {
        "name": name,
        "entry_type": "word",
        "video_url": "https://rpnrhjwrzmbe18734976.cdn.ntruss.com/"
        + json_data["videoName"],
        "image_url": "static/image/study/words/" + name + ".jpg",
        "data": json.dumps({"data": json_data["data"]}),
    }
    print(post("http://101.101.209.37/api/mediaentries/", request_json))


def process(folder):
    infolder = path + folder + "/"
    file_list = sorted(os.listdir(infolder))
    for f in file_list:
        infile = infolder + f
        try:
            with open(infile, "r", encoding="UTF-8") as g:
                json_data = json.load(g)
                postMediaEntries(json_data, f)
        except:
            pass


path = "C:/Users/MINJAE/Desktop/auto/auto/lecture_words/"
folder_list = sorted(os.listdir(path))

for folder in folder_list:
    process(folder)

# if __name__ == "__main__":
#     cpu_num_80_percent = int(cpu_count() * 0.9)
#     with Pool(processes=cpu_num_80_percent) as pool:
#         pool.map(process, folder_list)
