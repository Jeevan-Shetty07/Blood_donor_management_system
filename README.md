# Blood Donor Management System

A full-stack application for managing blood donations between donors and hospitals.

## 🚀 Features
- **Donor Registration**: Manage donors, their blood types, and donation history.
- **Hospital Management**: Coordinate with registered hospitals.
- **Blood Request Support**: Hospitals can request specific blood types from the pool.

## 🛠️ Tech Stack
- **Backend**: Spring Boot 3.2.x, Spring Data JPA, MySQL 8
- **Frontend**: React (Vite), React Hooks, Modern CSS
- **Tools**: Maven (Wrapper), Node.js, npm

## ⚙️ Setup & Installation

### 1. Database Configuration
Enable MySQL and update `src/main/resources/application.properties`:
- **Port**: `3306`
- **Database**: `blood_db` (Auto-created on launch)
- **User/Password**: Update with your MySQL credentials (default in app: `root` / `Jeevan@31`)

### 2. Run the Backend
From the project root:
```powershell
$env:JAVA_HOME='C:\Program Files\Java\jdk-24'; ./mvnw.cmd spring-boot:run -DskipTests
```

### 3. Run the Frontend
From the `frontend` folder:
```powershell
npm install
npm run dev
```
Available at: `http://localhost:5173`

## 📂 Project Structure
- `src/main/java/`: Spring Boot controllers, models, and services.
- `frontend/`: React components and vite configuration.
- `pom.xml`: Backend dependencies.
- `application.properties`: Configuration file.
<!-- $env:JAVA_HOME='C:\Program Files\Java\jdk-24'; ./mvnw.cmd spring-boot:run -DskipTests -->