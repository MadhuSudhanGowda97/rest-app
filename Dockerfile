FROM node:lts-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
RUN npm install -g typescript@4.9.5
COPY . .
EXPOSE 2023
CMD ["node", "src/dataset.js"]
