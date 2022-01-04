<script>
    import {
        sidebarActive,
        messageStack,
        targetName,
        msgBarText,
        peerConnections,
    } from "./store.js";
    import { MovePosition } from "./ctransitions.js";
    //import { msgSend } from "./ConnectionHandle.js";
    import MsgContainer from "./MsgContainer.svelte";

    $: activeMessageHistory = $messageStack[$targetName];

    const onEnterMsg = (event) => {
        if (event.keyCode == 13) {
            $peerConnections[$targetName].msgSend($msgBarText);
            msgBarText.set("");
        }
    };
</script>

<div
    id="left-panel"
    class={$sidebarActive ? "sidebar-active" : "sidebar-inactive"}
>
    <div id="chat-history">
        {#if !!activeMessageHistory}
            {#each activeMessageHistory as msg (msg.time)}
                <MsgContainer srcName={msg.from} text={msg.text} />
            {/each}
        {/if}
    </div>
        <div
            id="chat-input-container"
            in:MovePosition|local={{
                fy: -56,
                ty: 0,
                top: false,
                duration: 400,
            }}
        >
            <input
                id="chat-input"
                type="text"
                bind:value={$msgBarText}
                on:keydown={onEnterMsg}
            />
        </div>
</div>

<style>
    #left-panel {
        position: absolute;
        top: 0%;
        transition: 1s;
        height: 100vh;
    }

    .sidebar-active {
        width: 70vw;
    }

    .sidebar-inactive {
        width: 100vw;
    }

    #chat-input-container {
        position: absolute;
        left: 0%;
        bottom: 0%;
        width: 100%;
        background-color: var(--darker);
    }

    #chat-input {
        margin: 10px;
        width: calc(100% - 20px);
        border-color: var(--light);
        border-radius: 25px;
        background-color: var(--light);
        outline: none;
    }
</style>
