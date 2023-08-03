import express, { Request, Response } from 'express';
const router = express.Router();

/* GET books listing */
router.get('/books', async (req: Request, res: Response, next: any) => {
  res.json({ title: 'I am a cat.' });
});

export default router;
