import { DynamicModule, FactoryProvider, Module, ModuleMetadata, Provider } from '@nestjs/common';
import Pusher from 'pusher';
import { PusherService } from './pusher.service';

export type NestJsPusherAsyncOptions = Pick<ModuleMetadata, 'imports'> &
  Pick<FactoryProvider<NestJsPusherOptions>, 'useFactory' | 'inject'>;

@Module({})
export class PusherModule {
  /**
   * Provides a dynamic module for your application
   * @param options Pusher options
   * @param chunkingOptions By default its enabled, the max pusher limit is 10MB therefore we set 9216MB as the limit to prevent overflow or reaching its limit
   * @param isGlobal  Whether this module should be globally imported, by default its true
   */
  static forRoot(
    options: Pusher.Options,
    chunkingOptions = { limit: 9216, enabled: true },
    isGlobal = true,
  ): DynamicModule {
    const providers: Provider[] = [
      {
        provide: PusherService,
        useValue: new PusherService(options, chunkingOptions),
      },
    ];
    return {
      module: PusherModule,
      global: isGlobal,
      providers,
      exports: providers,
    };
  }

  static forRootAsync(options: NestJsPusherAsyncOptions, isGlobal = true): DynamicModule {
    const providers: Provider[] = [
      {
        provide: PusherService,
        useFactory: async (...args) => {
          const nestJsPusherOptions = await options.useFactory(...args);
          return new PusherService(
            nestJsPusherOptions.options,
            nestJsPusherOptions.chunkingOptions || {
              limit: 9216,
              enabled: true,
            },
          );
        },
        inject: options.inject,
      },
    ];
    return {
      module: PusherModule,
      imports: options.imports,
      global: isGlobal,
      providers,
      exports: providers,
    };
  }
}

export interface NestJsPusherOptions {
  options: Pusher.Options;
  chunkingOptions?: { limit: number; enabled: boolean };
}
