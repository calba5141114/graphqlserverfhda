FROM node:10
WORKDIR /app
COPY package.json /app
RUN npm install
ENV APP_PORT = process.env.PORT || 3000
COPY . /app
CMD ["npm" ,"start"]
EXPOSE 3000
