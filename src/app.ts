import express, { Request, Response, NextFunction, Application } from 'express';
import 'dotenv/config';

const PORT = process.env.PORT ?? 8000;
const NAME = process.env.NAME ?? '';

const app: Application = express();

app.set('view engine', 'pug');
app.set('views', './views');

app.use('/assets', express.static('public/assets/'));
app.use(express.static('public/'));

app.use((req: Request, res: Response, next: NextFunction): void => {
  res.locals.title = process.env.NAME_READABLE;
  return next();
});
app.get('/', (req: Request, res: Response): void => {
  return res.render('home/index');
});

app.listen(PORT, (): void => {
  console.log(`${NAME} started on ${new Date(Date.now()).toISOString()} | port:${PORT}`);
});
