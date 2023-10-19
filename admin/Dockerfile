FROM node:20-alpine3.17
WORKDIR /app/admin
EXPOSE 8800
COPY package.json .
RUN npm install
COPY . .
CMD ["yarn", "dev"]