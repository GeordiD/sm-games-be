FROM node:lts-alpine
ENV NODE_ENV=production
ENV APP_ID=gen-node-server
ENV LOG_LEVEL=debug
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production=false
COPY . .
RUN npm run compile
RUN npm prune --production
EXPOSE 3000
RUN chown -R node /usr/src/app
USER node
CMD ["npm", "start"]
