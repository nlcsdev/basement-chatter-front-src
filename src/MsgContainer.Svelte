<script>
    import { avatarURL } from "./store.js";
    export let srcName;
    export let text;
</script>

<div class="MsgContainer">
    <img src={avatarURL(srcName)} />
    <p>{text}</p>
</div>

<style>
    .MsgContainer {
        display: flex;
        align-items: center;
        min-width: 30%;
        min-height: 10vh;
    }

    .MsgContainer p {
        background-color: var(--light);
        border-radius: 5px;
        padding: 10px;
        margin: 1em 9vw 1em 0px;
        white-space: break-spaces;
        color: var(--black);
    }

    .MsgContainer img {
        max-height: 10vh;
        object-fit: contain;
    }
</style>
