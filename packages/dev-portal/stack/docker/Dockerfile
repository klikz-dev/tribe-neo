ARG CACHE_IMAGE

# Load image with node module caches
FROM $CACHE_IMAGE AS Dependecy

WORKDIR /tribe/app

ENV PATH /tribe/node_modules/.bin:$PATH
ENV PORT 80

# Copy build files
COPY ./packages/dev-portal/build ./packages/dev-portal/build


# Install packages
RUN yarn install --immutable

CMD [ "yarn", "dev-portal", "serve:prod" ]
EXPOSE $PORT
