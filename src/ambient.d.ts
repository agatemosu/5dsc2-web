declare module '*.md' {
	import type { Component } from 'svelte';

	const MarkdownComponent: Component;
	export default MarkdownComponent;
}
