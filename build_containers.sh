# This script will build the production-ready containers for Budget Buddy's server and client

# NOTE: You are required to have docker engine installed on your machine

# Pull the server base image
echo "\033[1;36m Pulling the Server Base Image... \033[0m"
docker pull python:3.12-slim-bookworm --platform=linux/amd64

# Build the server image from the dockerfile
echo "\n\033[1;36m Building the Server Image from the Dockerfile... \033[0m"
cd ./server
sudo docker build -t budget-buddy-server --platform=linux/amd64 .

# Pull the client base image
echo "\n\033[1;36m Pulling the Client Base Image... \033[0m"
docker pull node:alpine --platform=linux/amd64

# Build the client image from the dockerfile
echo "\n\033[1;36m Building the Client Image from the Dockerfile... \033[0m"
cd ../client
sudo docker build -t budget-buddy-client --platform=linux/amd64 .

echo "\n\033[1;32m Server and Client Images Built successfully! \033[0m"