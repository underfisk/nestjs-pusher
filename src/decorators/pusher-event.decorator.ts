import { PUSHER_EVENT } from '../constants';

/**
 * Defers the dispatch of a `Pusher` event on API controller response
 * In order to use this decorator the handler must use PusherChannel decorator to define its target
 */
export function PusherEvent(name: string): MethodDecorator {
  return (
    // eslint-disable-next-line @typescript-eslint/ban-types
    target: object,
    key: string | symbol,
    descriptor: TypedPropertyDescriptor<any>,
  ) => {
    Reflect.defineMetadata(PUSHER_EVENT, name, descriptor.value);
    return descriptor;
  };
}
