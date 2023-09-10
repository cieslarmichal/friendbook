import {
  HttpController,
  HttpRoute,
  HttpMethodName,
  HttpStatusCode,
  responseErrorBodySchema,
  HttpRequest,
  HttpCreatedResponse,
  ResponseErrorBody,
  HttpOkResponse,
  HttpNotFoundResponse,
  HttpNoContentResponse,
} from '@common/types';
import { Injectable, Inject } from '@libs/dependency-injection';
import { symbols } from '@libs/logger';
import { DeleteUserCommandHandler } from '../../../application/commandHandlers/deleteUserCommandHandler/deleteUserCommandHandler.js';
import { LoginUserCommandHandler } from '../../../application/commandHandlers/loginUserCommandHandler/loginUserCommandHandler.js';
import { RegisterUserCommandHandler } from '../../../application/commandHandlers/registerUserCommandHandler/registerUserCommandHandler.js';
import { UserAlreadyExistsError } from '../../../application/errors/userAlreadyExistsError.js';
import { UserNotFoundError } from '../../../application/errors/userNotFoundError.js';
import { FindUserQueryHandler } from '../../../application/queryHandlers/findUserQueryHandler/findUserQueryHandler.js';
import { User } from '../../../domain/entities/user/user.js';
import {
  deleteUserPathParametersSchema,
  deleteUserResponseNoContentBodySchema,
  DeleteUserPathParameters,
  DeleteUserResponseNoContentBody,
} from './schemas/deleteUserSchema.js';
import {
  findUserPathParametersSchema,
  findUserResponseOkBodySchema,
  FindUserPathParameters,
  FindUserResponseOkBody,
} from './schemas/findUserSchema.js';
import {
  loginUserBodySchema,
  loginUserResponseOkBodySchema,
  LoginUserBody,
  LoginUserResponseOkBody,
} from './schemas/loginUserSchema.js';
import {
  registerUserBodySchema,
  registerUserResponseCreatedBodySchema,
  RegisterUserBody,
  RegisterUserResponseCreatedBody,
} from './schemas/registerUserSchema.js';

@Injectable()
export class UserHttpController implements HttpController {
  public readonly basePath = 'users';

  public constructor(
    @Inject(symbols.registerUserCommandHandler)
    private readonly registerUserCommandHandler: RegisterUserCommandHandler,
    @Inject(symbols.loginUserCommandHandler)
    private readonly loginUserCommandHandler: LoginUserCommandHandler,
    @Inject(symbols.deleteUserCommandHandler)
    private readonly deleteUserCommandHandler: DeleteUserCommandHandler,
    @Inject(symbols.findUserQueryHandler)
    private readonly findUserQueryHandler: FindUserQueryHandler,
  ) {}

  public getHttpRoutes(): HttpRoute[] {
    return [
      new HttpRoute({
        method: HttpMethodName.post,
        path: 'register',
        handler: this.registerUser.bind(this),
        schema: {
          request: {
            body: registerUserBodySchema,
          },
          response: {
            [HttpStatusCode.created]: {
              schema: registerUserResponseCreatedBodySchema,
            },
            [HttpStatusCode.unprocessableEntity]: {
              schema: responseErrorBodySchema,
            },
          },
        },
      }),
      new HttpRoute({
        method: HttpMethodName.post,
        path: 'login',
        handler: this.loginUser.bind(this),
        schema: {
          request: {
            body: loginUserBodySchema,
          },
          response: {
            [HttpStatusCode.ok]: {
              schema: loginUserResponseOkBodySchema,
            },
            [HttpStatusCode.notFound]: {
              schema: responseErrorBodySchema,
            },
          },
        },
      }),
      new HttpRoute({
        method: HttpMethodName.get,
        path: ':id',
        handler: this.findUser.bind(this),
        schema: {
          request: {
            pathParams: findUserPathParametersSchema,
          },
          response: {
            [HttpStatusCode.ok]: {
              schema: findUserResponseOkBodySchema,
            },
            [HttpStatusCode.notFound]: {
              schema: responseErrorBodySchema,
            },
          },
        },
        authorizationType: AuthorizationType.bearerToken,
      }),
      new HttpRoute({
        method: HttpMethodName.delete,
        path: ':id',
        handler: this.deleteUser.bind(this),
        schema: {
          request: {
            pathParams: deleteUserPathParametersSchema,
          },
          response: {
            [HttpStatusCode.noContent]: {
              schema: deleteUserResponseNoContentBodySchema,
            },
            [HttpStatusCode.notFound]: {
              schema: responseErrorBodySchema,
            },
          },
        },
        authorizationType: AuthorizationType.bearerToken,
      }),
    ];
  }

