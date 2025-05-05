# Backend - Imageer

This document provides an overview of the backend structure for the **Imageer** project. It handles image uploads, deletions, conversions, and integrations with Firebase and Cloudinary.

---

## 🖥️ Backend Overview

The backend of **Imageer** is built with **Express.js** and manages the following tasks:

- Image uploads and storage
- Image format conversion (currently supports over 15 formats)
- Image deletion after 30 days (via **EasyCron** for scheduled tasks)
- Integration with **Firebase** and **Cloudinary** for image hosting
- Server-side management of environment variables via **dotenv**

The backend is deployed on **Vercel**, ensuring efficient scaling and fast deployment.

---

## 🆕 New Features

### 🖼️ Image Format Conversion

Users can now convert uploaded images to a wide range of formats using [**Sharp**](https://sharp.pixelplumbing.com/). The following formats are supported:

- `svg`, `png`, `jpg`, `jpeg`, `jpe`, `gif`, `webp`, `tiff`, `tif`, `avif`, `dz`, `jpx`, `j2k`, `j2c`, `jxl`, `heif`, `heic`, `raw`

### 📤 File Uploads with Multer

The backend uses **Multer** middleware to handle multipart/form-data, enabling efficient and scalable image uploads.

### 🧭 Modular Route Handling

Routes are now organized into a dedicated `/routes/` directory for better maintainability and scalability. Key routes include:

- `convertImages.js`: Handles image format conversion logic.
- `deleteImages.js`: Handles deletion of expired images.

---

## 📁 Backend Folder Structure

```
.
├── api
│   ├── firebase
│   │   └── firebase.js
│   ├── index.js
│   ├── js
│   │   ├── cloudinary
│   │   ├── handleJSON.js
│   │   └── time.js
│   ├── json
│   │   └── imagesOnPendingForDeletion.json
│   ├── routes
│   │   ├── convertImages.js
│   │   └── deleteImages.js
│   └── runImageCleanup.js
├── package.json
├── package-lock.json
├── public
│   └── index.html
├── README.md
├── structure.txt
└── vercel.json
```

---

## ⚙️ Backend Dependencies

The backend uses the following dependencies:

- **express**: A fast and minimalist web framework for Node.js.
- **cloudinary**: For image storage and manipulation.
- **firebase-admin**: Admin SDK for Firebase, used for cloud storage management.
- **dotenv**: Loads environment variables from a `.env` file.
- **cors**: Middleware to enable cross-origin requests.
- **sharp**: High-performance image processing for format conversion.
- **multer**: Middleware for handling file uploads.

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
   cd Imageer-backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up your environment variables in a `.env` file (based on the example above).

4. Set up your [Firebase](https://firebase.google.com/) account and database. See [Firebase documentation](https://firebase.google.com/docs) for more information.

5. Start the backend server:

   ```bash
   vercel dev
   ```

6. The backend will be running on http://localhost:3000.

---

### 🚀 Deployment on Vercel

The backend is deployed on **Vercel** for seamless scaling and continuous deployment. Each push to the repository automatically deploys the latest version to Vercel.

You can view the backend's deployed version and status via the **Vercel dashboard**.

---

### 🚀 Future Enhancements

In the future, the backend can be extended with features like:

- User authentication (for personalized image management)

- Logging and error monitoring (integrating services like Sentry)

- Image resizing (users can specify target width/height or presets)

- Image enhancement (improvements like sharpening, brightness/contrast tuning)

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

This project is open-source and available under the [APACHE 2.0](LICENSE).
