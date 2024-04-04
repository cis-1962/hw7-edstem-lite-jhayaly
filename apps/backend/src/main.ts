import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';

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
const PORT = process.env.PORT ?? 8000;

const app = express();
app.use(express.json());

app.use(
  cookieSession({
    name: 'session',
    keys: [],
    // add options if needed
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

function errorHandler(err, req, res) {
  res.status(500).json({ message: err });
}

app.use(errorHandler);

mongoose.connect('mongodb://localhost:27017/hw7-edstem-lite-jhayaly'); //go to oh to check on this + mongodb
