## 🙌 With docker compose

```bash
docker-compose up --build
```

## 🙌 without docker compose can I run and build image and container

Yes, **can absolutely use Docker without Docker Compose** — but Compose just makes life easier, especially when working with multiple services or wanting a quick workflow.
---

### 🔧 Without Docker Compose (pure Docker CLI):

You can **build and run** your container using the Docker CLI:

#### ✅ 1. **Build the Docker image**

```bash
docker build -t maainul/nodejs-with-test:latest .
```

#### ✅ 2. **Run the container**

```bash
docker run -p 8000:8000 maainul/nodejs-with-test:latest
```

If you want to run in the background:

```bash
docker run -d -p 8000:8000 maainul/nodejs-with-test:latest
```

### 🧠 `docker run -p 8000:8000 nodejs-with-test:latest` — What it Means:

- `docker run` — Run a new container.
- `-p 8000:8000` — Port mapping:
  - Left side (`8000`) = your **local machine (host)** port.
  - Right side (`8000`) = the **container's exposed** port (from `EXPOSE` in `Dockerfile`).
- `nodejs-with-test:latest` — The name and tag of the Docker image you want to run.

---

### ✅ Change Host Port (e.g., `localhost:7000`)

Yes! You **can** run it on `localhost:7000` by changing the host port in the `-p` flag:

```bash
docker run -p 7000:8000 nodejs-with-test:latest
```

➡️ This maps:

- `localhost:7000` on **your machine** 🖥️
- to `port 8000` **inside the container** 📦 (where your Node app is running)

### So:

- `curl localhost:7000` ✅
- or open `http://localhost:7000` in your browser ✅

---

### 🔁 General Format:

```bash
docker run -p <host-port>:<container-port> <image-name>
```

## Let me know if you want to map multiple ports or use named containers.

### 🧩 So why use Docker Compose?

`docker-compose.yml` is useful when:

- You want to **mount volumes** easily (like your source code for hot reloading).
- You're running **multiple services**, e.g., Node.js + MongoDB/PostgreSQL/Redis.
- You want **one command** (`docker-compose up`) to build, run, and manage everything.
- You want to manage **different environments** (dev, test, prod) easily.

---

### ✅ When to skip Docker Compose?

If you:

- Only have **one simple container** (like this Node app),
- Don’t need volume mounts or separate services,
- Are deploying to a server and using `Dockerfile` only,

...then **plain Docker is totally fine**.

---

## Build and Push to Docker Hub
```bash
docker login

docker build -t maainul/nodejs-with-test:latest .

docker push maainul/nodejs-with-test:latest

docker images
```

## Now Pull and Run IT:
```bash
docker pull maainul/nodejs-with-test:latest

docker run -it -p 8000:8000 maainul/nodejs-with-test:latest
```
## Show images and container
```bash
docker images && docker ps -a
```
# CICD PIPELINE
![Image](https://github.com/user-attachments/assets/b379de69-dab4-40d9-ad4a-5bef3495e8e4)


## How to deploy on the vercel:

Create this file on the application:

```json
{
    "version": 2,
    "builds": [
        {
            "src": "server.js",
            "use": "@vercel/node"
        }
    ],
    "routes": [
        {
            "src": "/(.*)",
            "dest": "server.js"
        }
    ]
}
```