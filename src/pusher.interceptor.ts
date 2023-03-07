import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common'
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql'
import { Reflector } from '@nestjs/core'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'
import { PusherService } from './pusher.service'
import {
  PUSHER_CHANNEL,
  PUSHER_EVENT,
  PUSHER_SEND_GUARD,
  PUSHER_SID_FACTORY,
} from './constants'
import { ShouldSendMiddleware } from './decorators/pusher-send.guard'

/**
 * Intercepts the HTTP response and dispatches the pusher-event with the custom decorators
 * Binding this decorator globally will run just fine, PusherInterceptor checks whether the HTTP method supports or not
 * pusher events and skip normally if its not supported
 */
@Injectable()
export class PusherInterceptor implements NestInterceptor {
  private readonly logger = new Logger(PusherInterceptor.name)
  constructor(
    private readonly reflector: Reflector,
    private readonly pusherService: PusherService,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const eventName = this.reflector.get(PUSHER_EVENT, context.getHandler())

    let request = context.switchToHttp().getRequest()
    let response = context.switchToHttp().getResponse()
    if (context.getType<GqlContextType>() === 'graphql') {
      const ctx = GqlExecutionContext.create(context)
      request = ctx.getContext().req
      response = ctx.getContext().res
    }
    return next.handle().pipe(
      tap((data) => {
        // If the method is not decorated with PusherEvent, skip
        if (!eventName) {
          return data
        }

        const sendGuard = this.reflector.get<ShouldSendMiddleware>(
          PUSHER_SEND_GUARD,
          context.getHandler(),
        )
        const channelMetadata = this.reflector.get(
          PUSHER_CHANNEL,
          context.getHandler(),
        )
        const socketIdFactory = this.reflector.get(
          PUSHER_SID_FACTORY,
          context.getHandler(),
        )
        // If guard does not allow to proceed, return data normally
        if (sendGuard && !sendGuard(request, data, eventName)) {
          return data
        }

        if (!channelMetadata) {
          this.logger.warn(
            `PusherChannel not found for handler: ${
              context.getHandler().name
            } at event: ` + eventName,
          )
          return data
        }

        let channelName = channelMetadata
        // If its a channel builder then we need to invoke it
        if (typeof channelMetadata === 'function') {
          channelName = channelMetadata(request, data, eventName)
        }
        const socketId = socketIdFactory
          ? typeof socketIdFactory === 'string'
            ? request.headers[socketIdFactory]
            : socketIdFactory(request)
          : (request.headers['x-pusher-sid'] as string)

        if (process.env.PUSHER_DEBUG) {
          this.logger.log(`${eventName} has been dispatched to ${channelName} `)
        }
        this.pusherService.trigger(channelName, eventName, data, socketId)
      }),
    )
  }
}
