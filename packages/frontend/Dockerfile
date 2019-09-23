FROM node:lts-slim AS builder
WORKDIR /app
COPY ./app/package.json /app/yarn.lock ./
RUN yarn
COPY ./app ./
RUN yarn run build

FROM node:lts-slim
RUN yarn global add serve
WORKDIR /app
COPY --from=builder /app/build .
CMD ["serve", "-p", "80", "-s", "."]
