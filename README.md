# MERN Stack Note App

A simple and efficient **Note-taking application** built with the **MERN stack (MongoDB, Express.js, React, Node.js)**. This application allows users to create, update, delete, and organize their notes. It's designed with a user-friendly interface and full CRUD functionality.

## Features

- **User Authentication**: Sign up and log in using secure authentication (JWT).
- **Create, Read, Update, Delete (CRUD) Notes**: Users can add, edit, and delete notes.
- **Real-Time Updates**: The notes update in real-time without needing to refresh the page.
- **Responsive Design**: Works well on both desktop and mobile devices.
- **Search Functionality**: Quickly find notes with a search feature.
- **Rich Text Editor**: Format notes with bold, italic, underline, and other text styling options.

## Technologies Used

### Frontend:
- **React.js**: For building the user interface.
- **Tailwind CSS**: For responsive design and custom styling.
- **Axios**: For API calls.

### Backend:
- **Node.js**: Server-side JavaScript runtime.
- **Express.js**: Web framework for building the API.
- **MongoDB**: NoSQL database to store user data and notes.
- **Mongoose**: ODM library for MongoDB.
- **JWT (JSON Web Tokens)**: For secure authentication.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/note-app.git
   ```

2. Navigate to the project directory:

   ```bash
   cd note-app
   ```

3. Install server dependencies:

   ```bash
   cd backend
   npm install
   ```

4. Install frontend dependencies:

   ```bash
   cd ../frontend
   npm install
   ```

5. Create a `.env` file in the `backend` directory and add the following:

   ```env
   PORT=5000
   MONGO_URI=your_mongo_connection_string
   JWT_SECRET=your_jwt_secret
   ```

6. Run the backend server:

   ```bash
   cd backend
   npm start
   ```

7. Run the frontend:

   ```bash
   cd ../frontend
   npm start
   ```

8. The app will run locally on `http://localhost:3000/` for the frontend and `http://localhost:5000/` for the backend.

## Usage

1. Register a new account or log in with your existing credentials.
2. Start creating notes by clicking on the "Add Note" button.
3. You can edit or delete any of your notes.
4. Use the search bar to filter notes by title or content.

## Contributing

Feel free to submit issues and pull requests. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```

This `README.md` file includes all the essential information, such as the project overview, features, installation steps, technologies used, and instructions on how to run the app. 
