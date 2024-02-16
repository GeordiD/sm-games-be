import { _socketsController } from '@/controllers/sockets/sockets.controller';
import express from 'express';

export default express.Router().post('/:roomId', _socketsController.sendUpdate);
