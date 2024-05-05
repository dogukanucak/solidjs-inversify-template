class AppInjector {
  inject(): void {
    /**
     * Http
     */
    // DI_CONTAINER.bind<IHttpClient>(HTTP_TOKENS.HttpClient).to(HttpClient);
    // DI_CONTAINER.bind<IHttpAdapter>(HTTP_TOKENS.HttpAdapter).to(FetchAdapter);  
  }
}

export default new AppInjector();
