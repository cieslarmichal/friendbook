import 'reflect-metadata';

import 'dotenv/config';

import { fastify } from 'fastify';

import { BlockchainModule } from './userModule/blockchainModule.js';
import { EnvKey } from './envKey.js';
import { HttpRouter } from './httpRouter/httpRouter.js';
import { DependencyInjectionContainer } from './libs/dependencyInjection/dependencyInjectionContainer.js';
import { DependencyInjectionContainerFactory } from './libs/dependencyInjection/dependencyInjectionContainerFactory.js';
import { LoggerModule } from './libs/logger/loggerModule.js';
import { loggerModuleSymbols } from './libs/logger/loggerModuleSymbols.js';
import { LogLevel } from './libs/logger/logLevel.js';
import { LoggerService } from './libs/logger/services/loggerService/loggerService.js';

export class Application {
  public static createContainer(): DependencyInjectionContainer {
    const logLevel = process.env[EnvKey.logLevel] as LogLevel;

    const container = DependencyInjectionContainerFactory.create({
      modules: [new LoggerModule({ logLevel }), new BlockchainModule()],
    });

    return container;
  }

  public static async init(): Promise<void> {
    const server = fastify();

    const httpServerHost = String(process.env[EnvKey.httpServerHost]);
    const httpServerPort = Number(process.env[EnvKey.httpServerPort]);

    console.log({
      httpServerHost,
      httpServerPort,
    });

    const container = Application.createContainer();

    const httpRouter = new HttpRouter(server, container);

    httpRouter.registerAllRoutes();

    await server.listen({ host: httpServerHost, port: httpServerPort });

    const loggerService = container.get<LoggerService>(loggerModuleSymbols.loggerService);

    loggerService.log({ message: `Server started.`, context: { httpServerHost, httpServerPort } });
  }
}
