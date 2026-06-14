# 💎 Jewellery E-Commerce REST API

A production-structured REST API for a jewellery e-commerce platform built with **Node.js**, **Express**, and **MongoDB (Mongoose)**. Covers user auth, product catalogue with variants, cart, wishlist, orders, and ratings.

---

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB Atlas (Mongoose ODM)
- **Auth:** JWT (Access + Refresh Token)
- **Password Hashing:** bcrypt
- **Environment:** dotenv

---

## Project Structure

```
ecommerce-api/
├── src/
│   ├── config/
│   │   └── connectDB.js          # MongoDB connection
│   ├── models/
│   │   ├── user.model.js         # User schema + bcrypt + JWT methods
│   │   ├── category.model.js     # Product categories
│   │   ├── subCategory.model.js  # Sub-categories (refs Category)
│   │   ├── product.model.js      # Product with jewellery-specific fields
│   │   ├── variantGroup.model.js # Links product variants together
│   │   ├── metalType.model.js    # e.g. Yellow Gold, Rose Gold
│   │   ├── metalStamp.model.js   # e.g. 10k, 14k, 18k
│   │   ├── stoneShape.model.js   # e.g. Round, Oval, Princess
│   │   ├── rating.model.js       # Product ratings (1 per user per product)
│   │   ├── cart.model.js         # User cart with product refs     [coming soon]
│   │   ├── wishlist.model.js     # User wishlist                   [coming soon]
│   │   └── order.model.js        # Orders with product snapshots   [coming soon]
│   ├── controllers/
│   │   ├── user.controller.js
│   │   ├── product.controller.js                                   [coming soon]
│   │   ├── category.controller.js                                  [coming soon]
│   │   ├── cart.controller.js                                      [coming soon]
│   │   ├── wishlist.controller.js                                  [coming soon]
│   │   └── order.controller.js                                     [coming soon]
│   ├── routes/
│   │   ├── user.route.js
│   │   ├── product.route.js                                        [coming soon]
│   │   ├── category.route.js                                       [coming soon]
│   │   ├── cart.route.js                                           [coming soon]
│   │   ├── wishlist.route.js                                       [coming soon]
│   │   └── order.route.js                                          [coming soon]
│   ├── middlewares/
│   │   └── verifyJWT.js          # Auth middleware for protected routes
│   ├── utility/
│   │   ├── ApiResponse.js        # Consistent success response class
│   │   ├── ApiError.js           # Consistent error response class
│   │   └── validator.js          # Request validation functions
│   └── app.js                    # Express setup + route registration
├── server.js                     # Entry point
├── .env                          # Environment variables (never commit)
├── .gitignore
└── package.json
```

---

## Environment Variables

Create a `.env` file in the root:

```env
PORT=8777
MONGODB_URL=your_mongodb_atlas_connection_string
ACCESS_TOKEN_SECRET=your_access_token_secret
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRY=10d
CORS_ORIGIN=*
```

---

## Getting Started

```bash
# Install dependencies
npm install

# Run in development
npm run dev

# Run in production
npm start
```

---

## API Reference

Base URL: `http://localhost:8777/api/v1`

### Auth / User Routes

| Method | Endpoint           | Auth Required | Description                                            |
| ------ | ------------------ | ------------- | ------------------------------------------------------ |
| POST   | `/register`        | No            | Register new user                                      |
| POST   | `/login`           | No            | Login, returns access + refresh tokens                 |
| GET    | `/profile`         | Yes           | Get current user profile                               |
| POST   | `/change_password` | Yes           | Change password (requires old password)                |
| GET    | `/logout`          | Yes           | Logout, clears refresh token                           |
| POST   | `/forget_password` | No            | Send password reset email (SMTP) — coming soon         |
| PATCH  | `/profile`         | Yes           | Update profile info — coming soon                      |
| POST   | `/refresh_token`   | No            | Get new access token using refresh token — coming soon |

### Category Routes — coming soon

| Method | Endpoint                        | Auth Required | Description         |
| ------ | ------------------------------- | ------------- | ------------------- |
| GET    | `/categories`                   | No            | List all categories |
| POST   | `/categories`                   | Admin         | Create category     |
| GET    | `/categories/:id/subcategories` | No            | List subcategories  |
| POST   | `/subcategories`                | Admin         | Create subcategory  |

