FROM node:20-alpine3.17 as build
WORKDIR /app/admin
COPY package.json .
RUN npm install
COPY . .
RUN yarn build
# CMD ["yarn", "build"]

FROM nginx:latest
COPY --from=build /app/admin/build /usr/share/nginx/html/ 
COPY --from=build /app/admin/nginx.conf /etc/nginx/conf.d/nginx.conf
CMD ["nginx", "-g", "daemon off;"]