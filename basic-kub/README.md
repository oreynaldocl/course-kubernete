# CONCEPTS

minikube tools help to build nodes
kubectl tool to communicate with kubernetes

Kubernetes works objects
    Pods (ephemeral)
        can run 1 (common) to many containers (docker)
        share resources (e.g. volumes)
        has a cluster internal IP (inside can be use localhost)
        persist info to shared resources, not in pods
    Deployments (controller, manage PODs)
    Services
    Volumes
        Shared between elements

# Create first DEPLOY - IMPERATIVE
Trying to create the deployment, but it is ontly listed in pods
```sh
~  kubectl create deployment first-app --image=kub-first-app
```
It is not possible to see in deployment objects.
```bash
~  kubectl get pods
NAME                         READY   STATUS         RESTARTS   AGE
first-app-7cbbc8669d-gz7lv   0/1     ErrImagePull   0          9s
```
Not possible to create, because the image exist only in local, not in public registry.

Just remove it from nodes
```bash
~  kubectl delete deployment first-app
```

Just publish the current image to public registry
```bash
#          local image   public registry name
docker tag kub-first-app oreynaldocl/kub-first-app
docker push oreynaldocl/kub-first-app
```

```sh
~  kubectl create deployment first-app --image=oreynaldocl/kub-first-app
```
After some seconds you will have running the first deploy
```sh
~  kubectl get deployments
NAME        READY   UP-TO-DATE   AVAILABLE   AGE
first-app   1/1     1            1           6m9s
```
## Explanation of first DEPLOY
..

## Service in first DEPLOY
Exposes pods inside of cluster and external (important)
- By default exist the internal IP, that changes when it is replaced
    - Not possible to rely on internal IP
- Services GROUP pods with a shared IP, that it doesn't change
    - This new IP can be used internall and externally
    - Not possible to access to pods internall / externally

### Create a service
It is possible to use `kubectl create service` but it is better use expose

Types:
* ClusterIP
* NodePort : deployment will be exported for outside
* LoadBalancer : generate unique address, it will evenly distribute the calls to our pods. NOTE: only available if SERVER supported, AWS and minikube supported

```
 ~  kubectl expose deployment first-app --type=LoadBalancer --port=8080 
service/first-app exposed
 ~  kubectl get services    
NAME         TYPE           CLUSTER-IP     EXTERNAL-IP   PORT(S)          AGE
first-app    LoadBalancer   10.100.54.95   <pending>     8080:32105/TCP   8s
kubernetes   ClusterIP      10.96.0.1      <none>        443/TCP          25h
```
in minicluster EXTERNAL-IP is always in `<pending>`. Because it is virtual

```
# currently errors in windows, it should open the 
~ minikube service first-app 
```
there is an issue with above command https://github.com/kubernetes/minikube/issues/7644

Needs to redirect to correct port
```
# LOCAL:CLUSTER
~ kubectl port-forward service/first-app 7080:8080 # help
```

After crashing using `kubectl get pods` it is possible to see the restarts attemps, it will take more time after every crash

## Scales/Replicas

`replica` is simple an instance of a Pod. Container with 3 replicas means the same pod/container running 3 times.
```
 ~  kubectl scale deployment/first-app --replicas=3
deployment.apps/first-app scaled
```

When using `port-forward` it is required to finish and start again to use other pod

it it possible to reduce the replicas when needed
```
 ~  kubectl scale deployment/first-app --replicas=1
deployment.apps/first-app scaled
```

# Update the image of deploy
It will be updated the image of deploy
First build new image and push it
```
~  docker build -t kub-first-app .
~  docker push oreynaldocl/kub-first-app
```

And run the following line
```
~  kubectl set image deployment/first-app kub-first-app=oreynaldocl/kub-first-app
```

No changes because the tag didn't change, it is required to update the tag, push and update with new tag, to update the image

```
 ~  docker build -t oreynaldocl/kub-first-app:2 .
 ~  docker push oreynaldocl/kub-first-app:2
 ~  kubectl set image deployment/first-app kub-first-app=oreynaldocl/kub-first-app:2
```
# Error application
Try to set an image that doesn't exist will make a pod fail
```
~  kubectl set image deployment/first-app kub-first-app=oreynaldocl/kub-first-app:3
~ kubectl rollout status deployment/first-app
```

## Rollback 
The following action will just rollback the last action
```
~  kubectl rollout undo deployment/first-app
deployment.apps/first-app rolled back
~  kubectl rollout status deployment/first-app
deployment "first-app" successfully rolled out
# Review history
~  kubectl rollout history deployment/first-app
# go back to specific version
 ~  kubectl rollout undo deployment/first-app --to-revision=1
```

# DELETE deployment-service
```
 ~  kubectl delete service first-app
 ~  kubectl delete deployment first-app
```
