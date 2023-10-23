FROM node:20-alpine3.17 as build
WORKDIR /app/client
COPY package.json .
RUN npm install
COPY . .
RUN yarn build

FROM nginx:latest
COPY --from=build /app/client/dist /usr/share/nginx/html/ 
COPY --from=build /app/client/nginx.conf /etc/nginx/conf.d/nginx.conf
CMD ["nginx", "-g", "daemon off;"]