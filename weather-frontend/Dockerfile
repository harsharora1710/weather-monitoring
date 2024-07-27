FROM node:18 AS build

# Set the working directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY ./ .

# Build the application
RUN npm run build

# Use a smaller Node.js image to serve the files
FROM node:18-alpine

# Install the `serve` package globally
RUN npm install -g serve

# Set the working directory
WORKDIR /usr/src/app

# Copy build files from the previous stage
COPY --from=build /usr/src/app/build ./build

# Expose the port the app runs on
EXPOSE 3000

# Start the `serve` server
CMD ["serve", "-s", "build", "-l", "3000"]