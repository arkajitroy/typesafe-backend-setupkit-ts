## 🧰 Typesafe Backend Setupkit (TypeScript | Express | Docker)

This repository contains boilerplate code for constructing a standard backend structure for your own application. The main focus of the boilerplate is to build for a `monolith-architecture application` It is straightforward, simply clone it and begin customizing according to your requirements!

**Tech stack used:** TypeScript, NodeJS, Express, MongoDB, Zod, Docker, nodemailer, multer, winston, helmetjs, morgan

### ⭐ Feature Contents

- Dedicated Express reusable core functionalites
- Totally secured with payload and rate limiting middlewares.
- Fully typesafe configuration with TypeScript and zod validators
- HTTP Loggger with automated script generating feature
- Dependency checker and updation scripts

### ⭐ Scripts

These are some follwing scripts which are associated with the application

```js
// 📌 Scripts: Development/Build/Testing
npm run dev
npm run build
npm run start
npm run test

// 📌 Script: Code Linting Checkups
npm run lint:check
npm run lint:fix

// 📌 Script: Code Formatting Checkups
npm run format:check
npm run format:write

// 📌 Script: Dependency Check and Updation
npm run dependency:check
npm run dependency:upgrade
```

### 🐬 Docker Command

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
