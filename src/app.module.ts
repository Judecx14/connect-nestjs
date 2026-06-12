import Joi from 'joi';

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { FirebaseModule } from './firebase/firebase.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        // App
        PORT: Joi.number().port().default(3000),
        // Firebase
        FIREBASE_PROJECT_ID: Joi.string().required(),
        FIREBASE_CLIENT_EMAIL: Joi.string().required(),
        FIREBASE_PRIVATE_KEY: Joi.string().required(),
        // Database (PostgreSQL)
        DB_HOST: Joi.string().default('localhost'),
        DB_PORT: Joi.number().port().default(5432),
        DB_NAME: Joi.string().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
      }),
      validationOptions: {
        abortEarly: false,
        allowUnknown: true,
      },
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get<string>('DB_HOST'),
          port: configService.get<number>('DB_PORT'),
          database: configService.get<string>('DB_NAME'),
          username: configService.get<string>('DB_USERNAME'),
          password: configService.get<string>('DB_PASSWORD'),
          autoLoadEntities: true,
          synchronize: true,
        };
      },
    }),
    FirebaseModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
