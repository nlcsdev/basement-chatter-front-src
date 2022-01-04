<script>
    import LeftPanel from "./LeftPanel.svelte";
    import RightPanel from "./RightPanel.svelte";
    import Login from "./Login.svelte";
    import { loggedin } from "./store.js";
</script>

<div id="main">
    {#if $loggedin}
        <LeftPanel />
        <RightPanel />
    {:else}
        <Login />
    {/if}
</div>

<style>
    :global(:root) {
        --white:#858585;
        --black: #1d1c1f;
        --light: #607196;
        --darker: #29334a;
        --darkest: #120e1b;
        --highlight: #4c2c96;

        background-color: var(--darkest);

        overflow: hidden;
    }

    :global(body) {
        margin: 0px;
        padding: 0px;
    }

    :global(main) {
        margin: 0px;
        padding: 0px;
    }

    :global(h2, h4, p){
        color: var(--white);
    }

</style>
