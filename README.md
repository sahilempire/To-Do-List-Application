# To-Do List Application

This is a simple full-stack To-Do List application built with a Python backend (using Flask) and a React frontend. The application allows users to create, update, delete, and mark to-do items as completed. The backend stores data in a SQLite database.

## Features

- **Backend (Flask)**:
  - API endpoints to add, update, retrieve, and delete to-do items.
  - Data is stored in an SQLite database.
  
- **Frontend (React)**:
  - Displays a list of to-do items.
  - Allows adding, editing, deleting, and marking items as completed.
  - Form validation for input fields.

## Requirements

### Backend:
- Python 3.x
- Flask
- SQLite (default database)

### Frontend:
- Node.js
- npm (Node Package Manager)
- React

## Setup Instructions

### 1. Clone the Repository

First, clone the repository to your local machine:

```bash
git clone <repository-url>
cd todo-app
```

### 2. Set Up the Backend (Flask)

#### Install Python Dependencies

Create a virtual environment (optional but recommended):

```bash
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`
```

Install required dependencies:

```bash
pip install -r backend/requirements.txt
```

#### Set Up the Database

The application uses SQLite by default. The database will be automatically created when you first run the backend.

#### Run the Flask Backend

Start the Flask server by running:

```bash
cd backend
flask run
```

The backend API will be accessible at `http://127.0.0.1:5000`.

### 3. Set Up the Frontend (React)

#### Install Node.js Dependencies

Navigate to the frontend directory:

```bash
cd frontend
```

Install the required npm packages:

```bash
npm install
```

#### Run the React Frontend

Start the React development server:

```bash
npm start
```

The React frontend will be accessible at `http://localhost:3000`.

- **Frontend**: Open your browser and navigate to `http://localhost:3000`. You should be able to interact with the to-do list and perform all the CRUD operations (Create, Read, Update, Delete).

## Folder Structure

```
/todo-app
│
├── /backend                # Flask backend
│   ├── /app.py             # Flask app and API endpoints
│   ├── /models.py          # Database models
│   └── /requirements.txt   # Python dependencies
│
└── /frontend               # React frontend
    ├── /public             # Public files
    ├── /src                # React components and source code
    └── /package.json       # NPM dependencies and scripts
```

## Code Quality

- **Comments**: Code is well-commented for clarity.
- **Modularity**: Code is structured to ensure reusability and ease of maintenance.
- **Error Handling**: Basic error handling is implemented both on the frontend and backend.

## UI/UX

- The user interface is simple, clean, and responsive. 
- Form validation ensures users enter valid data when adding or editing to-do items.
- The application adapts to different screen sizes for mobile and desktop use.
