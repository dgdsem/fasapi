FROM tiangolo/uvicorn-gunicorn-fastapi:python3.7
RUN pip install requests
RUN pip install python-multipart
RUN pip install aiofiles
RUN pip install jinja2
COPY ./app /app