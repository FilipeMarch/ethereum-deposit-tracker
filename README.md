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

Enter the `tracker-stack` folder:

```
cd tracker-stack
```

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
Database name: grafana

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

![image](https://github.com/user-attachments/assets/cefa5921-2d3b-4230-ae70-0e568156096f)

- Enter `http://localhost:3001/alerting/new/alerting`
- Name: New deposit alert

_Define query and alert condition_

```sql
SELECT
  date_trunc('hour', "blockTimestamp") AS time,
  count(*) AS deposit_count
FROM deposits
GROUP BY 1
ORDER BY 1;
```

![image](https://github.com/user-attachments/assets/d4fc16e7-e773-4b24-83f5-b486b2919320)
![image](https://github.com/user-attachments/assets/44769e22-e354-4bac-8b8f-8288a6ffff02)
![image](https://github.com/user-attachments/assets/ee2cb5d5-0533-4a4a-9299-cbe61a906aac)

On the section _Configure labels and notifications_, click on `View or create contact points`

- Add contact points
- Name: Telegram. Integration: Telegram.

Obtain your BOT API Token by talking with @BotFather at Telegram:
![image](https://github.com/user-attachments/assets/a00bac7e-1f76-4272-ae38-401d435aaeaa)

- Create a Telegram group and add your bot to it.
- Send a message to your bot
  ![image](https://github.com/user-attachments/assets/24c3480e-7dfa-4287-bae7-236be315333f)
- Visit `https://api.telegram.org/bot<YOUR_BOT_API_TOKEN>/getUpdates` and check the Chat ID:
  ![image](https://github.com/user-attachments/assets/ff6d8581-6594-4f1a-afb5-2809dbfe50dc)
- Save contact point. Add it to your Alert rule, save rule.
  ![image](https://github.com/user-attachments/assets/66c28d0a-c731-4cab-bcc1-09e41cc7c9e8)
