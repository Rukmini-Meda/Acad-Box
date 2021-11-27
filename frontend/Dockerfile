# Stage 1
FROM node:lts-alpine as build

ARG REACT_APP_SERVICES_HOST=/services/m

WORKDIR /frontend
COPY package*.json .
RUN npm install
COPY . .

RUN npm run build

# Stage 2
FROM nginx

COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /frontend/build /usr/share/nginx/html
EXPOSE $REACT_DOCKER_PORT