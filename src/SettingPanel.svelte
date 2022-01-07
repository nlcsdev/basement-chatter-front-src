<script>
    import SidePanel from "./SidePanel.svelte";

    let id = "setting";

    let placeHolder = "*This is a P2P Chat App prototype, the settings panel merely serves as a placeholder.*"

</script>

<SidePanel myId={id}>
    <h2>Settings</h2>
    <p>
        {placeHolder}
    </p>
</SidePanel>
