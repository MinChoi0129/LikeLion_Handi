FROM python:3.8
WORKDIR /app/handi
COPY . /app/handi/
RUN pip3 install -r requirements.txt
CMD [ "python", "manage.py", "runserver", "0.0.0.0:11111"]