import svg from '@poppanator/sveltekit-svg';
import remarkGfm from 'remark-gfm';
import adapter from '@sveltejs/adapter-vercel';
import { sveltekit } from '@sveltejs/kit/vite';
import { svelteMarkdown } from '@sveltek/markdown';
import tailwindcss from '@tailwindcss/vite';
import rehypeMathjax from 'rehype-mathjax';
import remarkMath from 'remark-math';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true,
			},
			adapter: adapter(),
			typescript: {
				config: (config) => {
					config.include.push('../drizzle.config.ts');
				},
			},
			preprocess: [
				svelteMarkdown({
					plugins: {
						rehype: [rehypeMathjax],
						remark: [remarkMath, remarkGfm],
					},
				}),
			],
			extensions: ['.svelte', '.md'],
		}),
		svg(),
	],
});
