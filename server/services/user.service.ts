import { db } from '@/db/db';
import { User as DbUser } from '@prisma/client';
import { _authenticationService } from './authentication.service';

export type User = Omit<DbUser, 'passwordHash'>;

export class UserService {
  async getUserByEmail(email: string): Promise<User | null> {
    const fullUser = await db.user.findUnique({
      where: {
        email,
      },
    });

    return fullUser ? this.excludePassword(fullUser) : null;
  }

  async getPasswordHash(id: string): Promise<string | undefined> {
    const result = await db.user.findUnique({
      where: {
        id,
      },
      select: {
        passwordHash: true,
      },
    });

    return result?.passwordHash;
  }

  async createUser({ name, email, rawPassword }): Promise<User> {
    const result = await db.user.create({
      data: {
        name,
        email,
        passwordHash: await _authenticationService.saltPassword(rawPassword),
      },
    });
    return this.excludePassword(result);
  }

  private excludePassword(user: DbUser): User {
    const output: User = user;
    delete output['passwordHash'];
    return output;
  }
}

export const _userService = new UserService();
