### Typescript Backend Setupkit (NODE | Express | Docker)

This repository contains boilerplate code for constructing a basic backend structure for your own application. It is straightforward; simply clone it and begin customizing according to your requirements!

#### Feature Contents

- TypeScript with dedicated interfaces and types defined.

#### Docker Command

#### 📌 Development Environment

command: image creation

```
docker build -t backend-app:dev -f docker/development/Dockerfile .
```

command: container creation

```
docker run --rm -it -v ${PWD}:/usr/src/backend-app -v /usr/src/backend-app/node_modules -p 3000:3000 backend-app:dev
```

#### 📌 Production Environment

command: image creation

```
docker build -t backend-app:dev -f docker/production/Dockerfile .
```

command: container creation

```
docker run --rm -d -v ${PWD}:/usr/src/backend-app -v /usr/src/backend-app/node_modules -p 3000:3000 backend-app:1.0.0
```
