<script lang="ts">
	interface Props {
		user: {
			id: number;
			name: string;
			seed: number;
		};
	}

	let { user }: Props = $props();
</script>

<div class="grid h-30 w-40 grid-cols-2">
	<img src="https://a.ppy.sh/{user.id}" alt="Avatar de {user.name}" class="size-20" />
	<div class="flex items-center justify-center text-2xl text-white">
		#{user.seed}
	</div>
	<div class="col-span-2 text-center text-white">{user.name}</div>
</div>
