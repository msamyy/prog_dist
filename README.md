
# gateway:
          npm install 
          npm start

# adminAPI:
### 1. *avec Docker*:
          docker build . -t <your username>/adminAPI
          docker images // pour vérifier que l'image existe bel et bien 
          docker run -p 7000:7000 -d <your username>/adminAPI
          // si vous voulez le monde interactif il faut:
          docker ps // pour récupérer le <container id>
          docker exec -it <container id> /bin/bash
### 2. *sans Docker*:
          npm install 
          npm start

# adminFrontend:
          npm install 
          npm start 
