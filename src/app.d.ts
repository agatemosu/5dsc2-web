import { SessionValidationResult } from '$lib/server/auth';
import '@poppanator/sveltekit-svg/dist/svg.d.ts';

// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		interface Locals {
			user: SessionValidationResult['user'];
			session: SessionValidationResult['session'];
		}

		// interface Error {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}

		declare module '*.md' {
			import type { Component } from 'svelte';

			declare const MarkdownComponent: Component;

			export default MarkdownComponent;
		}
	}
}

export {};
