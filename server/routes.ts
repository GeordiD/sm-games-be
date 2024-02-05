import { Application } from 'express';
import examplesRouter from '@/controllers/examples/examples.router';
import usersRouter from '@/controllers/users/user.router';

export default function routes(app: Application): void {
  app.use('/api/v1/examples', examplesRouter);
  app.use('/api/v1/users', usersRouter);
}
