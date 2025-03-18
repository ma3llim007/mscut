# URL Shortener API – Scalable & Secure

## Overview

The URL Shortener API is a backend service that enables users to shorten URLs, track clicks, generate QR codes, and manage authentication. Built with Node.js, Express.js, and MongoDB, this API provides an efficient way to manage and analyze URL usage.

## Features

- Shorten URLs – Convert long URLs into short, shareable links
- Custom Aliases – Users can define custom short URLs
- QR Code Generation – Generate QR codes for any shortened URL
- Click Tracking – Log visits, including device & location data
- User Authentication – Secure login, registration & session management
- Comprehensive URL Management – CRUD operations for URLs

## Technologies Used

- **Backend** – Node.js, Express.js
- **Database** – MongoDB (Mongoose ORM)
- **Authentication** – JWT (JSON Web Tokens)
- **Short URL Generation** – nanoid
- **Device Tracking** – ua-parser-js
- **QR Code Generation** – qrcode

## **Installation**

1. Clone the repository:

    ```bash
    https://github.com/ma3llim007/mscut.git
    ```

2. Navigate to the backend directory:

    ```bash
    cd backend
    ```

3. Install dependencies:

    ```bash
    yarn
    ```

4. Set up environment variables:

    ```bash
    cp .env.sample .env
    ```

    Update `.env` file with database URI and other configurations.

5. Start the frontend server:
    ```bash
    yarn start
    ```
    This will start the development server and open the project in your default browser at `http://localhost:8000`.

## 🔗 API Endpoints

### **🔐 Authentication**

| Method | Endpoint             | Description          |
| ------ | -------------------- | -------------------- |
| POST   | `/api/auth/register` | Register a new user  |
| POST   | `/api/auth/login`    | Login a user         |
| POST   | `/api/auth/logout`   | Logout a user        |
| GET    | `/api/auth/session`  | Check user session   |
| PATCH  | `/api/auth/password` | Change user password |

### **🔗 URL Management**

| Method | Endpoint          | Description                        |
| ------ | ----------------- | ---------------------------------- |
| POST   | `/api/url`        | Create a short URL                 |
| GET    | `/api/url/:urlId` | Get a specific URL by ID           |
| PATCH  | `/api/url/:urlId` | Edit a short URL                   |
| DELETE | `/api/url/:urlId` | Delete a short URL                 |
| GET    | `/api/url/user`   | Get all URLs of authenticated user |

### **📊 Click Tracking**

| Method | Endpoint            | Description                      |
| ------ | ------------------- | -------------------------------- |
| POST   | `/api/click`        | Track a click on a shortened URL |
| GET    | `/api/click/:urlId` | Get click analytics for a URL    |

## **Development**

To contribute to this project:

1. **Clone the repository**:

    ```bash
    git clone https://github.com/ma3llim007/mscut.git
    ```

2. **Create a new branch** for your feature or fix:

    ```bash
    git checkout -b feature/your-feature-name
    ```

3. **Make your changes** and **commit** them:

    ```bash
    git add .
    git commit -m "Describe your changes here"
    ```

4. **Push your changes** to GitHub:

    ```bash
    git push origin feature/your-feature-name
    ```

5. **Open a pull request** on GitHub and describe your changes.

## **Contribution Guidelines**

- Follow the project's folder structure.
- Ensure code is **clean and well-documented**.
- Submit detailed **pull requests** with clear descriptions.
- Report **bugs or suggestions** via GitHub Issues.

## **License**

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.

## Acknowledgements

- **Node.js & Express.js** – Scalable and efficient backend development
- **MongoDB & Mongoose** – Flexible and powerful database management
- **JWT Authentication** – Secure user authentication and session handling
- **nanoid** – Fast and secure short URL generation
- **ua-parser-js** – Device and browser tracking for analytics
- **qrcode** – QR code generation for easy sharing
- **Open-source community** – Inspiration and support from developers worldwide
