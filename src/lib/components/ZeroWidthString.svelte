<script lang="ts">
	export let length = 0;
	export let isLineBreak = false;
</script>

<span data-slate-zero-width={isLineBreak ? 'n' : 'z'} data-slate-length={length}
	>{'\uFEFF'}{#if isLineBreak}<br />{/if}</span
>
