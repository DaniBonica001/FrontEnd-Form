# React Authentication App🔐

This is a simple authentication app built using React, Vite, and React Hook Form for the frontend, and backed by an AWS ECS-deployed backend. The project provides a foundation for implementing user authentication features, including login and sign-up functionalities.

## Features 👩‍💻

- **User Authentication:**
  - Allow users to sign up and log in securely.
  - Simple form validation using React Hook Form.

- **Frontend Technologies:**
  - React and Vite for a fast and efficient development experience.
  - Axios for handling HTTP requests.
  - React Hook Form for form state management.

- **Backend:**
  - The backend is deployed on AWS ECS.

## Getting Started ✨

### Prerequisites ⬅️

- Node.js and npm installed on your machine.

### Installation 💻

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/react-authentication-app.git
   cd react-authentication-app
2. **Install dependencies:**
   ```bash
   npm install

### Configuration ⚙️
1. Open the **.env** file in the root of the project.
2. Configure the backend API endpoint:
   ```bash
    VITE_CONNECCTION_STRING=https://your-aws-ecs-api-endpoint.com

## Development 💻
- Run the development server:
  ```bash
  npm run dev
- Build for production:
   ```bash
   npm run build

## Deployment 🌐
The frontend is deployed on Vercel. Visit this Link to access the live application.

## Usage
1. **Login:**
    - Enter your username and password.
    - Click the "Ingresar" button.
2. **Sign-Up:**
    - Navigate to the registration page by clicking the "Registrar" button.
    - Fill in the required information.
    - Click the "Registrar" button.
