# 🔐 Password Vault

A modern, secure, and responsive **Password Manager** application built with **React**, **Vite**, and **Tailwind CSS**. This application allows users to store, manage, and generate secure passwords locally using the browser's LocalStorage.

![Project Status](https://img.shields.io/badge/Status-Active-brightgreen)
![Tech Stack](https://img.shields.io/badge/Stack-React_TS_Tailwind-blue)

## ✨ Features

* **🔒 Secure Storage:** Data is stored persistently in the browser's LocalStorage.
* **👁️ Show/Hide Password:** Toggle password visibility for security.
* **🎲 Password Generator:** Built-in tool to generate strong, random passwords (12 characters).
* **📋 Copy to Clipboard:** One-click copy functionality for ease of use.
* **🔍 Search & Filter:** Real-time search to find accounts quickly.
* **🗑️ Management:** Easy add and delete functionality.
* **🌙 Dark Mode UI:** Designed with a modern, eye-comfortable dark theme using Tailwind CSS.

## 🛠️ Tech Stack

* **Framework:** [React](https://react.dev/) (via [Vite](https://vitejs.dev/))
* **Language:** TypeScript / JavaScript
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Icons:** Native UTF-8 Emojis & CSS Shapes
* **State Management:** React Hooks (`useState`, `useEffect`)

## 🚀 How to Run Locally

Follow these steps to run the project on your local machine:

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/USERNAME_GITHUB_KAMU/password-vault.git](https://github.com/USERNAME_GITHUB_KAMU/password-vault.git)
    cd password-vault
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Run the Development Server**
    ```bash
    npm run dev
    ```

4.  **Open in Browser**
    Click the link shown in the terminal (usually `http://localhost:5173`).

---

## 🖼️ Screenshot Aplikasi

| Home Screen |
|:---:|
| <img src="https://github.com/Lufasu-Adm/password-vault/blob/main/src/assets/tampilan.png" width="200" alt="Home"> | 

```
## 📂 Project Structure

```bash
password-vault/
├── src/
│   ├── App.tsx       # Main application logic
│   ├── index.css     # Tailwind directives
│   └── main.tsx      # Entry point
├── public/           # Static assets
├── index.html        # HTML template
├── tailwind.config.js
└── package.json
