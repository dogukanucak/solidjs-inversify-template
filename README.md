## SolidJs Inversify Template

This template extends [Template-Solid-Ts ](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-solid-ts) project with [Inversify JS](https://github.com/inversify/InversifyJS) to provide power of IoC.

In this template, the application does not directly depend on concrete implementations, rather getting services via injection tokens.
Please examine the **IoC** folder and also **Services** folder to see an example of http service. 

## DI Usage

Create an injectable service

```typescript
import { injectable } from "inversify";

@injectable()
export class HttpClient implements IHttpClient {}
```

Additionally you can provide anything via constructor

```typescript
import { inject, injectable } from "inversify";

 @injectable()
 export class HttpClient implements IHttpClient {
    constructor(@inject(HTTP_TOKENS.HttpAdapter) private adapter: IHttpAdapter) {}
 }
```

Then create tokens for injectable classes
```typescript
export const HTTP_TOKENS = {
    HttpClient: "HttpClient",
    HttpAdapter: "HttpAdapter",
};
```

Bind concrete implementations via tokens

```typescript
DI_CONTAINER.bind<IHttpClient>(HTTP_TOKENS.HttpClient).to(HttpClient);
DI_CONTAINER.bind<IHttpAdapter>(HTTP_TOKENS.HttpAdapter).to(FetchAdapter);  
```

Finally the service can be used anywhere
```typescript
/**
* Get injected HTTP Client using IHttpClient contract
*/
const httpClient = DI_CONTAINER.get<IHttpClient>(HTTP_TOKENS.HttpClient);

httpClient.request({method: HttpMethod.GET, url: JSON_PLACE_HOLDER_URL});
```

As you see, it always goes by contracts. The main application does not actually care about which HttpClient or adapter is used. Therefore, it is easy to replace services, 3rd party libraries without worrying to break application as long as we ensure the contracts

In this project, **fetch** is used to send requests, so that `FetchAdapter` is implemented. If you want to use another AJAX library, all you need to do is implement an adapter based on your library (e.g., `AxiosAdapter`, `RxJsAdapter`) and inject that adapter instead of `FetchAdapter` 


## App Usage

```bash
$ npm install # or pnpm install or yarn install
```

### Learn more on the [Solid Website](https://solidjs.com) and come chat with us on our [Discord](https://discord.com/invite/solidjs)

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode.<br>
Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

### `npm run build`

Builds the app for production to the `dist` folder.<br>
It correctly bundles Solid in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

## Deployment

Learn more about deploying your application with the [documentations](https://vitejs.dev/guide/static-deploy.html)
