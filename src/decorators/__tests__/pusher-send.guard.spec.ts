import { PUSHER_SEND_GUARD } from '../../constants'
import 'reflect-metadata'
import { PusherSendGuard, ShouldSendMiddleware } from '../pusher-send.guard'

describe('PusherSendGuard', () => {
  it('should be defined', () => {
    const factory: ShouldSendMiddleware = () => {
      return false
    }
    class Test {
      @PusherSendGuard(factory)
      myDispatcher() {
        return true
      }
    }
    expect(
      Reflect.getMetadata(PUSHER_SEND_GUARD, Test.prototype.myDispatcher),
    ).toEqual(factory)
  })
})
