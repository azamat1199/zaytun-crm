#FROM node:18-alpine as BUILD_IMAGE
#WORKDIR /app

#COPY package.json yarn.lock .yarnrc .npmrc .yarnrc.yml ./
#RUN yarn config set registry https://test-nexus3.zaytuntech.uz/repository/zaytuntech-npm/
#RUN yarn install
#COPY . .

#RUN yarn build
#RUN yarn install --production

FROM node:18-alpine
WORKDIR /app

#COPY --from=BUILD_IMAGE /app/package.json ./package.json
#COPY --from=BUILD_IMAGE /app/node_modules ./node_modules
#COPY --from=BUILD_IMAGE /app/.env ./.env
#COPY --from=BUILD_IMAGE /app/.next ./.next
#COPY --from=BUILD_IMAGE /app/public ./public

COPY package.json ./package.json
COPY node_modules ./node_modules
COPY .env ./.env
COPY .next ./.next
COPY public ./public



EXPOSE 3000
CMD ["yarn", "start"]
