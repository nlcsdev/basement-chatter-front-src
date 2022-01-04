<script>
    import {
        peerConnections,
        userName,
        targetName,
        avatarURL,
        messageStack
    } from "./store.js";
    import PeerConnections from "./PeerConnection.js";
    //import { StartPeerConnect } from "./ConnectionHandle.js";

    export let title;
    let maxCharSessionMsg = 20;
    $: SessionMsg = () => {
        let existingStack = $messageStack[title];
        if(!existingStack){
            return "Start a conversation!"
        }else{
            let currentText = existingStack[existingStack.length-1].text;
            let shortenText = currentText;
            if(currentText.length > 20){
                shortenText = currentText.slice(0,20) + "...";
            }
             
            return shortenText;
        }
    }

    const onClickSession = () => {
        targetName.set(title);
        let currentConnection = $peerConnections[title];
        if (!currentConnection) {
            let pcObj = new PeerConnections($userName, title);
            pcObj.StartPeerConnect();
            pcObj.SendOffer();
            peerConnections.set({ ...peerConnections, [title]: pcObj });
        }
    };
</script>

<button
    on:click={onClickSession}
    class={"session-comp " +
        ($targetName == title
            ? "session-comp-active"
            : "session-comp-inactive")}
>
    <img src={avatarURL(title)} />
    <div class="session-info">
        <h4>{title}</h4>
        <p>{SessionMsg()}</p>
    </div>
</button>

<style>
    .session-comp {
        padding: 0px;
        background-color: transparent;
        display: flex;
        justify-content: space-between;
        align-items:flex-end;
        height: 15%;
    }

    .session-comp-active {
        border: 1px solid var(--white);
        border-radius: 15px;
    }

    .session-comp-inactive {
        border: 1px solid transparent;
    }

    .session-info {
        padding-right: 9%;
    }

    .session-comp img {
        object-fit: contain;
        height: 100%;
    }

    /* .session-divider {
        width: 100%;
        margin: 0px;
        height: 0px;
        border: 1px solid #333;
        border-radius: 1px;
    } */
</style>
