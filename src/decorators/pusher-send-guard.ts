import { PUSHER_SEND_GUARD } from '../constants'

export type ShouldSendMiddleware<Req = any, Res = any> = (
  req: Req,
  response: Response,
  eventName: string,
) => boolean

/**
 * Decorates the route (requires PusherEvent) to check whether the event should be sent or not conditionally
 * @default true
 * @param middleware
 * @constructor
 */
export function PusherSendGuard(
  middleware: ShouldSendMiddleware,
): MethodDecorator {
  return (
    // eslint-disable-next-line @typescript-eslint/ban-types
    target: object,
    key: string,
    descriptor: TypedPropertyDescriptor<any>,
  ) => {
    Reflect.defineMetadata(PUSHER_SEND_GUARD, middleware, descriptor.value)
    return descriptor
  }
}
