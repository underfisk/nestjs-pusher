import { PUSHER_SID_FACTORY } from '../constants'

export type PusherSocketIdFactory<Req = any> = (req: Req) => string

/**
 * Decorators the function to customize the socket id factory
 * @default Header value (x-pusher-sid)
 * @param factory Either provide the header name or a custom factory function
 */
export function PusherSocketId(
  factory: string | PusherSocketIdFactory,
): MethodDecorator {
  return (
    // eslint-disable-next-line @typescript-eslint/ban-types
    target: object,
    key: string | symbol,
    descriptor: TypedPropertyDescriptor<any>,
  ) => {
    Reflect.defineMetadata(PUSHER_SID_FACTORY, factory, descriptor.value)
    return descriptor
  }
}
