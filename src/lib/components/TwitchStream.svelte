<script lang="ts">
	import { page } from '$app/state';
	import { tw } from '$lib/tailwind';
	import { tooltip } from 'svooltip';

	const socials = [
		{
			icon: tw('icon-[simple-icons--osu]'),
			href: 'https://osu.ppy.sh/community/forums/topics/2238623',
			alt: 'Forum Post',
		},
		{
			icon: tw('icon-[simple-icons--youtube]'),
			href: 'https://www.youtube.com/@SpanishCup',
			alt: 'YouTube',
		},
		{
			icon: tw('icon-[simple-icons--twitch]'),
			href: 'https://www.twitch.tv/spanishcup',
			alt: 'Twitch',
		},
		{
			icon: tw('icon-[simple-icons--discord]'),
			href: 'https://discord.com/invite/CY2dHK2Zek',
			alt: 'Discord',
		},
	];
</script>

<div class="flex w-full max-w-3xl flex-col gap-1">
	<div class="flex justify-between">
		<p class="text-2xl">partido en <span class="text-accent">directo</span>.</p>

		<ul class="flex gap-2">
			{#each socials as social, i (i)}
				<li>
					<a
						href={social.href}
						rel="external"
						class="flex"
						aria-label={social.alt}
						use:tooltip={{ content: social.alt }}
					>
						<i class="size-7 text-black hover:opacity-80 {social.icon}"></i>
					</a>
				</li>
			{/each}
		</ul>
	</div>

	<iframe
		class="aspect-video bg-black shadow-xl"
		src="https://player.twitch.tv/?channel=spanishcup&autoplay=false&muted=true&parent={page.url
			.hostname}"
		allow="fullscreen"
		title="Canal de Twitch"
	></iframe>
</div>
