# Use Node.js 20.17.0 as a parent image
FROM node:20.17.0

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all project files (including src folder) to the working directory
COPY . .

# Expose the port on which the app will run (for example, 3000)
EXPOSE 4000

# Define the command to run your application
CMD ["node", "index.js"]