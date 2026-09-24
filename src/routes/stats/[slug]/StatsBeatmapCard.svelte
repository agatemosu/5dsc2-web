<script lang="ts">
	import { Mod } from '$lib/enums';
	import { calcModStat } from '$lib/mods/calc-stat';
	import { modClass } from '$lib/tailwind';
	import type { FullMappool } from '$lib/types';
	import { tooltip } from 'svooltip';

	interface Props {
		map: FullMappool;
	}

	let { map }: Props = $props();

	const numFormatter = new Intl.NumberFormat('es-ES', { maximumFractionDigits: 2 });

	const formatTime = (time: number) => {
		const minutes = Math.floor(time / 60);
		const seconds = Math.floor(time % 60);

		return `${minutes}:${seconds.toString().padStart(2, '0')}`;
	};
</script>

<div class="flex flex-col">
	<div class="flex">
		<!-- Cover -->
		<a
			href="https://osu.ppy.sh/beatmapsets/{map.beatmap.beatmapsetId}#osu/{map.beatmapId}"
			class="aspect-7/4 w-44"
		>
			<img
				src="https://assets.ppy.sh/beatmaps/{map.beatmap.beatmapsetId}/covers/cover.jpg"
				alt="Cover de {map.beatmap.beatmapset.title}"
				class="h-full w-full object-cover"
			/>
		</a>

		<!-- Slot / ID -->
		<div class="flex w-18 shrink-0 flex-col gap-2.5 p-2.5">
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

			<div class="text-center text-xs text-gray-2 select-all">
				{map.beatmapId}
			</div>
		</div>

		<!-- Song info -->
		<div class="min-w-40 flex-1 pt-2 pr-2">
			<div class="truncate font-sans text-sm {modClass[map.slotName].text}">
				{map.beatmap.beatmapset.artist}
			</div>

			<div class="truncate text-xl leading-7 text-white">
				{map.beatmap.beatmapset.title}
			</div>

			<div class="truncate text-sm text-white">
				<span class={modClass[map.slotName].text}>
					{map.beatmap.version}
				</span>
				por {map.beatmap.beatmapset.creator}
			</div>
		</div>
	</div>

	<!-- Stats -->
	<div class="flex self-center pt-2 text-xs">
		<div class="flex justify-around">
			<div
				class="flex w-14 items-center justify-center gap-1"
				use:tooltip={{ content: 'Estrellas' }}
			>
				<i class="icon-[fa7-solid--star] size-3 {modClass[map.slotName].text}"></i>
				<span class="text-white">{numFormatter.format(map.starRating)}</span>
			</div>

			<div class="flex w-14 items-center justify-center gap-1" use:tooltip={{ content: 'BPM' }}>
				<i class="icon-[fa7-solid--music] size-3 {modClass[map.slotName].text}"></i>
				<span class="text-white">
					{numFormatter.format(
						map.slotName === Mod.DT ? calcModStat.dt.bpm(map.beatmap.bpm) : map.beatmap.bpm,
					)}
				</span>
			</div>

			<div
				class="flex w-14 items-center justify-center gap-1"
				use:tooltip={{ content: 'Duración' }}
			>
				<i class="icon-[fa7-solid--clock] size-3 {modClass[map.slotName].text}"></i>
				<span class="text-white">
					{formatTime(
						map.slotName === Mod.DT
							? calcModStat.dt.length(map.beatmap.length)
							: map.beatmap.length,
					)}
				</span>
			</div>
		</div>

		<span class="h-6 w-0.5 shrink-0 rounded-xl bg-gray-2"></span>

		<div class="flex justify-around">
			<div class="flex w-14 items-center justify-center gap-1">
				<span class={modClass[map.slotName].text}>CS</span>
				<span class="text-white">
					{numFormatter.format(
						map.slotName === Mod.HR
							? calcModStat.hr.cs(map.beatmap.circleSize)
							: map.beatmap.circleSize,
					)}
				</span>
			</div>

			<div class="flex w-14 items-center justify-center gap-1">
				<span class={modClass[map.slotName].text}>AR</span>
				<span class="text-white">
					{numFormatter.format(
						map.slotName === Mod.DT
							? calcModStat.dt.ar(map.beatmap.approachRate)
							: map.slotName === Mod.HR
								? calcModStat.hr.ar(map.beatmap.approachRate)
								: map.beatmap.approachRate,
					)}
				</span>
			</div>

			<div class="flex w-14 items-center justify-center gap-1">
				<span class={modClass[map.slotName].text}>OD</span>
				<span class="text-white">
					{numFormatter.format(
						map.slotName === Mod.DT
							? calcModStat.dt.od(map.beatmap.overallDifficulty)
							: map.slotName === Mod.HR
								? calcModStat.hr.od(map.beatmap.overallDifficulty)
								: map.beatmap.overallDifficulty,
					)}
				</span>
			</div>
		</div>
	</div>
</div>
