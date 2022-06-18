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
## Persistent volumes
Create new resource, that doesn't "belongs" to the pods

Claim: The pod wants to use should claim
"That would be called 'Dynamic Volume Provisioning' and is an advanced administration topic. We stick to 'Static Provisiong'"

## Types
"Normal" vs "Persistent"
Both will keep the data while restart/updates.
Normal: it lives while POD lives
Persistent: it is global and require more complext and mantainability.
    - Overkill for small project.
    - Better when manager many pods

# ENVIRONMENT VARS
1. Can be addeed directly to container spec `env:\n-name: XXX\nvalue: XXX`
2. Can create a shared resource and shared between pods `kind:ConfigMap`
