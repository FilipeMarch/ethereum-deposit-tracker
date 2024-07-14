# ethereum-deposit-tracker
A robust and efficient Ethereum Deposit Tracker to monitor and record ETH deposits on the Beacon Deposit Contract

## Clone the repository

```
git clone https://github.com/FilipeMarch/ethereum-deposit-tracker
cd ethereum-deposit-tracker
```

## Create a Docker network

```
docker network create grafana-net
```

## Run the monitoring stack (for system metrics and alerts with Grafana)

Enter the `monitoring-stack` folder:
```
cd monitoring-stack
```
Start Grafana + Prometheus + cadvisor
```
docker compose up -d
```

## Run the tracker app

Start PostgreSQL + Tracker app
```
ALCHEMY_API_KEY=<YOUR_ALCHEMY_API_KEY> docker compose up -d
```

## Create dashboard for seeing deposit table

Enter `localhost:3001/login`
```
Email: admin
Password: admin
```

- Click to create a new dashboard
- Add PostgreSQL as a data source
```
*Connection*
Host URL: postgres:5432
Database name: eth-deposits

*Authentication*
Username: grafana        
Password: grafana
```
- Add visualization, select PostgreSQL as data source
- Select table `deposits` and column `*`, run query, switch to table.
![image](https://github.com/user-attachments/assets/92034b25-f3de-418b-8c42-a0f38164c70d)

## Importing the cadvisor dashboard

- Click to import dashboard
- Load the ID `19792`
- On Prometheus dropdown, click to configure a new data source, select Prometheus
- While creating the Prometheus data source, use `http://prometheus:9090` as Prometheus server URL.
- Finally, import the cadvisor dashboard.

https://github.com/user-attachments/assets/753ed557-7232-4ad4-a842-5d4364c8ae5c

## Creating Telegram alert

Enter `http://localhost:3001/alerting/new/alerting`



