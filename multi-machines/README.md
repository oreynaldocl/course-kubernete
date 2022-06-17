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
```