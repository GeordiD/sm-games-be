import express from 'express';
import passport from 'passport';
import { _userController } from './user.controller';

export default express
  .Router()
  .post('/', _userController.create)
  .post(
    '/login',
    passport.authenticate('login', { session: false }),
    (req, res, next) => _userController.login(req, res, next)
  )
  .post(
    '/login/refresh',
    passport.authenticate('refresh', { session: false }),
    (req, res, next) => _userController.refresh(req, res, next)
  );
