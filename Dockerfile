FROM node:24-alpine3.24

# Set working directory
RUN mkdir -p /var/www/connect
WORKDIR /var/www/connect

# Copy project
COPY . ./var/www/connect
COPY package.json tsconfig.json tsconfig.build.json /var/www/connect/
RUN pnpm install --prod
RUN pnpm build


# Allow execute permission
RUN adduser --disabled-password connect_user
RUN chown -R connect_user:connect_user /var/www/connect
USER connect_user

# Clear cache
RUN pnpm cache clean --force

EXPOSE 3000

CMD [ "pnpm","start:prod" ]