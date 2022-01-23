<svelte:options immutable={true} />

<script lang="ts">
	export let clientHeight: number;
	export let style: string;
	export let contenteditable: boolean;
</script>

<span bind:clientHeight data-slate-placeholder {style} {contenteditable}><slot /></span>
