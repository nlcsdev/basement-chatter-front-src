<script>
	export let name;
	import MainContainer from "./MainContainer.svelte";
</script>

<svelte:head>
	<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
</svelte:head>

<main>
	<MainContainer/>
</main>

<style>
	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>