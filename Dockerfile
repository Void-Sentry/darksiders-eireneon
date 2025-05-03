FROM node:22.15.0-alpine AS builder

WORKDIR /app

COPY . .

RUN npm i pnpm -g && \
    pnpm i && \
    pnpm run build

FROM nginx:alpine

COPY --from=builder /app/out /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
