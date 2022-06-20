# Problems
- When creating the service, and testing in POSTMAN, it never worked. Reason the labels was not correct in service file.
# Communication internal of POD
- It is possible to add two containers in same pod
- they communicate using LOCALHOST between containers, inside of same pod
# Communication with a different pod
- List service and use the IP
```bash
 ~  kubectl get service
NAME           TYPE           CLUSTER-IP      EXTERNAL-IP   PORT(S)          AGE
auth-service   ClusterIP      10.97.255.227   <none>        80/TCP           22m
kubernetes     ClusterIP      10.96.0.1       <none>        443/TCP          5d
user-service   LoadBalancer   10.110.181.88   <pending>     8080:30952/TCP   7h12m
```
- User a environment in code SERVICE_NAME + SERVICE_HOST. That env contains the IP assigned to that pod
```
    const auth_address = process.env.AUTH_SERVICE_SERVICE_HOST;
    const hashedPW = await axios.get(`http://${auth_address}/hashed-password/${password}`);
```

# EASY COMMANDS
docker build -t oreynaldocl/kub-demo-users:latest . && docker build -t oreynaldocl/kub-demo-users:3 .
docker push oreynaldocl/kub-demo-users:latest && docker push oreynaldocl/kub-demo-users:3