### Product Routes — coming soon

| Method | Endpoint                 | Auth Required | Description                            |
| ------ | ------------------------ | ------------- | -------------------------------------- |
| GET    | `/products`              | No            | List products with filters             |
| GET    | `/products/:id`          | No            | Get product detail with variants       |
| POST   | `/products`              | Admin         | Create product                         |
| PATCH  | `/products/:id`          | Admin         | Update product                         |
| DELETE | `/products/:id`          | Admin         | Soft delete (status change)            |
| GET    | `/products/:id/variants` | No            | Get all variants in same variant group |

### Rating Routes — coming soon

| Method | Endpoint                | Auth Required | Description                         |
| ------ | ----------------------- | ------------- | ----------------------------------- |
| POST   | `/products/:id/ratings` | Yes           | Add rating (1 per user per product) |
| GET    | `/products/:id/ratings` | No            | Get all ratings for a product       |

### Cart Routes — coming soon

| Method | Endpoint        | Auth Required | Description           |
| ------ | --------------- | ------------- | --------------------- |
| GET    | `/cart`         | Yes           | Get current user cart |
| POST   | `/cart`         | Yes           | Add item to cart      |
| PATCH  | `/cart/:itemId` | Yes           | Update item quantity  |
| DELETE | `/cart/:itemId` | Yes           | Remove item from cart |
| DELETE | `/cart`         | Yes           | Clear entire cart     |

### Wishlist Routes — coming soon

| Method | Endpoint               | Auth Required | Description               |
| ------ | ---------------------- | ------------- | ------------------------- |
| GET    | `/wishlist`            | Yes           | Get current user wishlist |
| POST   | `/wishlist`            | Yes           | Add product to wishlist   |
| DELETE | `/wishlist/:productId` | Yes           | Remove from wishlist      |

### Order Routes — coming soon

| Method | Endpoint             | Auth Required | Description                           |
| ------ | -------------------- | ------------- | ------------------------------------- |
| POST   | `/orders`            | Yes           | Place order (stores product snapshot) |
| GET    | `/orders`            | Yes           | Get user order history                |
| GET    | `/orders/:id`        | Yes           | Get order detail                      |
| PATCH  | `/orders/:id/cancel` | Yes           | Cancel order                          |
| PATCH  | `/orders/:id/status` | Admin         | Update order status                   |

---

## Data Models

### User

Fields: `firstName`, `lastName`, `email` (unique), `mobileNo` (unique), `password` (bcrypt hashed), `avatar`, `refreshToken`, `role` (customer/admin), timestamps

### Product

Fields: `title`, `description`, `images[]`, `slug`, `metalType`, `metalStamp`, `centreStone`, `centreStoneShape`, `carat`, `finalAmount`, `offerPrice`, `category`, `subcategory`, `variantGroupId`, `status` (Active/Not Available/Coming Soon), timestamps

### Product Variant System

Products in the same design family share a `variantGroupId`. Each variant is a standalone product document — different title, price, metal, images. Query siblings via `variantGroupId` to show "also available in..." on product page.

### Rating

One rating per user per product enforced via compound unique index on `(user, product)`. Fields: `rating` (1–5), `review`, `user`, `product`, timestamps

### Order

Stores a **snapshot** of product data at time of purchase (price, title, images) — not a reference. Ensures order history is accurate even if product changes later.

---

## Auth Flow

```
POST /register → create account
POST /login    → receive accessToken (short-lived) + refreshToken (long-lived)
                 store both on client
Every request  → send: Authorization: Bearer <accessToken>
Token expires  → POST /refresh_token with refreshToken → get new accessToken
POST /logout   → refreshToken cleared from DB, both tokens invalidated
```

---

## Response Format

All responses follow a consistent structure:

**Success:**

```json
{
  "success": true,
  "statusCode": 200,
  "data": {},
  "message": "Operation successful"
}
```

**Error:**

```json
{
  "success": false,
  "statusCode": 401,
  "message": "Unauthorized"
}
```

---

## Scripts

```bash
npm run dev    # nodemon — auto-restart on file changes
npm start      # node server.js — production
```
