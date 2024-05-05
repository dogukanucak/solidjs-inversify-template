import DI_CONTAINER from "./IoC/di.container";
import { HTTP_TOKENS } from "./IoC/Tokens/Http.token";
import { FetchAdapter } from "./Services/Http/adapters/fetchAdapter";
import { HttpClient } from "./Services/Http/client/HttpClient";
import { IHttpClient, IHttpAdapter } from "./Services/Http/contract";

/**
 * Helper class to add IoC bindings
 */
class AppInjector {
  inject(): void {
    /**
     * Http
     */
    DI_CONTAINER.bind<IHttpClient>(HTTP_TOKENS.HttpClient).to(HttpClient);
    DI_CONTAINER.bind<IHttpAdapter>(HTTP_TOKENS.HttpAdapter).to(FetchAdapter);  
  }
}

export default new AppInjector();
