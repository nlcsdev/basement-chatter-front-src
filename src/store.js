import { setContext, writable } from 'svelte/store';

export const sidebarActive = writable(false);

export const activePanel = writable("profile");

export const loggedin = writable(false);

export const currentSocketUsers = writable([]);

export const userName = writable("");

export const targetName = writable("");

export const peerConnecting = writable(false);

export const peerConnected = writable(false);

export const peerConnections = writable({});

export const messageStack = writable({});

export const msgBarText = writable("");

export const sidebtnActive = writable(false);

export const avatarURL = (name) => { return `https://avatars.dicebear.com/api/personas/${name}.svg`}