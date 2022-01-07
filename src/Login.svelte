<script>
    import { userName } from "./store.js";
    import { LogIn } from "./ConnectionHandle.js";
    import { fade } from "svelte/transition";

    const onEnter = (event) => {
        if(event.keyCode == 13){
            LogIn();
        }
    }

</script>

<div id="login-panel" transition:fade="{{duration: 400}}">
    <h1>Basement Chatter</h1>
    <input bind:value={$userName} on:keydown={onEnter}>
    <button on:click={LogIn}>Start</button>
    <div class="clear"/>
</div>

<style>
    #login-panel{
        display: inline-block;
        background-color: whitesmoke;
        transform: translate(calc(50vw - 50%), calc(40vh - 50%));
        border-radius: 15px;
        padding: 1em;
    }

    #login-panel h1{
        margin: 0px 0px 0.67em 0px;
    }

    #login-panel button{
        float: right;
    }

    :global(.clear){
        float: clear;
    }

</style>