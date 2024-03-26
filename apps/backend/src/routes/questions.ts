import express from 'express';
import requireAuth from '../middlewares/require-auth'
import Question from '../models/question';

const router = express.Router();

router.get('/questions', async (req, res, next) => {
    try  {
        const questions = await Question.find();
        return res.status(200).json(questions);
    } catch (err) {
        next(err);
    }
});

router.post('/add', requireAuth, async (req, res, next) => {
    const questionText = req.body;
    const author = req.session?.username;
    try {
        const newQuestion = new Question({ questionText, author });
        await newQuestion.save();
        res.status(201).json({ message: 'Question added', question: newQuestion });
    } catch (err) {
        next(err);
    }
});

router.post('/answer', requireAuth, async (req, res, next) => {
    const {questionText, answer, author, _id} = req.body;
    try {
        const question = await Question.findOne({ _id : _id});
        question!.answer = answer;
        await question!.save();
        return res.status(201).json({ message: 'Question answered', question: question });
    } catch (err) {
        next(err);
    }
});