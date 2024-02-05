import l from './logger';

export class EnvConfig {
  getFromEnv(key: string): string {
    const value = process.env[key];

    if (!value) {
      const error = new Error(`No ${key} specified`);
      l.error(error);
      throw error;
    } else {
      return value;
    }
  }
}

export const _envConfig = new EnvConfig();
