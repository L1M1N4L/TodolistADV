# TodoList App

A simple yet powerful Todo application built with React and Vite. Manage your tasks efficiently with this intuitive interface.

Live demo: [https://todolist-adv.vercel.app/](https://todolist-adv.vercel.app/)

## 📋 Features

- Create, read, update, and delete tasks
- User authentication (signup, login)
- Responsive design for mobile and desktop
- Firebase integration for data persistence
- Clean and intuitive UI

## 🛠️ Tech Stack

- React.js
- Vite
- Firebase (Authentication & Database)
- CSS for styling

## 📁 Project Structure

```
├── node_modules
├── public
├── src
│   ├── assets
│   │   └── react.svg
│   ├── firebase
│   │   └── firebase.js
│   ├── pages
│   │   ├── LandingPage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── SignupPage.jsx
│   │   └── TodoApp.jsx
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── .eslintrc.js
├── index.html
├── package-lock.json
├── package.json
├── README.md
└── vite.config.js
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14.0.0 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/todolist-app.git
   cd todolist-app
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Configuring Your Own Firebase Database

**Note:** The default Firebase account is the author's personal account. It's highly recommended to use your own Firebase project for development or production use.

If you want to use your own Firebase database instead of the default one, follow these steps:

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication and Firestore/Realtime Database
3. Navigate to `src/firebase/firebase.js` and replace the existing configuration with your own:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID"
};
```

The default configuration is:

```javascript
const firebaseConfig = {
  apiKey: "MYAPIKEY",
  authDomain: "MYAUTHDOMAIN",
  projectId: "MYPROJECTID3",
  storageBucket: "MYSTORAGEBUCKET",
  messagingSenderId: "MYSENDERID,
  appId: "MYAPPID",
  measurementId: "MYMEASUREMENTID"
};
```

## 🔧 Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the app for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check code quality

## 📱 Usage

1. Register a new account or log in with existing credentials
2. Add new todos using the input field
3. Mark todos as completed by clicking on them
4. Delete todos using the delete button
5. Log out when you're done

## 🚢 Deployment

This project is already deployed on Vercel at [https://todolist-adv.vercel.app/](https://todolist-adv.vercel.app/)

## ⚠️ Note on Code Quality

This project was created as a learning exercise and the code may not follow best practices for production applications. Contributions to improve code quality are not necessary unless they address functional issues.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Contact

If you have any questions or suggestions, please open an issue on GitHub.

---

Made with ❤️ using React and Vite
