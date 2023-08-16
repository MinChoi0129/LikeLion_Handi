FROM python:3.8
WORKDIR /app/likelion
COPY . /app/likelion/
RUN apt-get update && \
    apt-get install libgl1-mesa-glx -y &&\
    apt-get install libglib2.0-0 -y &&\
    apt-get install ffmpeg x264 libx264-dev -y&&\
    apt-get install watch -y
RUN pip3 install -r requirements.txt
CMD [ "python", "manage.py", "runserver", "0.0.0.0:11111"]