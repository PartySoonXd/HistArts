FROM node:20-alpine3.17
WORKDIR /app/server
EXPOSE 3001
COPY package.json .
RUN npm install
COPY . .
CMD ["yarn", "server"]