import express from 'express';
import { _examplesController } from './examples.controller';

export default express
  .Router()
  // .post('/', _examplesController.create)
  .get('/', _examplesController.all)
  // .get('/:id', _examplesController.byId);
