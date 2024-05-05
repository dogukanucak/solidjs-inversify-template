
import { inject, injectable } from "inversify";
import type { IHttpClient, IHttpAdapter, IHttpMiddleware, HttpRequestConfig, HttpResponse } from "../contract";
import { HTTP_TOKENS } from "../../../IoC/Tokens/Http.token";

/**
 * Example HttpClient
 * HttpClient sends request via an injected adapter
 * When you want to use any ajax library, all you need to do is to implement an adapter
 * Then inject it in `app.injector.ts` 
 */
@injectable()
export class HttpClient implements IHttpClient {  
  private middlewares: IHttpMiddleware[] = [];

  constructor(@inject(HTTP_TOKENS.HttpAdapter) private adapter: IHttpAdapter) {}

  public useMiddleware(middleware: IHttpMiddleware) {
    this.middlewares.push(middleware);

    return this;
  }

  public async request(config: HttpRequestConfig): Promise<HttpResponse> {
    try {
      // Apply request middlewares
      for (const middleware of this.middlewares) {
        if (middleware.handleRequest) {
          config = await middleware.handleRequest(config);
        }
      }

      // Send request
      let response = await this.adapter.request(config);

      // Apply response middlewares
      for (const middleware of this.middlewares) {
        if (middleware.handleResponse) {
          response = await middleware.handleResponse(response);
        }
      }

      return response;
    } catch (error: any) {
      console.log("ERROR: ", error);     

      throw error;
    }
  }
}
