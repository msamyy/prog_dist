# Service-oriented architecture
## Installation guide :

### Build and run with docker :
```console
docker-compose build & docker-compose up
```

### Without docker :
from progdist/

```console
cd gateway
npm install
npm start
```
```console
cd adminAPI
npm install
npm start
```
```console
cd userAPI
npm install
npm start
```
```console
cd adminFrontend
npm install
npm start
```
```console
cd userfrontend
npm install
npm start
```
## Running ports :
Gateway : 9000
AdminAPI : 7000
UserAPI : 7500
AdminFront : 7777 (or 7776)
UserFront : 3000
