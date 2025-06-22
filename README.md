# Uber-clone
A full-stack Uber-like ride-hailing application built with Node.js, Express, MongoDB, React, and Socket.IO.
## Features

- User and Captain (Driver) registration and authentication
- Real-time ride requests and status updates via Socket.IO
- Location search and suggestions using external map APIs
- Fare calculation based on distance and time
- Ride creation, confirmation, start, and end flows
- JWT-based authentication and token blacklisting for logout
- Responsive frontend with React, Tailwind CSS, and GSAP animations

## Project Structure

```
Backend/
  controllers/
  db/
  middlewares/
  models/
  routes/
  services/
  app.js
  server.js
  socket.js
  package.json
  .env

Frontend/
  public/
  src/
    components/
    context/
    pages/
    App.jsx
    main.jsx
  index.html
  package.json
  .env
  tailwind.config.js
  postcss.config.js
```

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- MongoDB database (Atlas or local)
- API keys for [DistanceMatrix.ai](https://distancematrix.ai/) and [RapidAPI Place Autocomplete](https://rapidapi.com/)

### Backend Setup

1. Navigate to the `Backend` directory:
   ```sh
   cd Backend
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Configure environment variables in `.env`:
   ```
   PORT=5000
   DB_CONNECT=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   MAPS_API=your_rapidapi_key
   DISTANCE_API=your_distancematrix_api_key
   ```

4. Start the backend server:
   ```sh
   node server.js
   ```

### Frontend Setup

1. Navigate to the `Frontend` directory:
   ```sh
   cd Frontend
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Configure environment variables in `.env`:
   ```
   VITE_BASE_URL=http://localhost:5000
   ```

4. Start the frontend development server:
   ```sh
   npm run sachin
   ```

5. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Usage

- Register as a user or captain (driver).
- Users can search for rides, get fare estimates, and request rides.
- Captains receive ride requests in real-time and can accept and start rides.
- Both users and captains can log out securely.

## Technologies Used

- **Backend:** Node.js, Express, MongoDB, Mongoose, Socket.IO, JWT, bcrypt
- **Frontend:** React, React Router, Tailwind CSS, GSAP, Axios, React Toastify, Socket.IO Client
- **APIs:** DistanceMatrix.ai, RapidAPI Place Autocomplete

## License

This project is for educational purposes only.

---

**Author:** Sachin Kumar Tanti
