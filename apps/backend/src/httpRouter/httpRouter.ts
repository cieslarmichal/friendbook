import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { UserHttpController } from '../modules/userModule/api/httpControllers/userHttpController/userHttpController.js';
import { userSymbols } from '../modules/userModule/symbols.js';
import { HttpController, HttpRoute, HttpStatusCode } from '@common/types';
import { Validator, BaseError, ApplicationError, DomainError } from '@common/validation';
import { DependencyInjectionContainer } from '@libs/dependency-injection';
import { LoggerService, loggerSymbols } from '@libs/logger';

export interface NormalizeUrlPayload {
  url: string;
}

export interface RegisterControllerRoutesPayload {
  controller: HttpController;
}

export interface RegisterRoutesPayload {
  routes: HttpRoute[];
  basePath: string;
}

export class HttpRouter {
  private readonly rootPath = '';
  private readonly loggerService: LoggerService;

  public constructor(
    private readonly server: FastifyInstance,
    private readonly container: DependencyInjectionContainer,
  ) {
    this.loggerService = this.container.get<LoggerService>(loggerSymbols.loggerService);
  }

  public registerAllRoutes(): void {
    const blockchainHttpController = this.container.get<UserHttpController>(userSymbols.userHttpController);

    this.registerControllerRoutes({ controller: blockchainHttpController });
  }

  private registerControllerRoutes(payload: RegisterControllerRoutesPayload): void {
    const { controller } = payload;

    const { basePath } = controller;

    const routes = controller.getHttpRoutes();

    this.registerRoutes({ routes, basePath });
  }

  private registerRoutes(payload: RegisterRoutesPayload): void {
    const { routes, basePath } = payload;

    routes.map(({ path, method, handler, schema }) => {
      const fastifyHandler = async (fastifyRequest: FastifyRequest, fastifyReply: FastifyReply): Promise<void> => {
        try {
          const requestBody = fastifyRequest.body || {};

          const pathParams = (fastifyRequest.params || {}) as Record<string, string>;

          const queryParams = (fastifyRequest.query || {}) as Record<string, string>;

          this.loggerService.debug({
            message: 'Received an HTTP request.',
            context: {
              path,
              method,
              body: requestBody,
              pathParams,
              queryParams,
            },
          });

          if (schema.request.body) {
            Validator.validate(schema.request.body, requestBody);
          }

          if (schema.request.pathParams) {
            Validator.validate(schema.request.pathParams, pathParams);
          }

          if (schema.request.queryParams) {
            Validator.validate(schema.request.queryParams, queryParams);
          }

          const { statusCode, body: responseBody } = await handler({ body: requestBody, pathParams, queryParams });

          fastifyReply.status(statusCode);

          if (!responseBody) {
            fastifyReply.send();

            return;
          }

          fastifyReply.send({ ...responseBody });

          this.loggerService.debug({
            message: 'Send an HTTP response.',
            context: {
              path,
              method,
              statusCode,
              body: responseBody,
            },
          });
        } catch (error) {
          if (error instanceof BaseError) {
            const formattedError: Record<string, unknown> = {
              name: error.name,
              message: error.message,
              context: error.context,
              stack: error.stack,
            };

            this.loggerService.error({
              message: 'Caught an error in the HTTP router.',
              context: {
                error: formattedError,
              },
            });

            if (error instanceof ApplicationError) {
              fastifyReply.status(HttpStatusCode.badRequest).send({
                error: formattedError,
              });

              return;
            }

            if (error instanceof DomainError) {
              fastifyReply.status(HttpStatusCode.badRequest).send({
                error: formattedError,
              });

              return;
            }

            fastifyReply.status(HttpStatusCode.internalServerError).send({
              error: {
                name: 'InternalServerError',
                message: 'Internal server error',
              },
            });

            return;
          }

          this.loggerService.error({
            message: 'Caught an unknown error in the HTTP router.',
            context: {
              path: fastifyRequest.url,
              method,
              error: error instanceof Error ? { errorName: error.name, errorMessage: error.message } : undefined,
            },
          });

          fastifyReply.status(HttpStatusCode.internalServerError).send({
            error: {
              name: 'InternalServerError',
              message: 'Internal server error',
            },
          });

          return;
        }
      };

      const url = `/${this.rootPath}/${basePath}/${path}`;

      const normalizedUrl = this.normalizeUrl({ url });

      this.server.route({ method, url: normalizedUrl, handler: fastifyHandler });
    });
  }

  private normalizeUrl(payload: NormalizeUrlPayload): string {
    const { url } = payload;

    const urlWithoutDoubleSlashes = url.replace(/(\/+)/g, '/');

    const urlWithoutTrailingSlash = urlWithoutDoubleSlashes.replace(/(\/)$/g, '');

    return urlWithoutTrailingSlash;
  }
}
