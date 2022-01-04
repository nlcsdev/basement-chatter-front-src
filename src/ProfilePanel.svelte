<script>

    import { userName, avatarURL } from "./store.js";
    import SidePanel from "./SidePanel.svelte";

    let id = "profile";
</script>

<SidePanel myId={id}>
    <h2>Profile</h2>
    <img alt="profile picture" id="profile_picture" src={avatarURL($userName)}>
    <p>{$userName}</p>
    <button>Sign Out</button>
</SidePanel>