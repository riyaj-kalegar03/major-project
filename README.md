# HostHaven

HostHaven is a web application that allows users to find and book lodges and hotels across various countries. Additionally, users can sign up to add and manage their own hotels on the platform. The project is built using EJS for the frontend, Express.js and Node.js for the backend, MongoDB as the database, and Passport.js for user authentication.

## Features

- **Find and book lodges and hotels** in different countries.
- **User authentication** with signup and login features using Passport.js.
- **Add and manage hotels**: Users can list their own properties.
- **Responsive design** ensuring compatibility with various devices.

## Technologies Used

- **Frontend**: EJS (Embedded JavaScript)
- **Backend**: Express.js, Node.js
- **Database**: MongoDB
- **Authentication**: Passport.js

## Installation and Setup

### Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Git](https://git-scm.com/)

### Steps

1. **Clone the repository**:

   ```
   git clone https://github.com/riyaj-kalegar03/majore-project.git

   cd majore-project
   ```

2. **Install dependencies**:

npm install

3.**Configure environment variables**

Create a .env file in the root directory and add the following:

PORT=3000
MONGODB_URI=your-mongodb-uri
SESSION_SECRET=your-session-secret

4. **Start MongoDB**: Ensure that MongoDB is running on your system.
5. **Start the application**:
   node app.js
   The application will be accessible at http://localhost:8080/listings.

## Usage

-Browse: Visit http://localhost:3000 to view available hotels and lodges.
-Register/Login: Use the signup/login feature to create an account.
-Add Hotel: Once logged in, you can add and manage your own hotels .

## Screenshort

![Homepage](/screenshort/Screenshot%202024-08-27%20101455.png)
![Hotel Details](/screenshort/Screenshot%202024-08-27%20101604.png)
![Hotel Details](/screenshort/Screenshot%202024-08-27%20101616.png)
![Add Hotel](/screenshort/Screenshot%202024-08-27%20101644.png)

## Contributing

We welcome contributions! Feel free to fork this repository, open an issue, or submit a pull request
