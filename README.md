# What's in this repository?
- Basic application running python backend/angular frontend + DB
- Database contains a table with companies and departments. Company can have multiple departments.
- Application allows for viewing and creating companies

# What do you need to do?
- Add an ability to list and add employees of companies
- Don't worry about permissions
- Adjust existing code as you see fit to achieve the goal
- Database migration can be provided as a seperate SQL file

# How do you need to do it?
- Add commits in as clean format as you would normally do it
- Create a PR against this repo

# How to start the app?
## Requirements
- Docker + DockerCompose

## Setup
- `docker-compose up -d db` (db takes a while to start up for the first time so you might need to re-run this command)
- `docker-compose up`

### DB
- you can access DB through localhost:3307, username: root, password: insecure

### Backend
- runs on port 5000

### Frontend
- runs on port 8080