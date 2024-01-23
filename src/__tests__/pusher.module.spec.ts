import { PusherService } from '../pusher.service';
import { Test } from '@nestjs/testing';
import { PusherModule } from '../pusher.module';
import { INestApplication } from '@nestjs/common';

describe('PusherModule', () => {
  // forRoot – legacy use case
  describe('PusherModule.forRoot', () => {
    let app: INestApplication;
    beforeEach(async () => {
      const module = await Test.createTestingModule({
        imports: [
          PusherModule.forRoot({
            appId: 'some-app-id',
            key: 'some-app-key',
            secret: 'some-app-secret',
            cluster: 'us2',
          }),
        ],
      }).compile();
      app = module.createNestApplication();
    });

    it('should configure PusherService', () => {
      const pusherService = app.get<PusherService>(PusherService);
      expect(pusherService).toBeDefined();

      const { appId, token } = pusherService.getPusherInstance()['config'];
      const { key, secret } = token;

      expect(appId).toBe('some-app-id');
      expect(key).toBe('some-app-key');
      expect(secret).toBe('some-app-secret');
    });
  });

  // forRootAsync: () => NestJsPusherAsyncOptions
  describe('PusherModule.forRootAsync with NestJsPusherAsyncOptions', () => {
    let asyncApp: INestApplication;
    beforeEach(async () => {
      const module = await Test.createTestingModule({
        imports: [
          PusherModule.forRootAsync({
            useFactory: () => {
              return {
                options: {
                  appId: 'async-app-id',
                  key: 'async-app-key',
                  secret: 'async-app-secret',
                  cluster: 'us2',
                },
                chunkingOptions: { limit: 1000, enabled: true },
              };
            },
          }),
        ],
      }).compile();
      asyncApp = module.createNestApplication();
    });

    it('should configure PusherService', () => {
      const pusherService = asyncApp.get<PusherService>(PusherService);
      expect(pusherService).toBeDefined();

      const { appId, token } = pusherService.getPusherInstance()['config'];
      const { key, secret } = token;

      expect(appId).toBe('async-app-id');
      expect(key).toBe('async-app-key');
      expect(secret).toBe('async-app-secret');
    });
  });
});
