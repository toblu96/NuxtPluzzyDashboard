<h1 align="center">Open Source Supervisory System</h1>
<p align="center">POC for a supervisory system built using open source software.</p>

https://user-images.githubusercontent.com/25683183/205450860-5f47294d-fe9f-461b-8f73-d4d7910967dd.mp4


## Some handy features of the Supervisory System

 ❯ **Automatic system configuration** based on an Excel file <br>
 ❯ Reading of process values via **OPC UA** and **MQTT** <br>
 ❯ Saving of process values in a **time-series database** <br>
 ❯ Display of **animated graphics** with real-time values <br>
 ❯ Evaluation of the stored process values <br>
 ❯ Overview of the states of the subsystems <br>
 ❯ **Container-based**, arbitrarily scalable <br>
 ❯ Can be used without specific prior knowledge <br>

## Technical Details
The open source supervisory system was built as a microservice architecture. Various existing tools such as GitLab or Grafana are integrated into the architecture and communicate with each other via web API. A central web app takes over the function of the orchestrator and links the individual microservices with the necessary logic. The relationships between the individual services are shown in the figure below.

![system-architecture](https://user-images.githubusercontent.com/25683183/205451134-d1e94ce2-78f0-495d-b44d-5e6adfcb28cb.png)

### Swarmpit
Swarmpit serves as a graphical container management platform and provides an API interface to manage containers externally. In addition to container management, Swarmpit collects metrics of the containers for system monitoring. A backend function of Node-RED notifies via API as soon as a new configuration file has been read and Telegraf containers have to be created/deleted. The current container metrics are forwarded to the supervisory system (web app), where the status of all systems can be monitored at a central location.

### Telegraf
Telegraf serves as a data mediator between the process data and the database. Various data sources such as OPC UA or MQTT can be configured via a configuration file. Each supervisory interface runs as a separate Telegraf container, these containers are managed via Swarmpit API and the required configuration files are stored on and retrieved from GitLab.

### InfluxDB
InfluxDB serves as a time-series database and stores the values supplied by Telegraf. With its query language, peripheral systems such as Grafana or the supervisory system can obtain the stored values.

### Web App
The web app of the supervisory system serves as the central connection between the individual systems. The Web App takes over tasks such as user authentication, reading in the system configuration, displaying the animated graphics as well as displaying the process data, central issuing point of the API tokens (grants the systems access to other systems via API), and system monitoring of all supervisory system-relevant containers.

### Grafana
The dashboarding tool is used for the graphical provision of process data in the form of charts. These charts are made available to the surrounding systems via iframe and are directly integrated into the web app of the supervisory system. Grafana obtains the process data directly from InfluxDB, authentication takes place at GitLab.

### GitLab
GitLab serves as central document management. The graphics as well as individual configuration files are stored and versioned here. GitLab is also responsible for user authentication via OAuth2. Surrounding systems such as Node-RED or the Web App can obtain or upload configuration files directly via the GitLab API.

### Node-RED
The workflow framework Node-RED serves as the backend system. Here, the data of the MSR list is transferred from the web app and rewritten into Telegraf-compatible configuration files. Node-RED stores these configuration files in GitLab and tells Swarmpit via API which containers need to be created or changed.

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).


## Docker build

Build the docker image

```bash
$ docker build -t <username>/nuxt-pluzzy-dashboard:<tag> .
```

Run the docker image

```bash
$ docker run -it -p 5000:5000 nuxt-pluzzy-dashboard:<tag>
```
