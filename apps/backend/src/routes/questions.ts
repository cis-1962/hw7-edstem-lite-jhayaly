import express from 'express';
import requireAuth from '../middlewares/require-auth';
import Question from '../models/question';
//import * as gpt from 'gpt_package'; //this will work when it is installed

const router = express.Router();

router.get('/questions', async (req, res, next) => {
  try {
    const questions = await Question.find();
    return res.status(200).json(questions);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

router.post('/add', requireAuth, async (req, res, next) => {
  const { questionText } = req.body;
  const actualAuthor = req.session?.user.email;
  try {
    //const gptAnswer = gpt.processQuestion(questionText) || 'GPT-4 has no answer to your question!';
    const category = req.query.category || '';
    const newQuestion = new Question({ questionText: questionText.text, title: questionText.title, 
      author: actualAuthor, gptAnswer: '', category: category,  answers: []});
    await newQuestion.save();
    res.status(201).json({ message: 'Question added', question: newQuestion });
  } catch (err) {
    next(err);
  }
});

router.post('/answer', requireAuth, async (req, res, next) => {
  const { answer, _id } = req.body;

  try {
    const question = await Question.findOne({ _id: _id });
    if (question) {
      question!.answers!.push(answer);
      await question!.save();
      return res.status(201).json({ message: 'Question answered', question: question });
    }
  } catch (err) {
    next(err);
  }
});

router.post('/delete', requireAuth, async (req, res, next) => {
  const { _id } = req.body;

  try {
    const question = await Question.findOne({ _id: _id });
    if (question) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (question as any)!.remove();
      res.status(201).json({ message: 'Question deleted', question: question });
    }
  } catch (err) {
    next(err);
  }
});

export default router;