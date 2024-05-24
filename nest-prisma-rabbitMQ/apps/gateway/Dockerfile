FROM node:20.10.0 AS development
WORKDIR /usr/src/nest-prisma-rabbitMQ
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:20.10.0 AS production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /usr/src/nest-prisma-rabbitMQ
COPY package*.json ./
RUN npm install --only=production
COPY . .
COPY --from=development /usr/src/nest-prisma-rabbitMQ/dist ./dist
CMD [ "node","dist/apps/gateway/main" ]
