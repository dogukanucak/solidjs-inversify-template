import { createSignal } from 'solid-js'
import solidLogo from './assets/solid.svg'
import viteLogo from '/vite.svg'
import './App.css'
import DI_CONTAINER from './IoC/di.container';

import { HTTP_TOKENS } from './IoC/Tokens/Http.token';
import { HttpMethod } from './Services/Http/contract/enums/HttpMethod.enum';
import { IHttpClient } from './Services/Http/contract';

const JSON_PLACE_HOLDER_URL = 'https://jsonplaceholder.typicode.com/posts/1';

function App() {
  const [count, setCount] = createSignal(0);

  /**
   * Get injected HTTP Client
   */
  const httpClient = DI_CONTAINER.get<IHttpClient>(HTTP_TOKENS.HttpClient);
  
  /**
   * Then send request
   */
  httpClient.request({method: HttpMethod.GET, url: JSON_PLACE_HOLDER_URL});

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} class="logo" alt="Vite logo" />
        </a>
        <a href="https://solidjs.com" target="_blank">
          <img src={solidLogo} class="logo solid" alt="Solid logo" />
        </a>
      </div>
      <h1>Vite + Solid</h1>
      <div class="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count()}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p class="read-the-docs">
        Click on the Vite and Solid logos to learn more
      </p>
    </>
  )
}

export default App