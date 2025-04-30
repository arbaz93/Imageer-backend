# Backend - Imageer

This document provides an overview of the backend structure for the **Imageer** project. It handles image uploads, deletions, and integrations with Firebase and Cloudinary.

---

## 🖥️ Backend Overview

The backend of **Imageer** is built with **Express.js** and manages the following tasks:

- Image uploads and storage
- Image deletion after 30 days (via **EasyCron** for scheduled tasks)
- Integration with **Firebase** and **Cloudinary** for image hosting
- Server-side management of environment variables via **dotenv**

The backend is deployed on **Vercel**, ensuring efficient scaling and fast deployment.

---

## 📁 Backend Folder Structure


### Explanation of Key Directories/Files

- **`/api/`**: Contains all the API logic for the backend, including routes and integration with Firebase and Cloudinary.
  
  - **`firebase/`**: Houses Firebase initialization and configurations.
  
  - **`js/`**: Contains utility functions for handling image processing, Cloudinary operations, and time-related tasks.
  
  - **`json/`**: Stores files used for tracking images that are pending deletion (e.g., `imagesOnPendingForDeletion.json`).
  
  - **`runImageCleanup.js`**: This script is responsible for checking which images have exceeded the 30-day retention period and should be deleted.
  
- **`vercel.json`**: Vercel configuration file to set up deployment options, routes, and environment variables.

---

## ⚙️ Backend Dependencies

The backend uses the following dependencies:

- **express**: A fast and minimalist web framework for Node.js.
- **cloudinary**: For image storage and manipulation.
- **firebase-admin**: Admin SDK for Firebase, used for cloud storage management.
- **dotenv**: Loads environment variables from a `.env` file.
- **cors**: Middleware to enable cross-origin requests.

---

## 🕹️ Cron Job - EasyCron

The cron job for periodically cleaning up expired images is managed by **EasyCron**. This service is configured to run every hour to check if any images' time has expired and need deletion.

If you'd like access to **EasyCron** or need help setting up your own cron job, feel free to [contact me](mailto:yousafarbaz.dev@gmail.com).

---

## 📝 Environment Variables

Ensure that the following environment variables are set in your `.env` file for proper configuration:

```
CLOUD_NAME=<your-cloudinary-cloud-name> 
API_KEY=<your-cloudinary-api-key> 
API_SECRET=<your-cloudinary-api-secret>
FIREBASE_KEY=<your-firebase-config> 
```


---

## 🕹️ Running the Backend Locally

To run the backend locally:

1. Clone the repository:

   ```bash
   git clone https://github.com/arbaz93/Imageer-backend.git
2. Install dependencies:
    ```bash
    npm install
3. Set up your environment variables in a .env file (based on the example above).
4. Start the backend server.
    ```bash
    node api/index.js
5. The backend will be running on http://localhost:5000.


### 🚀 Deployment on Vercel

The backend is deployed on **Vercel** for seamless scaling and continuous deployment. Each push to the repository automatically deploys the latest version to Vercel.

You can view the backend's deployed version and status via the **Vercel dashboard**.

---

### 🚀 Future Enhancements

In the future, the backend can be extended with features like:

- Image format conversion (e.g., PNG to JPG)
- User authentication (for personalized image management)
- Logging and error monitoring (integrating services like Sentry)

---

### 🧑‍💻 Contributing to the Backend

If you'd like to contribute to the backend:

1. Fork the repository
2. Create a new branch (`git checkout -b feature-name`)
3. Make your changes
4. Commit and push your changes
5. Open a pull request

---

### 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---

### What's New in This Update:

1. **EasyCron Integration**: Added information about using EasyCron for managing periodic tasks.
2. **Vercel Deployment**: Clarified that the server is deployed on Vercel.
3. **File Structure**: Updated with the exact file structure you provided.
4. **Contact Info**: Added a note to contact you for EasyCron access.
