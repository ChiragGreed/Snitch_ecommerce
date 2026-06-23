# Snitch — Full Stack Fashion Marketplace

A modern full-stack e-commerce platform built with a complete shopping workflow, including user authentication, seller management, product inventory, cart functionality, online payments, and order processing.

This platform is designed as a marketplace where sellers can manage products and customers can browse, purchase, and track their orders through a seamless shopping experience.

## 🚀 Features

### 🔐 Authentication & User Management

* User registration and login
* Secure password hashing
* Google authentication
* Role-based access control

  * Customer
  * Seller
* Protected routes
* Password reset functionality
* User profile management

### 🏪 Seller Dashboard

* Seller-specific dashboard
* Create and manage products
* Update product details
* Delete products
* Product search, filtering, and sorting
* Product variant management
* Multiple product image uploads

### 📦 Product Management

* Product creation with:

  * Name
  * Description
  * Pricing
  * Variants
  * Stock information
* Product detail pages
* Variant selection
* Image upload and optimization

### 🛒 Shopping Cart

* Add products to cart
* Update item quantities
* Remove items
* Stock validation
* Dynamic cart calculation
* Cart persistence

### 💳 Payment Integration

* Razorpay payment gateway integration
* Payment verification
* Payment status management
* Secure order creation after successful payment

### 📋 Order Management

* Create orders from cart items
* Retrieve user orders
* Order tracking flow
* Automatic stock reduction after successful order creation

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* Tailwind CSS
* Redux Toolkit
* React Router

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

### Authentication & Services

* JWT Authentication
* Google OAuth
* ImageKit for image management
* Razorpay Payment Gateway

---

## 🏗️ Project Architecture

```
Snitch-Ecommerce
│
├── Frontend
│   ├── Routes
│   ├── Redux Store
│   └── Components
│       ├── UI Components
│       ├── Hooks
│       ├── Redux Slice
│       └── Api Services
│
└── Backend
    ├── Controllers
    ├── Models
    ├── Routes
    ├── Middleware
    └── Services
```

---

## 📸 Screenshots

* Homepage
* <img width="1086" height="1913" alt="screenshot_1782235701994" src="https://github.com/user-attachments/assets/13cb8312-c0ea-4df3-a65a-c8a6c060022e" />

* Sign up page
* <img width="1086" height="574" alt="screenshot_1782236384353" src="https://github.com/user-attachments/assets/b885b5c1-68e1-4e2c-94ba-1885d39dfce6" />

* Product page
* <img width="1086" height="1158" alt="screenshot_1782235838034" src="https://github.com/user-attachments/assets/c81ba908-7abe-41a1-bd26-45dc54b2822d" />

* Seller dashboard
* <img width="1086" height="1268" alt="screenshot_1782236617275" src="https://github.com/user-attachments/assets/dff86378-35d6-4260-88ed-9a466cec398e" />

* Cart page
* <img width="1086" height="875" alt="screenshot_1782235957424" src="https://github.com/user-attachments/assets/66a6ecc4-59b2-4f98-8c69-391b83ee9e53" />

* Orders page
* <img width="1086" height="609" alt="screenshot_1782236192925" src="https://github.com/user-attachments/assets/1096fab5-0c71-4475-98ba-16014afd002e" />

* Razorpay payment gateway
* <img width="1918" height="971" alt="Screenshot 2026-06-23 230337" src="https://github.com/user-attachments/assets/5e1e3026-1c9d-4114-b208-b0ffd8211ec4" />

---


## 🔄 Development Journey

The project was developed incrementally:

1. Built authentication and user management
2. Added seller roles and protected routes
3. Implemented product creation and management
4. Added product variants and inventory handling
5. Developed cart functionality
6. Integrated Razorpay payments
7. Built order processing workflow
8. Added final UI improvements and optimizations

---

## 🎯 Possible Additional Features/Improvements

* Product reviews and ratings
* Wishlist functionality
* Seller analytics dashboard
* Order status updates
* Recommendation system
* Deployment with CI/CD

---

GitHub: https://github.com/ChiragGreed
Live: https://snitch-ecommerce.onrender.com

---

## ⭐ Acknowledgements

Built as a full-stack learning project to explore real-world e-commerce architecture, payment integration, inventory management, and scalable application design.
