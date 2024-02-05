import bcrypt from 'bcryptjs';

export class AuthenticationService {
  async saltPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  async checkPassword(
    testPassword: string,
    currentPassword: string | null | undefined
  ): Promise<boolean> {
    if (!currentPassword) return false;
    return await bcrypt.compare(testPassword, currentPassword);
  }
}

export const _authenticationService = new AuthenticationService();
