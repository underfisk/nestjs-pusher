import { Controller, Get } from '@nestjs/common'

import {
  PusherChannel,
  PusherEvent,
  PusherSendGuard,
  PusherSocketId,
} from '../decorators'

@Controller('hello')
export class HelloController {
  /**
   * Channel Only
   * @returns Hello, World
   */
  @Get('channel-only')
  @PusherChannel('world-channel')
  world() {
    return 'Hello, World'
  }

  /**
   * Channel & Evennt
   * @returns Hello, World
   */
  @Get('channel-and-event')
  @PusherChannel('world-channel')
  @PusherEvent('greetings')
  channelAndEvent() {
    return 'Hello, World'
  }

  /**
   * Custom socketId header
   * @returns Hello, World
   */
  @Get('custom-sid-header')
  @PusherChannel('world-channel')
  @PusherEvent('greetings')
  @PusherSocketId('x-custom-sid')
  customClientSocketIdHeader() {
    return 'Hello, World'
  }

  /**
   * Channel name builder
   * @returns Hello, World
   */
  @Get('channel-name-builder')
  @PusherChannel((req: { query: Record<string, any> }) => req.query['channel'].toString())
  @PusherEvent('greetings')
  channelNameBuilder() {
    return 'May the Force be with you'
  }

  /**
   * Send Guard
   * @returns Hello, World
   */
  @Get('send-guard')
  @PusherChannel('world-channel')
  @PusherEvent('greetings')
  @PusherSendGuard((req: { query: Record<string, any> }) =>
    req.query['channel'].toString().startsWith('good-'),
  )
  sendGuard() {
    return 'Hello, World'
  }
}
