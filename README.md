# Django Todo App

![App Screenshot](https://github.com/user-attachments/assets/389d9ba3-522a-432b-bf1e-e4da5ad43658)

## About

This is a Todo application built with Django for the backend and Vue.js for the frontend. The application uses Pinia for state management, TailwindCSS for styling, and Simple JWT for authentication.

## Features

- User authentication with JWT
- Create and delete tasks
- Mark tasks as complete
- Responsive design with TailwindCSS
- State management with Pinia

## Technologies Used

- **Backend**: Django
- **Frontend**: Vue.js
- **State Management**: Pinia
- **Styling**: TailwindCSS
- **Authentication**: Simple JWT

## Installation

### Backend Setup

1. Clone the repository:
    ```bash
    git clone https://github.com/wsmajt/django-todolist.git
    cd django-todo-app
    ```

2. Create and activate virtual environment:
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows: venv\Scripts\activate
    ```

3. Install the dependencies:
    ```bash
    pip install -r requirements.txt
    ```

4. Apply migrations:
    ```bash
    python manage.py migrate
    ```

5. Create a superuser:
    ```bash
    python manage.py createsuperuser
    ```

6. Run the development server:
    ```bash
    python manage.py runserver
    ```

### Frontend Setup

1. Navigate to the frontend directory:
    ```bash
    cd frontend
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Run the development server:
    ```bash
    npm run dev
    ```

## Usage

1. Open your browser and go to `http://localhost:8000` for the backend and `http://localhost:5173` for the frontend.
2. Register a new user or log in with your credentials.
3. Create and manage your tasks!
