FROM node:alpine AS development
WORKDIR /usr/src/nest-prisma-rabbitMQ
COPY package*.json ./
COPY prisma ./prisma/
RUN npm install
COPY . ./
RUN npm run build auth

FROM node:alpine AS production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /usr/src/nest-prisma-rabbitMQ
COPY package*.json ./
COPY prisma ./prisma/
RUN npm install --only=production
COPY . ./
COPY --from=development /usr/src/nest-prisma-rabbitMQ/dist ./dist
CMD [ "node","dist/apps/auth/main" ]
