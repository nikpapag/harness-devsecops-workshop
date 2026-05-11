FROM node:20.10.0-alpine

WORKDIR /usr/src/site.com/frontend
ADD ./dist /usr/src/site.com/frontend/dist
ADD ./entrypoint.sh /entrypoint.sh
RUN apk add gettext


ENTRYPOINT ["/bin/sh","/entrypoint.sh"]
CMD ["/bin/sh",  "-c",  "envsubst < /usr/src/site.com/frontend/dist/harness-webapp/browser/assets/env.template.js > /usr/src/site.com/frontend/dist/harness-webapp/browser/assets/config.js && node /usr/src/site.com/frontend/dist/harness-webapp/server/server.mjs"]
