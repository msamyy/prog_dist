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
Gateway : 9000\
AdminAPI : 7000\
UserAPI : 7500\
AdminFront : 7777 (or 7776)\
UserFront : 3000

## Resolve some errors that might occur :
If you're using windows, you might be getting the following error on 'npm start' :

```console
babel-node' is not recognized as an internal or external command, operable program or batch file
```

To fix it we recommand to :
1. Try deleting node_modules folder and run 'npm install' again.
2. If this does not solve it, try to :
    - Delete node_modules
    - run 'npm install -g babel-cli'
    - run 'npm install'