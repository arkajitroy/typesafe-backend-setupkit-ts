FROM node:20-alpine AS base

# Setting up working directory for docker
WORKDIR /usr/src/backend-app

# COPYING PACKAGE FILES
COPY package*.json ./

# Installing Dependencies
RUN npm ci

# Copying Files
COPY . .

# Exposing PORT
EXPOSE 3000

# Start Application
CMD [ "npm", "run", "dev" ]