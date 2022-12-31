FROM node:16.14.2-slim 
WORKDIR /simplytodo-api
EXPOSE 3000
COPY . .
RUN npm install
RUN npm run build
CMD ["NODE_ENV=production", "npm", "start"]