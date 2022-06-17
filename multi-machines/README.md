Comands:
```sh
# build and execute compose
~ docker-compose up -d --build
# Just stop current containers
~  docker-compose stop
# Just stop and removes network
~  docker-compose down
# Remove all containers not used
~  docker container prune
# When restart docker-compose, the saved value is kept
~ docker-compose up -d --build

# Build and push the docker image
# Create configuration (with one file) and apply
~  kubectl apply -f .\01-starting-setup\master-deployment.yaml
# Update and push again
# Update the version of the image and change in yaml
~  kubectl apply -f .\01-starting-setup\master-deployment.yaml
```
