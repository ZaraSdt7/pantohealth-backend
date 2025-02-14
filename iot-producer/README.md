# IoT Producer

The IoT Producer is responsible for **simulating IoT devices** that automatically generate and send X-ray data to RabbitMQ. It produces **realistic and continuous data** and provides **RESTful API endpoints** to control the simulation.

---

## 📌 Features
- **Automatically generate realistic X-ray data** including:
  - Device ID, Time, Coordinates (X, Y), and Speed.
- **Continuously send X-ray data** to RabbitMQ.
- **Control the simulation** with Start/Stop API endpoints.
- **API documentation** using Swagger for easy integration and testing.

---

## ⚙️ Technologies Used
- **NestJS** - Backend framework for building scalable server-side applications.
- **RabbitMQ** - Message broker for asynchronous communication.
- **Swagger** - API documentation and testing.
- **TypeScript** - Strongly typed programming language for better maintainability.

---

## 🧩 Architecture Overview
- **`data.generator.ts`** → Generates realistic X-ray data including time, coordinates, and speed.
- **`simulator.service.ts`** → Handles data generation and continuously sends messages to RabbitMQ.
- **`simulator.controller.ts`** → Provides API endpoints to Start and Stop the simulation.
- **`rabbitmq.producer.ts`** → Connects to RabbitMQ and publishes the X-ray data to `x-ray-queue`.

---

## 🔧 Installation and Setup
### Prerequisites
- **Node.js** (version 18.x or later)
- **Docker** and **Docker Compose**

### Installation
```bash
# Clone the repository
git clone https://github.com/ZaraSdt7/pantohealth-backend
cd iot-producer

# Install dependencies
npm install
