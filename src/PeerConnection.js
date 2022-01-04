import { messageStack } from "./store.js"
import { socketSend } from "./ConnectionHandle.js";

export default class PeerConnection {

    static Config = {
        'iceServers': [{ 'urls': 'stun:stun.l.google.com:19302' }]
    };

    constructor(owner,target){
        this.pc = new RTCPeerConnection(PeerConnection.Config);
        this.owner = owner;
        this.target = target;
        this.connecting = false;
        this.messageStack_value = [];

        messageStack.subscribe(val => {
            this.messageStack_value = val;
        });
    }

    handleMessages = ({ data }) => {
        console.log("Handling Peer Msgs:");
        console.log(data);
        const message = JSON.parse(data);
    
        const { time, from: src } = message;
        if (!!time) {
            if (!!this.messageStack_value[src]) {
                messageStack.set({ ...this.messageStack_value, [src]: [...this.messageStack_value[src], message] });
            } else {
                messageStack.set({ ...this.messageStack_value, [src]: [message] });
            }
        }
    }

    SendOffer = async () => {
        let offer = await this.pc.createOffer();
        await this.pc.setLocalDescription(new RTCSessionDescription(offer));
        socketSend({
            type: "offer",
            offer,
            to: this.target,
            from: this.owner
        });
    }

    SendAnswer = async (to, offer) => {
        await this.pc.setRemoteDescription(new RTCSessionDescription(offer));
        let answer = await this.pc.createAnswer();
        await this.pc.setLocalDescription(new RTCSessionDescription(answer));

        this.target = to;
        socketSend({
            type: "answer",
            answer,
            to,
            from: this.owner
        });
    }

    ReceivedAnswer = async (answer) => {
        await this.pc.setRemoteDescription(new RTCSessionDescription(answer));
    }

    ReceivedIce = (ice) => {
        this.pc.addIceCandidate(new RTCIceCandidate(ice));
    }

    StartPeerConnect = async () => {
        let channelInfo = {
            own: this.owner,
            target: this.target
        };
        this.dc = this.pc.createDataChannel(JSON.stringify(channelInfo));
        this.dc.onmessage = this.handleMessages;
        this.dc.onopen = () => {
            console.log("Host: Data channel is open");
        };

        this.pc.onicecandidate = ({ candidate }) => {
            if (!!candidate && this.target != "") {
                socketSend({
                    type: "ice",
                    ice: candidate,
                    to: this.target,
                    from: this.owner
                });
            }       
        };

        this.pc.ondatachannel = ({ channel }) => {
            this.dc = channel;
            this.dc.onmessage = this.handleMessages;
            this.dc.onopen = () => {
                console.log("Remote: Data channel open.");
            }
        };
    }

    channelSend = data => {
        this.dc.send(JSON.stringify(data));
    }

    msgSend = (msgStr) => {
        let data = {
            time: new Date().toString(),
            from: this.owner,
            text: msgStr
        };
    
        if (!!this.messageStack_value[this.target]) {
            messageStack.set({ ...this.messageStack_value, [this.target]: [...this.messageStack_value[this.target], data] });
        } else {
            messageStack.set({ ...this.messageStack_value, [this.target]: [data] });
        }
        this.channelSend(data);
    }

}