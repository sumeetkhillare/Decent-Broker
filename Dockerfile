FROM node:14
WORKDIR /app
COPY package.json /app
# RUN npm install -g npm@7.1.1
RUN npm install
COPY ./ /app
CMD ["npm","run","dev"]
EXPOSE 3000