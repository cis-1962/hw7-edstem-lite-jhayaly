/* eslint-disable no-console */
import express, { Response } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import session from 'express-session';
import MongoDBStore from 'connect-mongodb-session';
import accountRouter from './routes/account';
import questionRouter from './routes/questions';

const app = express();
app.use(express.json());

dotenv.config();
const PORT = process.env.PORT ?? 8002;
const key1 = process.env.SESSION_KEY1;

mongoose.connect('mongodb+srv://jhayaly:otYJmzQ19fKp5FQS@miniedcluster.udlqfp8.mongodb.net/')
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

const MongoDBStoreInstance = MongoDBStore(session);
const store = new MongoDBStoreInstance({
  uri: 'mongodb+srv://jhayaly:otYJmzQ19fKp5FQS@miniedcluster.udlqfp8.mongodb.net/', 
  collection: 'sessions' 
});

app.use(session({
  secret: key1 ?? 'janas-secret-key', 
  resave: false,
  saveUninitialized: false,
  store: store, 
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 
  }
}));

app.use(cors({
  origin: 'http://localhost:3002', 
  credentials: true 
}));

app.use('/api/account', accountRouter);
app.use('/api/questions', questionRouter);

function errorHandler(err: Error, req: express.Request, res: Response) {
  res.status(500).json({ message: err.message });
}
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Now listening on port ${PORT}.`);
});
