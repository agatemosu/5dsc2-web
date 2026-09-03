<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Tooltip } from 'svooltip';

	interface Props {
		instant: Temporal.Instant;
		children: Snippet;
	}

	let { instant, children }: Props = $props();

	const utcFormatter = new Intl.DateTimeFormat('es-ES', {
		timeZone: 'UTC',
		day: 'numeric',
		month: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
	});
	const spainFormatter = new Intl.DateTimeFormat('es-ES', {
		timeZone: 'Europe/Madrid',
		day: 'numeric',
		month: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
	});

	let content = $derived(
		`UTC: ${utcFormatter.format(instant)}<br>España: ${spainFormatter.format(instant)}`,
	);
</script>

<Tooltip as="div" block={true} {content} html={true}>
	{@render children()}
</Tooltip>
