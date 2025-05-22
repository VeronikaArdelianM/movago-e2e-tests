FROM node:18

WORKDIR /app
ARG GH_TOKEN
RUN git clone https://$GH_TOKEN@github.com/N1KITA2104/course-project .
WORKDIR /app/movago-be

RUN npm install

ENV NODE_ENV=production
EXPOSE 3000

CMD ["npm", "start"]
