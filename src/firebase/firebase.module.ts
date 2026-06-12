import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { App, cert, getApps, initializeApp } from 'firebase-admin';
import { Auth, getAuth } from 'firebase-admin/auth';
import { FIREBASE_AUTH } from './di/token';

const APP_DEFAULT_NAME = '[DEFAULT]';
const FIREBASE_ADMIN = 'FIREBASE_ADMIN';

@Global()
@Module({
  providers: [
    {
      provide: FIREBASE_ADMIN,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const app: App | undefined = getApps().find(
          ({ name }) => name === APP_DEFAULT_NAME,
        );

        if (app) return app;

        return initializeApp({
          credential: cert({
            projectId: configService.get<string>('FIREBASE_PROJECT_ID'),
            privateKey: configService.get<string>('FIREBASE_PRIVATE_KEY'),
            clientEmail: configService.get<string>('FIREBASE_CLIENT_EMAIL'),
          }),
        });
      },
    },
    {
      inject: [FIREBASE_ADMIN],
      provide: FIREBASE_AUTH,
      useFactory: (app: App): Auth => getAuth(app),
    },
  ],
  exports: [FIREBASE_AUTH],
})
export class FirebaseModule {}
