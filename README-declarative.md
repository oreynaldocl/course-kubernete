# DECLARATIVE

* yaml configuration
* first run uses complete file
* next updates, just modify changes of YAML

## Search for base document
Version is important
you can find all info here: https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.24/

# Template-Deploy
Template is always a POD, no requires KIND

Run following commands:
```
# Create the deployment
~  kubectl apply -f deployment.yaml
# Review pods created
~  kubectl get pods
NAME                                    READY   STATUS    RESTARTS   AGE
second-app-deployment-c8f4d45b5-fzhmb   1/1     Running   0          5s
# Review deployment state
 ~  kubectl get deployments
NAME                    READY   UP-TO-DATE   AVAILABLE   AGE
second-app-deployment   1/1     1            1           10s
```
# Service
```
# Create/update the service
~  kubectl apply -f service.yaml
# List the new service created
~  kubectl get service
# minikube still has problem, requires to port-forward
~  kubectl port-forward service/backend 7080:80
```

# DELETE
```
# It is still possible to use
kubectl delete deployment second-app-deployment
kubectl delete service backend

# or better use the files
kubectl delete -f deployment.yaml,service.yaml

# delete based on labels
 ~  kubectl delete deployments,services -l group=example
```

# Join configurations
```
# it is possible to create both
~  kubectl apply -f master-deployment.yaml
# It is possible to delete both with same file
~  kubectl delete -f master-deployment.yaml

```