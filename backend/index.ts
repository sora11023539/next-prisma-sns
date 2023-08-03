import express, { Application, Request, Response } from 'express';

const app: Application = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/books', async (req: Request, res: Response, next: any) => {
  res.json({ title: 'I am a cat.' });
});

app.listen(PORT);
