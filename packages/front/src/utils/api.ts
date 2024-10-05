import { treaty } from '@elysiajs/eden';
import type { App } from 'ifarmer-api';

const client = treaty<App>('localhost:3000') // TODO Update with an env value

export default client;
