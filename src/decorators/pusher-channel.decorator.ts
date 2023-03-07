import { PUSHER_CHANNEL } from '../constants'

export type ChannelBuilderMiddleware<Req = any, Res = any> = (
  req: Req,
  res: Res,
  eventName: string,
) => string

/**
 * Decorates a route (required having PusherEvent decorator) by providing the target channel the PusherEvent should send
 */
export function PusherChannel(
  channel: string | string[] | ChannelBuilderMiddleware,
): MethodDecorator {
  return (
    // eslint-disable-next-line @typescript-eslint/ban-types
    target: object,
    key: string | symbol,
    descriptor: TypedPropertyDescriptor<any>,
  ) => {
    Reflect.defineMetadata(PUSHER_CHANNEL, channel, descriptor.value)
    return descriptor
  }
}
