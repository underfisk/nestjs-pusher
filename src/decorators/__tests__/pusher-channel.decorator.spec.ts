import { PUSHER_CHANNEL } from '../../constants'
import 'reflect-metadata'
import {
  ChannelBuilderMiddleware,
  PusherChannel,
} from '../pusher-channel.decorator'

describe('PusherChannel', () => {
  it('should be defined as "TestChannel" string', () => {
    class Test {
      @PusherChannel('TestChannel')
      myDispatcher() {
        return true
      }
    }
    expect(
      Reflect.getMetadata(PUSHER_CHANNEL, Test.prototype.myDispatcher),
    ).toEqual('TestChannel')
  })

  it('should be defined as an array of multiple channel strings', () => {
    class Test {
      @PusherChannel(['Ch1', 'Ch2'])
      myDispatcher() {
        return true
      }
    }
    expect(
      Reflect.getMetadata(PUSHER_CHANNEL, Test.prototype.myDispatcher),
    ).toEqual(['Ch1', 'Ch2'])
  })

  it('should be defined as a factory', () => {
    const channelFactory: ChannelBuilderMiddleware = (
      _req: any,
      _res: any,
      _eventName: string,
    ) => {
      return 'from-factory'
    }
    class Test {
      @PusherChannel(channelFactory)
      myDispatcher() {
        return true
      }
    }
    expect(
      Reflect.getMetadata(PUSHER_CHANNEL, Test.prototype.myDispatcher),
    ).toEqual(channelFactory)
  })
})
