# NuxtPluzzyDashboard

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
$ docker build -t <username>/NuxtPluzzyDashboard:<tag> .
```

Run the docker image

```bash
$ docker run -it -p 5000:5000 NuxtPluzzyDashboard:<tag>
```
