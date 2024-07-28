FROM node:20.14.0-alpine
WORKDIR /app/server
EXPOSE 3001
COPY package.json .
RUN npm install
COPY . .

CMD [ "yarn", "db" ]
