import {
  Strategy as JwtStrategy,
  ExtractJwt,
  StrategyOptions,
} from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';
import passport from 'passport';
import l from './logger';
import { _envConfig } from './envConfig';
import { _authenticationService } from '@/services/authentication.service';
import { _userService } from '@/services/user.service';

export const setupAuth = () => {
  const secret = _envConfig.getFromEnv('JWT_SECRET');

  const options: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secret,
  };

  passport.use(
    new JwtStrategy(options, (token, done) => {
      return done(null, token.user);
    })
  );

  passport.use(
    'admin',
    new JwtStrategy(options, (token, done) => {
      if (!token.user.isAdmin) {
        // Fail
        return done(null, false);
      } else {
        return done(null, token.user);
      }
    })
  );

  passport.use(
    'refresh',
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromBodyField('refreshToken'),
        secretOrKey: secret,
      },
      async (token, done) => {
        const user = await _userService.getUserByEmail(token.user.email);
        if (user) {
          return done(null, user);
        } else {
          l.error('Could not find user during refresh');
          return done(null, false);
        }
      }
    )
  );

  passport.use(
    'login',
    new LocalStrategy(async (username, password, cb) => {
      try {
        const user = await _userService.getUserByEmail(username);

        if (user !== null) {
          const storedPasswordHash = await _userService.getPasswordHash(
            user.id
          );

          if (
            await _authenticationService.checkPassword(
              password,
              storedPasswordHash
            )
          ) {
            // PASS
            l.info(`Login successful: ${username}`);
            cb(null, user);
            return;
          }
        }

        // FAIL
        l.info(`Login unsuccessful: ${username}`);
        cb(null, false);
      } catch (err) {
        l.error(err, `Error on login for user: ${username}`);
        cb(err);
      }
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user as any);
  });
};
