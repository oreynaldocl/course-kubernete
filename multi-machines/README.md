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
# Every restart of container data will lose
```
# VOLUMES
It is possible to define a volume that is for a pod/node (shared between replicas) but are not shared to other pods
## Persisted volumes
Create new resource, that doesn't "belongs" to the pods

Claim: The pod wants to use should claim
"That would be called 'Dynamic Volume Provisioning' and is an advanced administration topic. We stick to 'Static Provisiong'"