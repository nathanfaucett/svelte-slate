<script lang="ts">
	import '../app.css';
	import { base } from '$app/paths';
	import FaGithubSquare from 'svelte-icons/fa/FaGithubSquare.svelte';
</script>

<!-- svelte-ignore missing-declaration -->
<svelte:head>
	<meta name="description" content={PACKAGE_JSON.description} />
	<meta name="keywords" content={PACKAGE_JSON.keywords.join(', ')} />
</svelte:head>

<div class="container">
	<!-- svelte-ignore missing-declaration -->
	<h1><a href={`${base}/`}>Svelte Slate {PACKAGE_JSON.version} Examples</a></h1>
	<div class="content">
		<slot />
	</div>
	<div class="footer">
		<div class="left">
			Not a real &copy; {new Date().getFullYear()}
		</div>
		<div class="right">
			<a class="github" target="_blank" href="https://github.com/nathanfaucett/svelte-slate"
				><div><FaGithubSquare /></div></a
			>
		</div>
	</div>
</div>

<style>
	h1 {
		margin: 0.67em 0 0 0;
		border-bottom: 1px solid #888;
	}
	h1 a {
		text-decoration: none;
	}
	.container {
		display: flex;
		flex-direction: column;
		max-width: 768px;
		padding: 0 1rem;
		height: 100%;
		margin: 0 auto;
	}
	.content {
		flex-grow: 1;
	}
	.footer {
		display: flex;
		flex-direction: row;
		flex-grow: 0;
		padding: 0.5rem 0;
		border-top: 1px solid #888;
	}
	.footer .left {
		flex: 1;
	}
	.footer .right {
		flex: 1;
		text-align: right;
	}
	.github {
		display: inline-block;
	}
	.github div {
		display: inline-block;
		width: 32px;
		height: 32px;
	}
</style>
