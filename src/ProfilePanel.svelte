<script>

    import { userName, avatarURL, sidebarActive } from "./store.js";
    import SidePanel from "./SidePanel.svelte";
    import { LogOut } from "./ConnectionHandle";

    let id = "profile";

</script>

<SidePanel myId={id}>
    <h2>Profile</h2>
    <img alt="profile picture" id="profile_picture" src={avatarURL($userName)}>
    <p>{$userName}</p>
    <button on:click={ () => {
        sidebarActive.set(false); 
        LogOut();
        }}>
        Sign Out
    </button>
</SidePanel>