<script lang="ts">
	import { calcModStat } from '$lib/calc-mod-stat';
	import type { Beatmap, Beatmapset, Mappool } from '$lib/server/db/schema';
	import { tooltip } from 'svooltip';

	interface Props {
		map: Mappool & {
			beatmap: Beatmap & { beatmapset: Beatmapset };
		};
	}

	let { map }: Props = $props();

	const numFormatter = new Intl.NumberFormat('es-ES', { maximumFractionDigits: 2 });

	const formatTime = (time: number) => {
		const minutes = Math.floor(time / 60);
		const seconds = Math.floor(time % 60);

		return `${minutes}:${seconds.toString().padStart(2, '0')}`;
	};

	const modClass = {
		NM: { bg: 'bg-mod-nomod', text: 'text-mod-nomod' },
		HD: { bg: 'bg-mod-hidden', text: 'text-mod-hidden' },
		HR: { bg: 'bg-mod-hardrock', text: 'text-mod-hardrock' },
		DT: { bg: 'bg-mod-doubletime', text: 'text-mod-doubletime' },
		EZ: { bg: 'bg-mod-easy', text: 'text-mod-easy' },
		TB: { bg: 'bg-mod-tiebreaker', text: 'text-mod-tiebreaker' },
	};
</script>

<div class="flex h-32 bg-gray">
	<a
		href="https://osu.ppy.sh/beatmapsets/{map.beatmap.beatmapsetId}#osu/${map.beatmapId}"
		target="_blank"
		rel="external"
	>
		<img
			src="https://assets.ppy.sh/beatmaps/{map.beatmap.beatmapset.id}/covers/cover.jpg"
			alt="Cover de {map.beatmap.beatmapset.title}"
			class="h-full w-56 object-cover"
		/>
	</a>

	<div class="flex w-18 flex-col gap-2.5 py-2.5 pl-2.5">
		<div
			class="py-2 text-center text-sm text-white {modClass[map.slotName].bg}"
			use:tooltip={{
				content:
					`Sugerido por ${map.suggestor}` +
					(map.poolerNotes !== '' ? `<br>Notas: ${map.poolerNotes}` : ''),
				html: true,
			}}
		>
			{map.slotName}{map.slotIndex}
		</div>
		{#if map.custom}
			<div class="bg-white py-1 text-center text-xs text-black">custom</div>
		{/if}
		<div class="text-center align-bottom text-xs text-gray-2 select-all">
			{map.beatmapId}
		</div>
	</div>

	<div class="flex flex-1 flex-col justify-center py-4 pl-2.5">
		<div class="max-w-52 truncate font-sans {modClass[map.slotName].text}">
			{map.beatmap.beatmapset.artist}
		</div>
		<div class="max-w-52 truncate text-2xl leading-9 text-white">
			{map.beatmap.beatmapset.title}
		</div>
		<div class="max-w-52 truncate text-white">
			<span class={modClass[map.slotName].text}>
				{map.beatmap.version}
			</span>
			por {map.beatmap.beatmapset.creator}
		</div>
	</div>

	<div class="max-xs:mb-2 self-center max-md:mb-1 md:mr-10">
		<div class="max-xs:flex-col flex justify-items-end gap-1 text-xs font-bold md:flex-col">
			<div class="grid grid-cols-3 gap-3">
				<div class="flex items-center gap-1" use:tooltip={{ content: 'Estrellas' }}>
					<i class="icon-[fa7-solid--star] size-3 {modClass[map.slotName].text}"></i>
					<span class="text-white">{numFormatter.format(map.starRating)}</span>
				</div>
				<div class="flex items-center gap-1" use:tooltip={{ content: 'BPM' }}>
					<i class="icon-[fa7-solid--music] size-3 {modClass[map.slotName].text}"></i>
					<span class="text-white">
						{numFormatter.format(
							map.slotName === 'DT' ? calcModStat.dt.bpm(map.beatmap.bpm) : map.beatmap.bpm,
						)}
					</span>
				</div>
				<div class="flex items-center gap-1" use:tooltip={{ content: 'Duración' }}>
					<i class="icon-[fa7-solid--clock] size-3 {modClass[map.slotName].text}"></i>
					<span class="text-white">
						{formatTime(
							map.slotName === 'DT'
								? calcModStat.dt.length(map.beatmap.length)
								: map.beatmap.length,
						)}
					</span>
				</div>
			</div>

			<span class="max-xs:hidden mx-2 h-6 w-full max-w-[0.18rem] rounded-xl bg-[#464646] md:hidden"
			></span>

			<div class="grid grid-cols-3 gap-3">
				<div class="flex items-center gap-1">
					<span class={modClass[map.slotName].text}>CS</span>
					<span class="text-white">
						{numFormatter.format(
							map.slotName === 'HR'
								? calcModStat.hr.cs(map.beatmap.circleSize)
								: map.beatmap.circleSize,
						)}
					</span>
				</div>
				<div class="flex items-center gap-1">
					<span class={modClass[map.slotName].text}>AR</span>
					<span class="text-white">
						{numFormatter.format(
							map.slotName === 'DT'
								? calcModStat.dt.ar(map.beatmap.approachRate)
								: map.slotName === 'HR'
									? calcModStat.hr.ar(map.beatmap.approachRate)
									: map.beatmap.approachRate,
						)}
					</span>
				</div>
				<div class="flex items-center gap-1">
					<span class={modClass[map.slotName].text}>OD</span>
					<span class="text-white">
						{numFormatter.format(
							map.slotName === 'DT'
								? calcModStat.dt.od(map.beatmap.overallDifficulty)
								: map.slotName === 'HR'
									? calcModStat.hr.od(map.beatmap.overallDifficulty)
									: map.beatmap.overallDifficulty,
						)}
					</span>
				</div>
			</div>
		</div>
	</div>
</div>
