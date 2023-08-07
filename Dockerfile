FROM python:3.8
WORKDIR /app/likelion
COPY . /app/likelion/
RUN apt-get update && apt-get -y install libgl1-mesa-glx
RUN pip3 install -r requirements.txt
CMD [ "python", "manage.py", "runserver", "0.0.0.0:11111"]