import { SessionValidationResult } from '$lib/server/auth';
import '@poppanator/sveltekit-svg/dist/svg.d.ts';
import type { MetaTagsProps } from 'svelte-meta-tags';

// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		interface Locals {
			user: SessionValidationResult['user'];
			session: SessionValidationResult['session'];
			apiKey: string | null;
		}

		interface Error {
			data?: unknown;
		}

		interface PageData {
			pageMetaTags?: Readonly<MetaTagsProps>;
		}

		// interface PageState {}

		// interface Platform {}
	}
}
