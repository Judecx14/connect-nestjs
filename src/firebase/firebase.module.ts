import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { App, cert, getApps, initializeApp } from 'firebase-admin';

const APP_DEFAULT_NAME = '[DEFAULT]';
export const DI_TOKEN_FIREBASE_ADMIN = 'FIREBASE_ADMIN';

@Module({})
export class FirebaseModule {
  static forRoot(): DynamicModule {
    return {
      module: FirebaseModule,
      global: true,
      providers: [
        {
          provide: DI_TOKEN_FIREBASE_ADMIN,
          useFactory: (config: ConfigService) => {
            const app: App | undefined = getApps().find(
              ({ name }) => name === APP_DEFAULT_NAME,
            );

            if (app) return app;

            return initializeApp({
              credential: cert({
                projectId: config.get<string>('FIREBASE_PROJECT_ID'),
                privateKey: config.get<string>('FIREBASE_PRIVATE_KEY'),
                clientEmail: config.get<string>('FIREBASE_CLIENT_EMAIL'),
              }),
            });
          },
          inject: [ConfigService],
        },
      ],
      exports: [DI_TOKEN_FIREBASE_ADMIN],
    };
  }
}
