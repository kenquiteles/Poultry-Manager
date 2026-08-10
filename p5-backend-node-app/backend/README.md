# Poultry Manager API
A backend REST API for managing a poultry farm. The system supports user authentication, poultry records, inventory management, finance tracking, egg production tracking, analytics, and AI-powered farm recommendations using Google Gemini.

-------------------------------------------------------

# Features
* User registration and login
* JWT authentication and authorization
* Poultry batch management
* Inventory management
* Finance tracking (income and expenses)
* Egg production tracking
* Analytics dashboard
* AI-powered recommendations using Google Gemini
* Soft deletion
* Query filtering
* Error handling with proper HTTP status codes

-------------------------------------------------------

# Tech Stack
* Node.js
* Express.js
* React.js
* MongoDB Atlas
* Mongoose
* Postman
* JWT (JSON Web Tokens)
* bcrypt
* Helmet
* CORS
* Google Gemini API

-------------------------------------------------------

# Installation
Clone the repository:

```bash
git clone https://github.com/your-username/chicken-manager-api.git
cd chicken-manager-api
```

Install dependencies:

```bash
npm install
```

-------------------------------------------------------

# Environment Variables
Create a `.env` file in the project root:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
```

-------------------------------------------------------

# Run the Project
Development mode:

```bash
npm run dev
```

Production mode:

```bash
npm start
```

Server runs at:

```text
http://localhost:5000
```

-------------------------------------------------------

# Authentication
Most endpoints require a Bearer token.

Example:

```http
Authorization: Bearer YOUR_JWT_TOKEN
```

-------------------------------------------------------

# API Endpoints

# Auth
| Method | Endpoint             | Description         |
| ------ | -------------------- | ------------------- |
| POST   | `/api/auth/register` | Register a new user |
| POST   | `/api/auth/login`    | Login user          |
| GET    | `/api/auth/me`       | Get current user    |
| POST   | `/api/auth/logout`   | Logout user         |

# Poultry
| Method | Endpoint           | Description                   |
| ------ | ------------------ | ----------------------------- |
| POST   | `/api/poultry`     | Create a poultry record       |
| GET    | `/api/poultry`     | Get all poultry records       |
| GET    | `/api/poultry/:id` | Get a poultry record by ID    |
| PUT    | `/api/poultry/:id` | Edit a poultry record by ID   |
| DELETE | `/api/poultry/:id` | Delete a poultry record by ID |

# Inventory
| Method | Endpoint             | Description                      |
| ------ | -------------------- | -------------------------------- |
| POST   | `/api/inventory`     | Create an inventory record       |
| GET    | `/api/inventory`     | Get all inventory records        |
| GET    | `/api/inventory/:id` | Get an inventory record by ID    |
| PUT    | `/api/inventory/:id` | Edit an inventory record by ID   |
| DELETE | `/api/inventory/:id` | Delete an inventory record by ID |

# Finance
| Method | Endpoint           | Description                   |
| ------ | ------------------ | ----------------------------- |
| POST   | `/api/finance`     | Create a finance record       |
| GET    | `/api/finance`     | Get all finance records       |
| GET    | `/api/finance/:id` | Get a finance record by ID    |
| PUT    | `/api/finance/:id` | Edit a finance record by ID   |
| DELETE | `/api/finance/:id` | Delete a finance record by ID |

# Production
| Method | Endpoint              | Description                      |
| ------ | --------------------- | -------------------------------- |
| POST   | `/api/production`     | Create a production record       |
| GET    | `/api/production`     | Get all production records       |
| GET    | `/api/production/:id` | Get a production record by ID    |
| PUT    | `/api/production/:id` | Edit a production record by ID   |
| DELETE | `/api/production/:id` | Delete a production record by ID |

# AI Recommendations
| Method | Endpoint             | Description                      |
| ------ | -------------------- | -------------------------------- |
| GET    | `/api/gemini/advice` | Generate AI farm recommendations |

-------------------------------------------------------

# Optional Query Parameters
Filter poultry by batch:

```http
GET /api/poultry?batch=BatchA
```

-------------------------------------------------------

# Soft Deletion
Delete operations do not permanently remove records. Documents are marked with:

```js
isDeleted: true
```

Only non-deleted records are returned by the API.

-------------------------------------------------------

# AI Feature
The application integrates **Google Gemini** to analyze poultry, production, finance, and inventory data and generate practical farm management recommendations.

Example response:

```json
{
  "advice": "Increase feed inventory and monitor egg production efficiency."
}
```

-------------------------------------------------------

# Security
* Passwords are hashed using **bcrypt**
* Authentication uses **JWT**
* Security headers are provided by **Helmet**
* Cross-origin requests are handled with **CORS**

-------------------------------------------------------

# Author
**Ken Chester Quiteles**

Project developed for the Uplift Code Camp backend requirements.