  private async registerUser(
    request: HttpRequest<RegisterUserBody>,
  ): Promise<
    HttpCreatedResponse<RegisterUserResponseCreatedBody> | HttpUnprocessableEntityResponse<ResponseErrorBody>
  > {
    const unitOfWork = await this.unitOfWorkFactory.create();

    try {
      const { user } = await unitOfWork.runInTransaction(async () => {
        if ('email' in request.body) {
          const { email, password } = request.body;

          return this.registerUserCommandHandler.execute({ unitOfWork, draft: { email, password } });
        } else {
          const { phoneNumber, password } = request.body;

          return this.registerUserCommandHandler.execute({
            unitOfWork,
            draft: { phoneNumber, password },
          });
        }
      });

      return { statusCode: HttpStatusCode.created, body: { user } };
    } catch (error) {
      if (error instanceof UserAlreadyExistsError) {
        return { statusCode: HttpStatusCode.unprocessableEntity, body: { error } };
      }

      throw error;
    }
  }

  private async loginUser(
    request: HttpRequest<LoginUserBody>,
  ): Promise<HttpOkResponse<LoginUserResponseOkBody> | HttpNotFoundResponse<ResponseErrorBody>> {
    const unitOfWork = await this.unitOfWorkFactory.create();

    try {
      const { accessToken } = await unitOfWork.runInTransaction(async () => {
        if ('email' in request.body) {
          const { email, password } = request.body;

          return this.loginUserCommandHandler.execute({ unitOfWork, draft: { email, password } });
        } else {
          const { phoneNumber, password } = request.body;

          return this.loginUserCommandHandler.execute({ unitOfWork, draft: { phoneNumber, password } });
        }
      });

      return { statusCode: HttpStatusCode.ok, body: { token: accessToken } };
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        return { statusCode: HttpStatusCode.notFound, body: { error } };
      }

      throw error;
    }
  }

  private async findUser(
    request: HttpRequest<undefined, undefined, FindUserPathParameters>,
  ): Promise<
    | HttpOkResponse<FindUserResponseOkBody>
    | HttpNotFoundResponse<ResponseErrorBody>
    | HttpForbiddenResponse<ResponseErrorBody>
  > {
    const { id } = request.pathParams;

    const { userId } = request.context;

    if (userId !== id) {
      return { statusCode: HttpStatusCode.forbidden, body: { error: { name: '', message: '' } } };
    }

    const unitOfWork = await this.unitOfWorkFactory.create();

    try {
      const { user } = await unitOfWork.runInTransaction(async () => {
        return this.findUserQueryHandler.execute({ unitOfWork, userId: id as string });
      });

      return { statusCode: HttpStatusCode.ok, body: { user: user as User } };
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        return { statusCode: HttpStatusCode.notFound, body: { error } };
      }

      throw error;
    }
  }

  private async deleteUser(
    request: HttpRequest<undefined, undefined, DeleteUserPathParameters>,
  ): Promise<
    | HttpNoContentResponse<DeleteUserResponseNoContentBody>
    | HttpNotFoundResponse<ResponseErrorBody>
    | HttpForbiddenResponse<ResponseErrorBody>
  > {
    const { id } = request.pathParams;

    const { userId } = request.context;

    if (userId !== id) {
      return { statusCode: HttpStatusCode.forbidden, body: { error: { name: '', message: '' } } };
    }

    const unitOfWork = await this.unitOfWorkFactory.create();

    try {
      await unitOfWork.runInTransaction(async () => {
        await this.deleteUserCommandHandler.execute({ unitOfWork, userId: id as string });
      });
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        return { statusCode: HttpStatusCode.notFound, body: { error } };
      }

      throw error;
    }

    return { statusCode: HttpStatusCode.noContent, body: null };
  }
}
