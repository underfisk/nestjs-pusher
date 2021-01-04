import { PUSHER_SID_FACTORY } from '../../constants'
import 'reflect-metadata'
import {
  PusherSocketId,
  PusherSocketIdFactory,
} from '../pusher-socket-id.decorator'

describe('PusherSocketId', () => {
  it('should be defined as header name', () => {
    class Test {
      @PusherSocketId('headerName')
      myDispatcher() {
        return true
      }
    }
    expect(
      Reflect.getMetadata(PUSHER_SID_FACTORY, Test.prototype.myDispatcher),
    ).toEqual('headerName')
  })
  it('should be defined as a Factory', () => {
    const factory: PusherSocketIdFactory = () => {
      return 'test'
    }
    class Test {
      @PusherSocketId(factory)
      myDispatcher() {
        return true
      }
    }
    expect(
      Reflect.getMetadata(PUSHER_SID_FACTORY, Test.prototype.myDispatcher),
    ).toEqual(factory)
  })
})
