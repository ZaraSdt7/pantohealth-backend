# Xray Service

The Xray Service is responsible for **receiving, processing, and storing X-ray data** from IoT devices. It also provides **RESTful API endpoints** for managing X-ray records and **analyzing signals**.

---

## 📌 Features
- **Receive X-ray data from RabbitMQ** using a consumer.
- **Process and store data** in MongoDB.
- **CRUD operations** for X-ray records.
- **Signal analysis** with filtering by Device ID and time range.
- **Detailed API documentation** using Swagger.

---

## ⚙️ Technologies Used
- **NestJS** - Backend framework for building scalable server-side applications.
- **RabbitMQ** - Message broker for asynchronous communication.
- **MongoDB** - NoSQL database for storing X-ray records.
- **Swagger** - API documentation and testing.

---

## 🔧 Installation and Setup
```bash

git clone https://github.com/ZaraSdt7/pantohealth-backend
cd xray-service


npm install
