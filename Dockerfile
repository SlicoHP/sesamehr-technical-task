FROM node:20-alpine

WORKDIR /app

COPY package.json yarn.lock ./

# Install yarn packages
RUN yarn install

COPY . .

EXPOSE 5173

# Use yarn to run the dev server
CMD ["yarn", "dev", "--host", "0.0.0.0"] 