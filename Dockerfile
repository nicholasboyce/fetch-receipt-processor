FROM node:22
COPY . .
RUN npm install -g node-gyp
RUN npm install
RUN npm run build
CMD ["npm", "start"]
