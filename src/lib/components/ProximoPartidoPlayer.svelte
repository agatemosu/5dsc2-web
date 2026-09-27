<script lang="ts">
	import type { MatchPlayer } from '$lib/types';

	interface Props {
		user: MatchPlayer;
	}

	let { user }: Props = $props();
</script>

<div class="grid h-30 w-40 grid-cols-2">
	<img src="https://a.ppy.sh/{user.osu.id}" alt="Avatar de {user.osu.username}" class="size-20" />
	<div class="flex items-center justify-center text-2xl text-white">
		#{user.seed}
	</div>
	<div class="col-span-2 text-center text-white">{user.osu.username}</div>
</div>
