ARG CACHE_IMAGE

# Load image with node module caches
FROM $CACHE_IMAGE AS Dependecy

WORKDIR /tribe/app

ENV PATH /tribe/node_modules/.bin:$PATH
ENV PORT 5000

# Copy build files
COPY ./packages/web/build ./packages/web/build

# Install packages
RUN yarn install --immutable

CMD [ "yarn", "web", "start:prod" ]
EXPOSE $PORT
