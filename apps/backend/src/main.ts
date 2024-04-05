import express, { Response } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';
import cors from 'cors'; // try

const todoRoutes = express.Router(); // try

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    export interface Request {
      username?: string;
    }
  }
}
// read environment variables from .env file
dotenv.config();
const PORT = process.env.PORT ?? 8002;
const key1 = process.env.SESSION_KEY1;
const key2 = process.env.SESSION_KEY2;

const app = express();
app.use(express.json());

app.use(cors()); // try
app.use(todoRoutes); // try



app.use(
  cookieSession({
    name: 'session',
    keys: [key1!, key2!], 
    secure: true, // Set to true if using HTTPS
    httpOnly: true,
  }),
);

// define root route
app.get('/api/hello', (_, res) => {
  res.json({ message: 'Hello, frontend!' });
});

// listen
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Now listening on port ${PORT}.`);
});

function errorHandler(err : Error, req, res : Response, next) {
  res.status(500).json({ message: err.message });
}

app.use(errorHandler);

mongoose.connect('mongodb://localhost:27017/hw7-edstem-lite-jhayaly'); //go to oh to check on this + mongodb
