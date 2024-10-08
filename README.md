<picture>
  <source media="(prefers-color-scheme: dark)" srcset="/client/src/assets/images/Logo.svg">
  <img alt="HistArts logo" src="/client/src/assets/images/Logo-dark.svg"/>
</picture>

## Description
HistArts it is the website that has historical information about different creative people. Here you can find information about musicians, artists, sculptors and poets. This website is created for people who want to meet with art or already in love with one. This project was created to improve my skills to work with **react**, **LESS**, **express**, **PostgreSQL**, **RESTful API** and **JWT authorization**.

## Stack
### Frontend
- React
- Framer-motion 
- Axios
### Backend
- Node
- Express
- Sequelize
### Admin
- React 
- MobX
- Axios
### Database 
- PostgreSQL

## Run locally
1. Clone the project
```bash
git clone https://github.com/PartySoonXd/HistArts.git
```
2. Go to the project directory
```bash
cd HistArts
```
3. Install dependencies
```bash
npm install
```
4. Install dependencies for applications
```bash
npm run deps
```
5. Go to the `server` directory and rename **.env.example** to **.env.local**
6. Go to the `client` directory and rename **.env.example** to **.env.local**
7. Go to the `admin` directory and rename **.env.example** to **.env.local**
8. Go to the [configuration](#configuration)
9. Run app from root directory
```bash
npm run dev
```

After this you can open apps in your browser
- Client - http://localhost:8088
- Admin - http://localhost:8800

## Run with docker
***You need to have docker on your computer***
1. Clone the project
```bash
git clone https://github.com/PartySoonXd/HistArts.git
```
2. Go to the `admin` directory and rename **.env.example** to **.env.local**
3. Go to the `client` directory and rename **.env.example** to **.env.local**
4. Go to the `server` directory and rename **.env.example** to **.env.local**
5. Go to the [configuration](#configuration)
6. Run docker-compose from root directory
```bash
docker-compose up
```

After this you can open apps in your browser
- Client - http://localhost:8088
- Admin - http://localhost:8800

## Configuration
1. Open `server/.env.local` and complete required variables
### Locally
1. Install [postgreSQL](https://www.postgresql.org/download/) on your computer
    - In process of installation you need to set password(default: root) ***similar with values in `server/.env.local`***
2. Init db from root directory
```bash
npm run db
```
### With docker
1. Open `server/.env.local` and change value of `POSTGRES_HOST` variable into `postgres`

## Feedback
Vladislav Belomestnykh - vladislav.webdeveloper@gmail.com
