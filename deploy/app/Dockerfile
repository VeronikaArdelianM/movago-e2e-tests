FROM node:18

# Install Angular CLI and concurrently globally
RUN npm install -g concurrently

# Set working directory
WORKDIR /app

# Clone your monorepo
ARG GH_TOKEN
RUN git clone https://$GH_TOKEN@github.com/N1KITA2104/course-project .
# Install backend dependencies
WORKDIR /app/movago-be
RUN npm install

# Install frontend dependencies
WORKDIR /app/movago-fe
RUN npm install -g @angular/cli && npm install
RUN npm run build --prefix /app/movago-fe

# Back to root
WORKDIR /app

# Expose both frontend (4200) and backend (3000)
ENV NODE_ENV=production
EXPOSE 4200
EXPOSE 3000

# Start backend and frontend in parallel
CMD concurrently \
  "cd /app/movago-be && npm start" \
  "cd /app/movago-fe && ng serve --host 0.0.0.0 --port 4200 --disable-host-check"
  # "cd /app/movago-fe && npm start --disable-host-check"