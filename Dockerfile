FROM node:22.14.0
WORKDIR /app
RUN npm install -g node-gyp
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
CMD ["npm", "start"]
