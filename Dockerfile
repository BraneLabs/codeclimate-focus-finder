FROM node

MAINTAINER Renan Campos

RUN useradd -u 9000 -r -s /bin/false app

RUN npm install glob

WORKDIR /code
COPY . /usr/src/app

USER app
VOLUME /code

CMD ["/usr/src/app/bin/focus-finder"]