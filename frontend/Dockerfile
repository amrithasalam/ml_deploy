FROM node:18-alpine AS build

WORKDIR /frontend

COPY package*.json ./

RUN npm install 

COPY . .

EXPOSE 3000 

CMD ["npm", "run", "dev"]


