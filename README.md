# 🎓 School User Data Application (React Test - 01)

A responsive, role-based school management web portal built with **React 19**, **Vite**, **React Router v7**, and modern CSS. The application supports role-based access control (RBAC) with distinct workflows for **Administrators** and **Students**, complete with input sanitization, dynamic filtering, modal inspection, and simulated client-side password encryption/decryption.

---

## 🚀 Features

### Module 1: Authentication & Form Validation
* **Controlled Components**: Instant two-way state binding with field-level error clearing.
* **Auto-Lowercase Conversion**: Automatically converts uppercase characters to lowercase on the fly.
* **Length Restriction**: Enforces a strict 50-character limit with a live `{length}/50` visual counter.
* **Special Character Sanitization**: Accepts only alphanumeric characters (`a-z`, `0-9`), `@`, and domain dots (`.`), actively rejecting prohibited symbols (`!#$%^&*+=` etc.).
* **One-Click Quick Login**: Preset buttons for instant demo access for both Admin and Student roles.

### Module 2: Role-Based Access Control (RBAC)
* **Protected Routes (`/admin`, `/student`, `/login`)**: Centralized route guards preventing unauthorized URL navigation.
* **Session Persistence**: Initialized lazily via browser `localStorage` across page reloads.

#### 👑 Admin Dashboard (`/admin`)
* **Student Directory Table**: View all registered students, their grades, enrolled subjects, and email addresses.
* **Multi-Filter System**:
  * Real-time search by **Student Name** (case-insensitive substring match).
  * Dynamic dropdown filter by **Enrolled Subject** (extracted dynamically using `Set`).
* **Student Details Popup Modal**:
  * Displays full profile, residential address, subjects, and decrypted password verification.
  * Accessibility: Background scroll lock on `document.body` and `Escape` key close handler with cleanup.

#### 🎓 Student Profile (`/student`)
* **Same-Page Personalized Dashboard**:
  * **Academic Details Card**: Current grade/standard, user role, and enrolled count.
  * **Personal & Contact Card**: Email address, primary language, and address.
  * **Curriculum & Subjects Card**: Clean visual list of registered subject modules.
  * **Security & Encryption Card**: Demonstrates Base64 encoded hash from static JSON and its verified decrypted plaintext password.

---

## 🔑 Demo Credentials

| Role | Email | Password | Base64 Encrypted Hash |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin@gmail.com` | `admin@123` | `YWRtaW5AMTIz` |
| **Student** | `pranav@gmail.com` | `pranav@123` | `cHJhbmF2QDEyMw==` |
| **Student** | `rahul@gmail.com` | `rahul@123` | `cmFodWxAMTIz` |
| **Student** | `priya@gmail.com` | `priya@123` | `cHJpeWFAMTIz` |
| **Student** | `amit@gmail.com` | `amit@123` | `YW1pdEAxMjM=` |

---

## 🛠️ Tech Stack

* **Frontend Framework**: React 19 (Hooks, Functional Components, Lazy State)
* **Routing**: React Router v7 (`BrowserRouter`, `Routes`, `Route`, `Navigate`)
* **Build Tool**: Vite 8
* **Icons**: Lucide React
* **Styling**: Vanilla CSS (Responsive design covering 480px mobile up to 4K ultra-wide monitors)

---

## 📁 Project Structure

```
School/
├── .gitignore
├── README.md
└── frontend/
    ├── package.json
    ├── vite.config.js
    └── src/
        ├── App.jsx                  // App layout & session management
        ├── App.css                  // Responsive stylesheet (mobile to 4K)
        ├── main.jsx                 // Entry point with <BrowserRouter>
        ├── components/
        │   ├── AdminDashboard.jsx   // Admin student directory & filters
        │   ├── Login.jsx            // Login form with validation & quick access
        │   ├── Navbar.jsx           // Responsive navigation bar
        │   ├── ProtectedRoute.jsx   // RBAC route guard
        │   ├── StudentProfile.jsx   // Student dashboard view
        │   └── UserDetailsModal.jsx // Modal dialog with scroll-lock
        ├── data/
        │   └── users.json           // Static user dataset
        ├── routes/
        │   └── AppRoutes.jsx        // Central route definitions
        └── utils/
            └── crypto.js            // Base64 encryption & decryption utils
```

---

## 💻 Getting Started

### Prerequisites
* [Node.js](https://nodejs.org/) (version 18 or higher recommended)
* npm or yarn

### Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Pranav1227/school.git
   cd school
   ```

2. **Navigate into the frontend directory and install dependencies**:
   ```bash
   cd frontend
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`.
