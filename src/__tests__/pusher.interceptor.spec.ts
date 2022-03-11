import * as request from 'supertest'
import { INestApplication, Logger } from '@nestjs/common'
import { APP_INTERCEPTOR } from '@nestjs/core'
import { Test } from '@nestjs/testing'
import { createSpyObj } from 'jest-createspyobj'

import { PusherInterceptor } from '../pusher.interceptor'
import { PusherModule } from '../pusher.module'
import { PusherService } from '../pusher.service'
import { HelloController } from './hello.module'

describe('PusherInterceptor', () => {
  let pusherService: jest.Mocked<PusherService>
  let app: INestApplication

  beforeEach(async () => {
    pusherService = createSpyObj(PusherService)
    const testingModule = await Test.createTestingModule({
      imports: [
        PusherModule.forRoot({
          appId: 'some-appId',
          key: 'some-key',
          secret: 'some-secret',
          cluster: 'some-cluster',
        }),
      ],
      controllers: [HelloController],
      providers: [
        Logger,
        {
          provide: PusherService,
          useValue: pusherService,
        },
        {
          provide: APP_INTERCEPTOR,
          useClass: PusherInterceptor,
        },
      ],
    }).compile()

    app = testingModule.createNestApplication()
    await app.init()
  })

  describe('@PusherChannel only', () => {
    it('should not send message if method is not decorated with PusherEvent', async () => {
      const res = await request(app.getHttpServer()).get('/hello/channel-only')
      expect(res.text).toBe('Hello, World')
      expect(pusherService.trigger).not.toHaveBeenCalled()
    })
  })

  describe('@PusherChannel + @PusherEvent', () => {
    it('should send message if event name is available', async () => {
      const res = await request(app.getHttpServer()).get(
        '/hello/channel-and-event',
      )
      expect(res.text).toBe('Hello, World')
      expect(pusherService.trigger).toHaveBeenCalledWith(
        'world-channel',
        'greetings',
        'Hello, World',
        undefined,
      )
    })

    it('should retrieve the channel name from builder', async () => {
      const res = await request(app.getHttpServer()).get(
        '/hello/channel-name-builder?channel=yay-my-new-channel',
      )
      expect(res.text).toBe('May the Force be with you')
      expect(pusherService.trigger).toHaveBeenCalledWith(
        'yay-my-new-channel',
        'greetings',
        'May the Force be with you',
        undefined,
      )
    })
  })

  describe('@PusherSocketId', () => {
    it('should use custom socketId header if provided', async () => {
      const res = await request(app.getHttpServer())
        .get('/hello/custom-sid-header')
        .set({
          ['x-custom-sid']: 'custom-sid-123',
        })
      expect(res.text).toBe('Hello, World')
      expect(pusherService.trigger).toHaveBeenCalledWith(
        'world-channel',
        'greetings',
        'Hello, World',
        'custom-sid-123',
      )
    })
    it('should fall back on default socketId header', async () => {
      const res = await request(app.getHttpServer())
        .get('/hello/channel-and-event')
        .set({
          ['x-pusher-sid']: 'pusher-sid-123',
        })
      expect(res.text).toBe('Hello, World')
      expect(pusherService.trigger).toHaveBeenCalledWith(
        'world-channel',
        'greetings',
        'Hello, World',
        'pusher-sid-123',
      )
    })
  })

  describe('@PusherSendGuard', () => {
    it('should send message if send guard returns true', async () => {
      const res = await request(app.getHttpServer()).get(
        '/hello/send-guard?channel=good-people',
      )
      expect(res.text).toBe('Hello, World')
      expect(pusherService.trigger).toHaveBeenCalledWith(
        'world-channel',
        'greetings',
        'Hello, World',
        undefined,
      )
    })
    it('should not send message if send guard returns false', async () => {
      const res = await request(app.getHttpServer()).get(
        '/hello/send-guard?channel=bad-people',
      )
      expect(res.text).toBe('Hello, World')
      expect(pusherService.trigger).not.toHaveBeenCalled()
    })
  })
})
