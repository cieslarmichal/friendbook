import { RequestContext } from './requestContext.js';

export interface HttpRequest<Body = unknown, QueryParams = unknown, PathParams = unknown> {
  readonly body: Body;
  readonly pathParams: PathParams;
  readonly queryParams: QueryParams;
  readonly context: RequestContext;
}
