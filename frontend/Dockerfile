FROM node:18-alpine as base

WORKDIR /app
COPY package*.json ./

FROM base as development
RUN npm ci
COPY . .
EXPOSE 3000
CMD ["npm", "start"]

FROM base as build
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL
RUN npm ci --only=production
COPY . .
RUN npm run build

FROM nginx:alpine as production
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

