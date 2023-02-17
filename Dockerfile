#Fetch latest image from docker hub
FROM node:16-alpine AS development

#declaring env
ENV NODE_ENV development

#Setting up wordir
WORKDIR /poke-app

# Installing dependencies
COPY ./package.json /poke-app
COPY ./package-lock.json /poke-app
RUN npm install

# Copying all the files in our project
COPY . .

# Starting our application
CMD npm start