import { Namespace, Server } from 'socket.io';
import http from 'http';
import l from '../common/logger';
import { _envConfig } from '../common/envConfig';

export class SocketService {
  private io: Server;
  
  setup(server: http.Server) {
    this.io = new Server(server, {
      cors: {
        origin: _envConfig.getFromEnv('UI_URL'),
      },
    });

    const userId = Math.floor(Math.random() * 1000);

    this.io.on('connection', (socket) => {
      socket.on('join', (roomId) => {
        socket.join(roomId);
        l.info(`user#${userId} joined ${roomId}`)
      })

      l.info(`user#${userId} connected`);

      socket.on('disconnect', () => {
        l.info(`user#${userId} disconnected`);
      });
    });
  }

  notify(roomId: string, eventName: string, payload: unknown) {
    this.io.to(roomId).emit(eventName, payload);
  }
}

export const _socketsService = new SocketService();
