import { Injectable, Logger } from '@nestjs/common'
import * as Pusher from 'pusher'

@Injectable()
export class PusherService {
  private readonly pusher: Pusher
  private readonly logger = new Logger(PusherService.name)

  constructor(
    private readonly options: Pusher.Options,
    private readonly chunkingOptions: { limit: number; enabled: boolean },
  ) {
    this.pusher = new Pusher(options)
    if (this.chunkingOptions.enabled && this.chunkingOptions.limit > 10000) {
      this.logger.warn(
        `Pusher payload limit is 10 MB, you have passed ${this.chunkingOptions.limit} therefore its recommended to keep it equal or less`,
      )
    }
  }

  /**
   * Returns the underlying pusher instance
   */
  getPusherInstance() {
    return this.pusher
  }

  /**
   * Authenticates the target `socketId` into a private channel
   * @param socketId
   * @param channelName
   * @param data
   */
  authenticate(
    socketId: string,
    channelName: string,
    data?: Pusher.PresenceChannelData,
  ) {
    return this.pusher.authenticate(socketId, channelName, data)
  }

  /**
   * Sends an event to the given channel and optionally exclude a socket id if provided
   * If the data is undefined or null an error message will be thrown
   *
   * @param channel
   * @param event
   * @param data
   * @param socketId
   */
  async trigger<T = any>(
    channel: string | string[],
    event: string,
    data?: T,
    socketId?: string,
  ) {
    if (!this.chunkingOptions.enabled) {
      return await this.pusher.trigger(channel, event, data ?? '', {
        socket_id: socketId,
      })
    }

    const chunkSize = this.chunkingOptions.limit
    const str = data ? JSON.stringify(data, null, 0) : ''
    const msgId = Math.random().toString()

    const chunkArrayData: any[] = []
    for (let i = 0; i * chunkSize < str.length; i++) {
      chunkArrayData.push({
        id: msgId,
        index: i,
        chunk: str.substr(i * chunkSize, chunkSize),
        final: chunkSize * (i + 1) >= str.length,
      })
    }
    await Promise.all(
      chunkArrayData.map((e) => {
        return this.pusher.trigger(channel, event, e, {
          socket_id: socketId,
        })
      }),
    )
  }
}
