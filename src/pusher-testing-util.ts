import { Logger, Provider } from '@nestjs/common'
import { PusherService } from './pusher.service'

/**
 * Testing provider for PusherService
 */
export const PusherServiceTestingProvider: Provider = {
  provide: PusherService,
  useValue: new PusherService(
    new Logger(),
    { appId: '', cluster: '', host: '', key: '', secret: '' },
    { limit: 0, enabled: false },
  ),
}
