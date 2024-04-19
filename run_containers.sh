# This script will run the Budget Buddy's server and client docker containers

# NOTE: you are required to hace the containers built by the 'build_containers.sh' script!

# run the server
echo "\033[1;36m Running the Server Container... \033[0m"
docker run --name bb-server -p 8000:8000 -d budget-buddy-server
echo "\033[1;32m Server Container started successfully! \033[0m"

# run the client
echo "\033[1;36m Running the Client Container... \033[0m"
docker run --name bb-client -p 3010:3010 -d budget-buddy-client
echo "\033[1;32m Client Container started successfully! \033[0m"