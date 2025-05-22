FROM node:18

WORKDIR /app

ARG GH_TOKEN
RUN git clone https://$GH_TOKEN@github.com/N1KITA2104/course-project .

WORKDIR /app/movago-fe

RUN npm install -g @angular/cli && npm install

EXPOSE 4200

# ✅ Force Angular to listen on all interfaces (not just localhost)
# CMD ["npx", "ng", "serve", "--host", "0.0.0.0", "--port", "4200"]
CMD ["npx", "ng", "serve", "--host", "0.0.0.0", "--port", "4200", "--disable-host-check"]
