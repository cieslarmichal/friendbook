import 'dotenv/config';

import { fastify } from 'fastify';

import { EnvKey } from './envKey.js';
import { DependencyInjectionContainer, DependencyInjectionContainerFactory } from '@libs/dependency-injection';
import { LogLevel, LoggerModule, LoggerService, loggerSymbols } from '@libs/logger';
import { Neo4jModule, Session, neo4jSymbols } from '@libs/neo4j';
import { HttpRouter } from './httpRouter/httpRouter.js';
import { UserModule } from './modules/userModule/userModule.js';

export class Application {
  public static createContainer(): DependencyInjectionContainer {
    const logLevel = process.env[EnvKey.logLevel] as LogLevel;
    const jwtSecret = String(process.env[EnvKey.jwtSecret]);
    const jwtExpiresIn = String(process.env[EnvKey.jwtExpiresIn]);
    const hashSaltRounds = Number(process.env[EnvKey.hashSaltRounds]);
    const databaseHost = String(process.env[EnvKey.databaseHost]);
    const databaseUser = String(process.env[EnvKey.databaseUser]);
    const databasePassword = String(process.env[EnvKey.databasePassword]);

    const container = DependencyInjectionContainerFactory.create({
      modules: [
        new LoggerModule({ logLevel }),
        new UserModule({ jwtSecret, jwtExpiresIn, hashSaltRounds }),
        new Neo4jModule({ databaseHost, databaseUser, databasePassword }),
      ],
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

    const loggerService = container.get<LoggerService>(loggerSymbols.loggerService);

    const session = container.get<Session>(neo4jSymbols.session);

    const result = await session.run('');

    console.log(result);

    loggerService.log({ message: `Server started.`, context: { httpServerHost, httpServerPort } });
  }
}
