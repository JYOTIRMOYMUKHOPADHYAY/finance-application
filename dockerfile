FROM node:20-alpine3.20

#Create a app directory
WORKDIR /app

#Install app dependencies
COPY package.json ./
COPY .env ./
RUN npm install

COPY . .

EXPOSE 3000

#Build the app
RUN npm run build

#Start the app
CMD ["npm", "start"]