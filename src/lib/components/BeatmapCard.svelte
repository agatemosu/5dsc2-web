<script lang="ts">
	interface Props {
		map: {
			slot: {
				mod: string;
				idx: number;
			};
			custom: boolean;
			beatmapset: {
				id: number;
				title: string;
				artist: string;
				mapper: {
					name: string;
					id: number;
				};
				bpm: number;
				length: number;
			};
			diff: {
				id: number;
				name: string;
				starRating: number;
				circleSize: number;
				approachRate: number;
				overallDifficulty: number;
			};
		};
	}

	let { map }: Props = $props();

	const numFormatter = new Intl.NumberFormat('es-ES', { maximumFractionDigits: 2 });

	const modClass: Record<string, { bg: string; text: string }> = {
		NM: { bg: 'bg-mod-nomod', text: 'text-mod-nomod' },
		HD: { bg: 'bg-mod-hidden', text: 'text-mod-hidden' },
		HR: { bg: 'bg-mod-hardrock', text: 'text-mod-hardrock' },
		DT: { bg: 'bg-mod-doubletime', text: 'text-mod-doubletime' },
		EZ: { bg: 'bg-mod-easy', text: 'text-mod-easy' },
		TB: { bg: 'bg-mod-tiebreaker', text: 'text-mod-tiebreaker' },
	};
</script>

<div class="flex h-32 bg-gray">
	<img
		src="https://assets.ppy.sh/beatmaps/{map.beatmapset.id}/covers/cover.jpg"
		alt="Cover de {map.beatmapset.title}"
		class="w-56 object-cover"
	/>

	<div class="flex w-18 flex-col gap-2.5 py-2.5 pl-2.5">
		<div class="py-2 text-center text-sm text-white {modClass[map.slot.mod].bg}">
			{map.slot.mod}{map.slot.idx}
		</div>
		{#if map.custom}
			<div class="bg-white py-1 text-center text-xs text-black">custom</div>
		{/if}
		<div class="text-center align-bottom text-xs text-gray-2">
			{map.diff.id}
		</div>
	</div>

	<div class="flex flex-1 flex-col justify-center py-4 pl-2.5">
		<div class="font-sans {modClass[map.slot.mod].text}">{map.beatmapset.artist}</div>
		<div class="text-2xl leading-9 text-white">{map.beatmapset.title}</div>
		<div class="text-white">
			<span class={modClass[map.slot.mod].text}>
				{map.diff.name}
			</span>
			por
			<a
				href="https://osu.ppy.sh/users/{map.beatmapset.mapper.id}"
				rel="external"
				class="hover:underline"
			>
				{map.beatmapset.mapper.name}
			</a>
		</div>
	</div>

	<div class="max-xs:mb-2 self-center max-md:mb-1 md:mr-10">
		<div class="max-xs:flex-col flex justify-items-end gap-1 text-xs font-bold md:flex-col">
			<div class="grid grid-cols-3 gap-3">
				<div class="flex items-center gap-1" title="Estrellas">
					<i class="icon-[fa7-solid--star] size-3 {modClass[map.slot.mod].text}"></i>
					<span class="text-white">{numFormatter.format(map.diff.starRating)}</span>
				</div>
				<div class="flex items-center gap-1" title="BPM">
					<i class="icon-[fa7-solid--music] size-3 {modClass[map.slot.mod].text}"></i>
					<span class="text-white">{numFormatter.format(map.beatmapset.bpm)}</span>
				</div>
				<div class="flex items-center gap-1" title="Duración">
					<i class="icon-[fa7-solid--clock] size-3 {modClass[map.slot.mod].text}"></i>
					<span class="text-white">{map.beatmapset.length}</span>
				</div>
			</div>

			<span class="max-xs:hidden mx-2 h-6 w-full max-w-[0.18rem] rounded-xl bg-[#464646] md:hidden"
			></span>

			<div class="grid grid-cols-3 gap-3">
				<div class="flex items-center gap-1">
					<span class={modClass[map.slot.mod].text}>CS</span>
					<span class="text-white">{numFormatter.format(map.diff.circleSize)}</span>
				</div>
				<div class="flex items-center gap-1">
					<span class={modClass[map.slot.mod].text}>AR</span>
					<span class="text-white">{numFormatter.format(map.diff.approachRate)}</span>
				</div>
				<div class="flex items-center gap-1">
					<span class={modClass[map.slot.mod].text}>OD</span>
					<span class="text-white">{numFormatter.format(map.diff.overallDifficulty)}</span>
				</div>
			</div>
		</div>
	</div>
</div>
