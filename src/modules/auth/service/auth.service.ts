import { Inject, Injectable } from '@nestjs/common';

import { Auth } from 'firebase-admin/auth';
import { FIREBASE_AUTH } from '../../../firebase/di/token';

@Injectable()
export class AuthService {
  constructor(@Inject(FIREBASE_AUTH) private readonly firebaseAuth: Auth) {}

  async getEmailUser(uid: string): Promise<string> {
    const result = await this.firebaseAuth.getUser(uid);

    return Promise.resolve(result.email ?? '');
  }
}
