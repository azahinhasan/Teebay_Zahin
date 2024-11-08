
# Teebay_Zahin

## Getting Started

### Clone the Repository
Clone the project to your local machine:
```bash
git clone https://github.com/azahinhasan/Teebay_Zahin.git
```

---

## Running the Project

### Option 1: Run with Docker (Recommended)
Navigate to the project folder and run the following command(make sure docker is running on the system):
```bash
docker-compose up --build
```
or
```bash
docker compose up --build
```
Docker will handle all dependencies, including PostgreSQL and Node.js, making setup simpler.

- The frontend will be accessible at `http://localhost:5179`.
- The backend server will be accessible at `http://localhost:5010`.
- The DB will be accessible at `http://localhost:5011`.

### Option 2: Run without Docker
Ensure the following are installed:
- **PostgreSQL** (version 16 or above recommended)
- **Node.js** (version 20 or above)

#### Steps
1. **Backend Setup**
    - Navigate to the `Backend` folder.
    - Create an `.env` file by following the structure in `.env.example`.
    - Install dependencies and set up the database:
      ```bash
      npm install
      npm run prisma:migrate
      npm run dev
      ```
      This will configure the database and seed it with some dummy data. The backend server will be accessible at `http://localhost:5212`.

2. **Frontend Setup**
    - Navigate to the `Frontend` folder.
    - Create an `.env` file by following the structure in `.env.example`.
    - Install dependencies and start the development server:
      ```bash
      npm install
      npm run dev
      ```
      The frontend will be accessible at `http://localhost:5180`.

---

## Additional Information
For further details, consult the documentation in [ Part_4_documentation.md](Part_4_documentation.md).
