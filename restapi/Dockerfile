FROM node:16.13.1
LABEL org.opencontainers.image.source https://github.com/Arquisoft/dede_es4b
COPY . /app
WORKDIR /app
#Install the dependencies
RUN npm install

ARG DB_URI="http://localhost"
ENV MONGO_DB_URI=$DB_URI

ARG PASS_SALT=""
ENV SECRET_SALT=$PASS_SALT

ARG PASS=""
ENV SECRET=$PASS

# Certificados SSL
ARG SECRET_PRIVATEKEY
ENV HTTPS_PRIVATEKEY=$SECRET_PRIVATEKEY

ARG SECRET_CERTIFICATE
ENV HTTPS_CERTIFICATE=$SECRET_CERTIFICATE

CMD [ "npm", "start" ]