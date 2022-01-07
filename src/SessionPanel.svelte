<script>
    import SidePanel from "./SidePanel.svelte";
    import Session from "./Session.svelte";
    import { currentSocketUsers, userName } from "./store.js";
    let id = "session";
</script>

<SidePanel myId={id}>
    <h2>Sessions</h2>
    {#each $currentSocketUsers as session ("session-"+session.name)}
        {#if session.name != $userName}
        <Session title={session.name}/>
        {/if}
    {/each}
</SidePanel>