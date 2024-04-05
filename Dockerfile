FROM node:lts-alpine as builder

RUN mkdir -p /app
WORKDIR /app
COPY . .

RUN npm install
RUN npm run build

EXPOSE 3030

CMD ["npm", "start"]