jest.mock('pusher', () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const Pusher = require('pusher-js-mock').PusherMock
  return Pusher
})
import { PusherService } from '../pusher.service'
import { Logger } from '@nestjs/common'
import Pusher from 'pusher'


describe('PusherService', () => {
  const logger = new Logger()
  const defaultOptions: Pusher.Options = {
    appId: '',
    cluster: '',
    host: '',
    key: '',
    secret: '',
  }

  it('should create with chunking', () => {})

  it('should create with direct dispatch', async () => {
    const service = new PusherService(logger, defaultOptions, {
      limit: 0,
      enabled: false,
    })
    const pusherSpy = jest
      .spyOn(service.getPusherInstance(), 'trigger')
      .mockResolvedValue(true)
    await expect(
      service.trigger('test', 'user-created', { name: 'John Doe' }),
    ).resolves.toEqual(true)
    expect(pusherSpy).toHaveBeenCalledTimes(1)
  })

  it('should throw warning if limit is more than 10 MB', () => {
    const loggerSpy = jest.spyOn(logger, 'warn')
    const service = new PusherService(logger, defaultOptions, {
      limit: 11000,
      enabled: true,
    })
    expect(service).toBeDefined()
    expect(loggerSpy).toHaveBeenCalledTimes(1)
  })

  it('should return Pusher instance', () => {
    const service = new PusherService(logger, defaultOptions, {
      limit: 5000,
      enabled: true,
    })
    expect(service.getPusherInstance()).toBeInstanceOf(Pusher)
  })
})
