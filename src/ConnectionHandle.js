import { currentSocketUsers, peerConnections, loggedin, userName, targetName, messageStack } from "./store.js";
import PeerConnections from "./PeerConnection.js";
const signalingServerUrl = "wss://basement-chatter-signal-server.rcp.r9n.co/";
//const signalingServerUrl = "ws://localhost:3100";
const mySocket = new WebSocket(signalingServerUrl);

export const socketSend = data => {
    mySocket.send(JSON.stringify(data));
}

let userName_value;
// let targetName_value;
let currentSocketUsers_value;
let messageStack_value;
let peerConnections_value;

userName.subscribe(val => {
    userName_value = val;
});

// targetName.subscribe(val => {
//     targetName_value = val;
// });

currentSocketUsers.subscribe(val => {
    currentSocketUsers_value = val;
});

messageStack.subscribe(val => {
    messageStack_value = val;
});

peerConnections.subscribe(val => {
    peerConnections_value = val;
});

mySocket.onmessage = async socketMsg => {

    let data = {};

    try {
        data = JSON.parse(socketMsg.data);
    } catch (e) {
        console.log("Error: unable to parse socket message data.");
    }

    console.log("Data from server:");
    console.log(socketMsg.data);

    const { type, to, from, offer, answer, ice, currentUsers, user, message } = data;

    let targetConnection;

    if (!!from) {
        targetConnection = peerConnections_value[from];
        if (!targetConnection) {
            let pcObj = new PeerConnections(userName_value, from);
            pcObj.StartPeerConnect();
            peerConnections.set({ ...peerConnections_value, [from]: pcObj });
            targetConnection = peerConnections_value[from];
        }
        console.log("Checking for target pc truth value: %s", !!targetConnection);
    }

    switch (type) {

        case "success":
            loggedin.set(true);
            currentSocketUsers.set(currentUsers);
            break;

        case "newConnection":
            currentSocketUsers.set([...currentSocketUsers_value, user]);
            break;

        case "offer":
            //console.log("Offer socket msg - from: %s to: %s targetConnection: %s", from, to, targetConnection);

            targetConnection.SendAnswer(from, offer);

            break;

        case "answer":
            //console.log("answer socket msg - from: %s to: %s targetConnection: %s", from, to, targetConnection);
            targetConnection.ReceivedAnswer(answer);
            break;

        case "ice":
            //console.log("ice socket msg - from: %s to: %s targetConnection: %s", from, to, targetConnection);
            targetConnection.ReceivedIce(ice);
            break;

        case "leave":
            let updatedUsers = [...currentSocketUsers_value];
            delete updatedUsers[from];
            currentSocketUsers.set(updatedUsers);
            break;

        case "error":
        case "fail":
        case "conenct":
        default:
            console.log(message);
            break;
    }
}

mySocket.onclose = () => {
    mySocket.close();
}

export const LogIn = () => {
    socketSend({
        type: "login",
        from: userName_value
    });
}