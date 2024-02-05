import pino from 'pino';

const streams = [
  { stream: process.stdout },
  // { stream: pino.destination('logs/logger.log') },
];

const l = pino(
  {
    name: process.env.APP_ID,
    level: process.env.LOG_LEVEL,
  },
  pino.multistream(streams)
);

export default l;
