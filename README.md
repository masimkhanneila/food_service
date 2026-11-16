# Foodie — Food Ordering Platform

Foodie is a full-stack food ordering web application built with FastAPI, SQLite, and JavaScript.

Users can explore restaurants, order food, and leave reviews. Restaurant owners can manage their menus and incoming orders.

## Live Demo

https://food-service-8mz7.onrender.com/

### Prerequisites

- Git
- Docker Desktop (installed and running)

### 1. Clone the Repository

```bash
git clone https://github.com/masimkhanneila/food_service.git
cd food_service
```

### 2. Configure Environment Variables

Create a `.env` file using `.env.example`.

**Windows PowerShell:**

```powershell
Copy-Item .env.example .env
```

**macOS / Linux:**

```bash
cp .env.example .env
```

Open `.env` and replace `SECRET_KEY` with a long, randomly generated secret. Keep `ALGORITHM=HS256`.

### 3. Start the Application

```bash
docker compose up --build -d
```

### 4. Open Foodie

- **Website:** http://localhost:8000
- **API Documentation:** http://localhost:8000/docs

### Demo Database

The project includes a demonstration database containing:

- 10 restaurants
- 60 menu items

With the database-initialization configuration in `compose.yaml`, this data is automatically copied into the Docker volume on the first startup.

### 5. Stop the Application

```bash
docker compose down
```

To check container logs:

```bash
docker compose logs -f
```

