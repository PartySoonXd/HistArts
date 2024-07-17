<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/PartySoonXd/HistArts/master/client/src/assets/images/Logo.svg?token=GHSAT0AAAAAACUAU2JFWLKR3AS725RF44FMZUXIVUA">
  <img alt="HistArts logo" src="https://raw.githubusercontent.com/PartySoonXd/HistArts/master/client/src/assets/images/Logo-dark.svg?token=GHSAT0AAAAAACUAU2JFHIC2WO62STCLRXNMZUXITWQ"/>
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
4. Go to the server directory
```bash
cd server
```
5. Install dependencies
```bash
npm install
```
6. Rename .env.example to .env.local
7. Go to the client directory
```bash
cd client
```
8. Install dependencies
```bash
npm install
```
9. Rename .env.example to .env.local
10. Go to the admin directory
```bash
cd admin
```
11. Install dependencies
```bash
npm install
```
12. Rename .env.example to .env.local
13. Run app from root directory
```bash
npm run dev
```
14. Go to the [configuration](#configuration)

After this you can open apps in your browser
- Client - http://localhost:8088
- Admin - http://localhost:8800

## Run with docker
***You need to have docker on your computer***
1. Go to the admin directory
```bash
cd admin
```
2. Rename .env.example to .env.local
3. Go to the client directory
```bash
cd client
```
4. Rename .env.example to .env.local
5. Go to the server directory
```bash
cd server
``` 
6. Rename .env.example to .env.local
7. Run docker-compose from root directory
```bash
docker-compose up
```
8. Go to the [configuration](#configuration)

After this you can open apps in your browser
- Client - http://localhost:8088
- Admin - http://localhost:8800

## Configuration
1. Open `server/.env.local` and complete required variables
### Locally
1. Install [postgreSQL](https://www.postgresql.org/download/) on your computer
2. Create database with name(default: HistArts_DB) ***similar with value in `app/.env.local`***
### With docker
1. Open `server/.env.local` and change value of `DB_HOST` variable into `postgres`

## Feedback
Vladislav Belomestnykh - vladislav.webdeveloper@gmail.com
