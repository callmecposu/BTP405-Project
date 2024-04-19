# Documentation

## Running Locally

You won't be able to run the project locally unless you have valid `.env` files, so all the further steps assume you do.

1. Install dependencies on the client and the server

```
cd server
pip3 install -r requirements.txt
cd ../client
npm i
```

2. Run the Server

```
cd ../server
python3 main.py
```

3. Run the Client

```
cd ../client
npm run dev
```

4. Open `http://localhost:3000/` in your browser and enjoy!

## Running Unit Tests

1. Install the unit tests dependencies

```
pip3 install requests
```

2. Run the Server
   
```
cd server
python3 main.py
```

3. Run the Test Suites

```
cd tests
python3 tester.py
```

## Running with Docker Containers

> **NOTE:** the scripts mentioned below will specifically build images for `linux/amd64` platform, which may not be compatible with your system running Docker engine.
>
> If you intend to run the containers locally, remove the `--platform=linux/amd64` options from all the comands in the `build_containers.sh` script.
>
> If you want to deploy these containers, you may need pull the base images and build BudgetBuddy's images for a specific platform. You can do so by specifying the desired platform in the `--platform` options insisde the `build_containers.sh` script.

1. Run the `build_containers.sh` in the project root

2. Run the `run_containers.sh` in the project root

3. Open `http://localhost:3010` in your browser and enjoy!
