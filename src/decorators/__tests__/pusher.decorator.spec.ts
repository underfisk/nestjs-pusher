import { PusherEvent } from '../pusher-event.decorator'
import { PUSHER_EVENT } from '../../constants'
import 'reflect-metadata'

describe('PusherEvent', () => {
  it('should be defined', () => {
    class Test {
      @PusherEvent('test')
      myDispatcher() {
        return true
      }
    }
    expect(
      Reflect.getMetadata(PUSHER_EVENT, Test.prototype.myDispatcher),
    ).toEqual('test')
  })
})
