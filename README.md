**SmartNotes – Secure & Responsive Note-Taking App**

SmartNotes is a fully responsive note-taking web application built using the MERN stack. It allows users to securely create, edit, delete, sort, and search their notes.\
The application uses JWT-based authentication to ensure that only authorized users can access and manage their notes.

**Features**

**User Authentication**: Secure login and registration using JSON Web Tokens (JWT).\
**Note Management**: Create, read, update, and delete notes.\
**Sorting & Searching**: Easily sort and search through notes.\
**Responsive Design**: Optimized for various screen sizes using Material UI.

**Technologies Used**

**Frontend**: React.js, Material UI\
**Backend**: Node.js, Express.js\
**Database**: MongoDB\
**Authentication**: JWT (JSON Web Token)

**Installation**

1.Clone the repository:\
**git clone https://github.com/nihal76/Notes**

2.Navigate to backend Server inside Project Directory and install backend dependencies:\
**cd Server\
npm install**

3.Navigate to Frontend inside Project Directory and install frontend dependencies:\
**cd ..\
cd Client\
npm install**

4.Configure Environment Variables:\
**Create a .env file in the server directory and add your MongoDB connection string and JWT secret:\
MONGO_URI=your_mongodb_connection_string\
JWT_SECRET=your_jwt_secret_key\
PORT=5000**

Usage

Start the backend Server\
**cd Server\
node index.js**

Start the frontend development Server\
**cd Client\
npm run dev**



