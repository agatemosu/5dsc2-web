<script lang="ts">
	import { page } from '$app/state';
	import discord from '$lib/assets/discord.svg?component';
	import twitch from '$lib/assets/twitch.svg?component';
	import youtube from '$lib/assets/youtube.svg?component';

	const socials = [
		{ icon: youtube, href: 'https://www.youtube.com/@SpanishCup', alt: 'YouTube' },
		{ icon: twitch, href: 'https://www.twitch.tv/spanishcup', alt: 'Twitch' },
		{ icon: discord, href: '/', alt: 'Discord' },
	];
</script>

<div class="flex w-3xl flex-col gap-1">
	<div class="flex justify-between">
		<p class="text-2xl">partido en <span class="text-accent">directo</span>.</p>

		<ul class="flex gap-2">
			{#each socials as social}
				<li>
					<a href={social.href}>
						<social.icon class="size-7 text-black hover:opacity-80" />
					</a>
				</li>
			{/each}
		</ul>
	</div>

	<iframe
		class="aspect-video w-full max-w-4xl pt-0"
		src="https://player.twitch.tv/?channel=spanishcup&autoplay=false&muted=true&parent={page.url
			.hostname}"
		allow="fullscreen"
		title="Canal de Twitch"
	></iframe>
</div>
