<script lang="ts">
	import { resolve } from '$app/paths';
	import flecha from '$lib/assets/flecha.svg?url';
</script>

<div class="flex items-end gap-3">
	<div>
		<img src={flecha} alt="Flecha" />
	</div>

	<a
		href={resolve('/register')}
		class="flex items-center justify-center bg-accent px-32 py-5 text-4xl text-white"
	>
		regístrate
	</a>
</div>
