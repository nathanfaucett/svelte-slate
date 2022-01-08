<script lang="ts">
	import type { Text } from 'slate';

	export let editor: SvelteEditor;
	export let leaf: Text;
</script>

<span {...$$restProps}><slot /></span>
