import { env } from '$env/dynamic/private';
import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import { relations } from './relations';

if (!env.TURSO_DATABASE_URL) throw new Error('TURSO_DATABASE_URL is not set');
if (!env.TURSO_AUTH_TOKEN) throw new Error('TURSO_AUTH_TOKEN is not set');

const client = createClient({ url: env.TURSO_DATABASE_URL, authToken: env.TURSO_AUTH_TOKEN });

export const db = drizzle({ client, relations, logger: import.meta.env.DEV });
