FROM node:13.8.0

WORKDIR /app/

EXPOSE 3000:3000
COPY package*.json /app/
COPY docusaurus.config.js /app/
COPY sidebars.js /app/
COPY ./docs /app/docs
COPY ./src /app/src
COPY ./static /app/static
RUN npm install

CMD ["npm", "run", "start"]
