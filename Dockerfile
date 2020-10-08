FROM node:lts-alpine
RUN mkdir /app
WORKDIR /app
COPY package* ./
RUN npm i
COPY . .
ARG SOCKET
ENV SOCKET ${SOCKET}
ARG WEBHOOK
ENV WEBHOOK ${WEBHOOK}
CMD node index.js -s ${SOCKET} -w ${WEBHOOK}
