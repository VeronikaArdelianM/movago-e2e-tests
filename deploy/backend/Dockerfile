FROM node:18

WORKDIR /app
ARG GITHUB_TOKEN
RUN git clone https://$GITHUB_TOKEN@github.com/N1KITA2104/course-project .
WORKDIR /app/movago-be

RUN npm install

ENV NODE_ENV=production
EXPOSE 3000

CMD ["npm", "start"]
