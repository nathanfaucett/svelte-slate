<script context="module">
	export const prerender = true;
</script>

<script lang="ts">
	import { base } from '$app/paths';
</script>

<ul>
	<li><a href={`${base}/default`}>Default</a></li>
	<li><a href={`${base}/editor`}>Editor</a></li>
	<li><a href={`${base}/huge-document`}>Huge Document</a></li>
	<li><a href={`${base}/plugins`}>Plugins</a></li>
	<li><a href={`${base}/richtext`}>Rich Text</a></li>
	<li><a href={`${base}/chat`}>Chat</a></li>
</ul>
