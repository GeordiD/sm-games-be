import { _socketsService } from '@/services/socket.service';
import { Request, Response } from 'express';

export class SocketsController {
  sendUpdate(req: Request, res: Response): void {
    const { eventName, payload } = req.body as {
      eventName: string;
      payload: unknown;
    };

    _socketsService.notify(req.params.roomId, eventName, payload);

    res.status(200).send();
  }

  // connect(req: Request, res: Response): void {
  //   const {
  //     roomId
  //   } = req.body as {
  //     roomId: string,
  //     }

  //   _socketsService.connectToRoom(roomId);

  //   res.status(200).send();
  // }
}

export const _socketsController = new SocketsController();
