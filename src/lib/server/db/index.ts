import * as env from '$app/env/private';
import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';

import { relations } from './relations';

const client = createClient({ url: env.TURSO_DATABASE_URL, authToken: env.TURSO_AUTH_TOKEN });

export const db = drizzle({ client, relations, logger: import.meta.env.DEV });
