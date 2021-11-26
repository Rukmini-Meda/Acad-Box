FROM node:lts-alpine
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --silent
RUN npm install -g nodemon
COPY . .
EXPOSE 5000
CMD ["npm","start"]