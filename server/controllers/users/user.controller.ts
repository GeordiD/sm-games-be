import { _jwtService } from '@/services/jwt.service';
import { User, _userService } from '@/services/user.service';
import { Request, Response, NextFunction } from 'express';

export interface LoginRequest extends Request {
  user: User;
}

export class UserController {
  login(_req: Request, res: Response, next: NextFunction): void {
    try {
      const user = _req['user'] as User;

      const payload = {
        user: this.buildJwtUser(user),
      };

      const token = _jwtService.signJwt(payload);
      const refreshToken = _jwtService.signRefreshToken(payload);

      res.json({
        token,
        refreshToken,
        user,
      });
    } catch (err) {
      next(err);
    }
  }

  refresh(_req: Request, res: Response, _next: NextFunction): void {
    try {
      const user = _req['user'] as User;

      const payload = {
        user: this.buildJwtUser(user),
      };

      const token = _jwtService.signJwt(payload);

      res.json({
        token,
        user,
      });
    } catch (err) {
      _next(err);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        res.status(400).send();
        return;
      }

      const result = await _userService.createUser({
        name,
        email,
        rawPassword: password,
      });

      res.json(result);
    } catch (err) {
      next(err);
    }
  }

  private buildJwtUser(user: User) {
    return {
      id: user.id,
      email: user.email,
      isAdmin: false,
    };
  }
}

export const _userController = new UserController();
