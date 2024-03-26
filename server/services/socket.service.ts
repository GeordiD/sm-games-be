import { Server } from 'socket.io';
import http from 'http';
import l from '../common/logger';
import { _envConfig } from '../common/envConfig';

export class SocketService {
  private io: Server;

  setup(server: http.Server) {
    this.io = new Server(server, {
      cors: {
        origin: _envConfig.getFromEnv('UI_URL'),
        methods: ['GET', 'POST'],
      },
    });

    this.io.on('connection', async (socket) => {
      const { playerId, roomId } = socket.handshake.query;

      // Guards
      if (!roomId) {
        console.error('no room id specified on connection. disconnecting');
        socket.disconnect();
        return;
      }

      if (typeof roomId !== 'string') {
        console.error('roomId is not a string');
        return;
      }

      if (typeof playerId !== 'string') {
        console.error('playerId is not a string');
        return;
      }

      socket.data.username = playerId;

      // On connection
      socket.join(roomId);
      l.info(`${roomId}: ${playerId} connected`);

      this.notify(roomId, 'roster', {
        roster: [...(await this.whoIsInRoom(socket, roomId)), playerId],
        change: {
          playerId,
          isJoining: true,
        },
      });

      // On disconnection
      socket.on('disconnect', async () => {
        l.info(`${roomId}: ${playerId} disconnected`);
        this.notify(roomId, 'roster', {
          roster: await this.whoIsInRoom(socket, roomId),
          change: {
            playerId,
            isJoining: false,
          },
        });
      });
    });
  }

  private async whoIsInRoom(socket, roomId) {
    const sockets = await socket.in(roomId).fetchSockets();
    return sockets.map((x) => x.data.username);
  }

  notify(roomId: string, eventName: string, payload: unknown) {
    this.io.to(roomId).emit(eventName, payload);
  }
}

export const _socketsService = new SocketService();
