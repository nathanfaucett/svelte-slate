<svelte:options immutable />

<script lang="ts">
	import { base } from '$app/paths';
</script>

<ul>
	<li><a href={`${base}/default`}>Default</a></li>
	<li><a href={`${base}/huge-document`}>Huge Document</a></li>
</ul>
