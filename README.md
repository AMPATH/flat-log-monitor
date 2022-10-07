# ETL Flat Log Monitor

Service for monitoring ETL Table updates.
Checks hourly if a certain period has passed since the last sync. If the period is more then specified it
send a slack notification to a specified in the configuration file.
Also checks the last time lab results were created on obs table. If it has been longer than
the specified grace period it send a message to the slack channel specified in the configuration file.

# Slack Channel
This service will post updates to a slack channel so its important to create a slack channel and get
the channel webhook which you will set in the config.json file


## Project set up
1. Fork the project
2. Clone the project
3. Create a config folder in the root directory with config.json file with the following configuration

```json

{
  "slackApi": {
    "webhook": {
       "url": ""
    }
  },
  "mysql": {
    "connectionLimit": 5,
    "host": "",
    "port": "",
    "user": "",
    "password": "",
    "database": "",
    "multipleStatements": true
  }
}

```

## Requirements
1. Node Version 12+
2. Docker

## Getting started
```npm install```
```npm start```


## Building and deployment
```docker build -f Dockerfile -t ampathke/flat-log-monitor/flat-log-monitor:tagname:<version> .```

```docker run -d -it --name flat-log-monitor --restart unless-stopped  --mount type=bind,source="<source>",target="/usr/src/app/config"  ampathke/flat-log-monitor:latest```


