# Deploiement

```sh
k apply -f ./kubernetes/deployment.yaml -f ./kubernetes/secret.yaml
```

kubectl create secret docker-registry regcred --docker-server=registry.jandco.pro --docker-username=nicol --docker-password=

> Sur les Mac

**Création du builder à ne faire qu'une seule fois**

```sh
docker buildx create --name amdbuilder --platform linux/amd64
docker buildx user amdbuilder
```

## Pour build / tag / push

```sh
docker buildx build . --platform linux/amd64  -t discord-merge-request-bot --load
docker tag discord-merge-request-bot registry.jandco.pro/discord-merge-request-bot:<TAG>
docker push registry.jandco.pro/discord-merge-request-bot:<TAG>
```
