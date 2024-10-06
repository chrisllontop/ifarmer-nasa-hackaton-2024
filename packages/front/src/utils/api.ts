import { treaty } from '@elysiajs/eden';
import type { App } from 'ifarmer-api';

const apiUrl = import.meta.env.VITE_API_URL ?? 'localhost:3000';

const client = treaty<App>(apiUrl);

export default client;
