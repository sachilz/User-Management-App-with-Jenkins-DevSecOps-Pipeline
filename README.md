## Automated DevSecOps Pipeline for MERN Stack App on AWS 🚀
A production-ready Student Management Application built using the MERN stack and deployed through a fully automated DevSecOps CI/CD pipeline on AWS. This project demonstrates secure software delivery by integrating security at every stage (Shift-Left approach)

## Architecture Overview 🧩
![Architecture Diagram](./asset/diagrame.gif)

## Tech Stack 🛠️
- Frontend : React.js
- Backend : Node.js | Express.js
- Database : MongoDB Atlas
- Cloud & Infrastructure : AWS EC2
- Containerization : Docker | Docker Compose
- DevSecOps Tools : Gitleaks (Secret Scanning) | SonarQube (SAST) | Trivy (Container Security)

## Containerization & Orchestration 🐳
- Docker
    - Containerized: React FE | Node.js BE | Nginx reverse proxy
- Docker Compose
  - Managed multi-container setup
  - Enabled secure internal networking
  - Simplified local development & deployment

## CI/CD Pipeline (DevSecOps) 🔐
### Security First Approach
- Secret Scanning : Gitleaks scans for exposed credentials before build
- Static Code Analysis : SonarQube detects Bugs, Code smells, Vulnerabilities
- Container Security : Trivy scans Docker images and Pipeline fails if high/critical vulnerabilities found
- Automated Deployment : Only secure images are pushed and Auto-deployed to AWS EC2

## Project Structure 📂
```text
.
├── asset/                   
├── backend/                 
│   ├── models/              
│   ├── .dockerignore       
│   ├── .gitignore           
│   ├── Dockerfile           
│   ├── package-lock.json
│   ├── package.json         
│   └── server.js            
├── docs/                   
├── frontend/                
│   ├── public/              
│   ├── src/                
│   ├── .dockerignore
│   ├── .gitignore
│   ├── Dockerfile          
│   ├── package-lock.json
│   └── package.json         
├── docker-compose.yml       
├── jenkinsfile             
├── nginx.conf               
├── PORT_CONFIGURATION.md    
└── README.md                
```

## Setup & Installation ⚙️
### Clone the Repository
```bash
git clone https://github.com/sachilz/Securing-Deploying-a-MERN-Stack-App-on-AWS.git
```

### Navigate project folder
```bash
cd Securing-Deploying-a-MERN-Stack-App-on-AWS
```

### Run with Docker Compose
```bash
docker compose up --build -d
```

### Access the App
```bash
http://localhost
```

## Deployment Workflow ☁️
