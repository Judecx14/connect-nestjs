import { Injectable } from '@nestjs/common';
import { getAuth } from 'firebase-admin/auth';

@Injectable()
export class AuthService {
  async getEmailUser(uid: string): Promise<string> {
    const result = await getAuth().getUser(uid);

    return Promise.resolve(result.email ?? 'Cesar');
  }
}
