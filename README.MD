# PreisHub

## 🧾 Features

- Express.js + TypeScript
- MongoDB integration
- Prettier + ESLint configured
- Environment configuration using `.env.development

---

---

## 🛠️ Prerequisites

- Node.js (v18+)
- Docker & Docker Compose

---

## 🚦 Getting Started

### 🔁 1. Clone the dev branch

### HTTPS

```bash
 git clone https://github.com/roushan-sheik/preishub-backend.git
```

### SSH

```bash
git clone git@github.com:roushan-sheik/preishub-backend.git

```

## Navigate to this directory

```
cd preishub-backend
```

---

### 📦 Install Dependencies

```bash
npm install
```

### 🔥 Run in Dev Mode

```bash
npm run start:dev
```

## 📁 Project Structure

```

    ├── app.ts
    ├── builder
    │   └── QueryBuilder.ts
    ├── config
    │   ├── db.config.ts
    │   └── index.ts
    ├── constants
    ├── controllers
    │   ├── auth.controller.ts
    │   └── product.controller.ts
    ├── errors
    │   ├── handleCastError.ts
    │   ├── handleDuplicateError.ts
    │   ├── handleValidationError.ts
    │   ├── handleZodError.ts
    │   └── index.ts
    ├── interfaces
    │   ├── auth.interface.ts
    │   ├── error.interface.ts
    │   ├── product.interface.ts
    │   └── user.interface.ts
    ├── middlewares
    │   ├── auth.ts
    │   ├── globalErrorHandler.ts
    │   ├── index.ts
    │   ├── notFound.ts
    │   └── zodValidateRequest.ts
    ├── models
    │   ├── category.model.ts
    │   ├── product.model.ts
    │   └── user.model.ts
    ├── routes
    │   ├── auth.route.ts
    │   └── product.route.ts
    ├── server.ts
    ├── services
    │   ├── auth.service.ts
    │   └── product.service.ts
    ├── utils
    │   ├── ApiError.ts
    │   ├── ApiResponse.ts
    │   ├── AsyncHandler.ts
    │   ├── functions
    │   │   └── auth.utils.ts
    │   └── GlobalErrorObj.ts
    └── zod
        ├── auth.validation.ts
        └── product.validation.ts

```
