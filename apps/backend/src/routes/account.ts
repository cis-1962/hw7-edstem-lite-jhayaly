import express from 'express';
import User from '../models/user';
import requireAuth from '../middlewares/require-auth';

const router = express.Router();

router.post('/signup', async (req, res, next) => {
  const { username, password } = req.body;
  try {
    // stuff seems to be breaking here!
    const userExists = await User.findOne(username);
    if (userExists) {
      return res.status(409).json({ message: 'Username exists!' });
    } else {
      const newAcc = new User({ username, password });
      await newAcc.save();
      return res.status(201).json({ message: 'User created!' });
    }
  } catch (err) {
    console.log("made it to signup but had error");
    next(err);
  }
});

router.post('/login', async (req, res, next) => {
    console.log("made it to login");
  const { username, password } = req.body;
  try {
    const currUser = await User.findOne(username);
    if (!currUser) {
      return res.status(409).json({ message: 'Username invalid!' });
    } else if (currUser.password !== password) {
      return res.status(409).json({ message: 'Incorrect password!' });
    } else {
      req.session!.user = currUser;
      return res.status(201).json({ message: 'Logged in' });
    }
  } catch (err) {
    next(err);
  }
});

router.post('/logout', requireAuth, async (req, res, next) => {
  try {
    req.session!.user = null;
    return res.status(201).json({ message: 'Logged out' });
  } catch (err) {
    next(err);
  }
});

router.get('/loggedin', (req, res) => {
    return req.session && req.session.user ? res.json({ loggedIn: true }) : res.json({ loggedIn: false });
});

export default router