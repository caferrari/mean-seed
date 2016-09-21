FROM node:argon-slim

RUN mkdir /src

RUN npm install -g gulp

WORKDIR /src

EXPOSE 3000
EXPOSE 35729

CMD gulp
