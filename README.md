# ethereum-deposit-tracker
A robust and efficient Ethereum Deposit Tracker to monitor and record ETH deposits on the Beacon Deposit Contract

## Clone the repository

```
git clone https://github.com/FilipeMarch/ethereum-deposit-tracker
cd ethereum-deposit-tracker
```

## Update the environment variables

Create a `.env` file inside `tracker-stack` folder

```
cd tracker-stack
cp example.env .env
```
Add the required ALCHEMY_API_KEY
```
ALCHEMY_API_KEY=<YOUR_ALCHEMY_API_KEY>
```

## Run the tracker app

Start PostgreSQL + Tracker app
```
ALCHEMY_API_KEY=<YOUR_ALCHEMY_API_KEY> docker compose up
```

## Run the monitoring stack (for system metrics and alerts with Grafana)

Enter the `monitoring-stack` folder:
```
cd monitoring-stack
```
Start Grafana + Prometheus + cadvisor
```
docker compose up
```
