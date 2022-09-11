FROM node:16 as builder
WORKDIR /usr/src/app

COPY . .
RUN yarn
RUN yarn build

FROM nginx:latest
COPY --from=builder /usr/src/app/build/ /usr/share/nginx/html
COPY ./nginx-default.conf /etc/nginx/conf.d/default.conf
