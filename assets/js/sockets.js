import { handleNewUser, handleDisconnected } from "./notifications";

let socket = null;

export const getSocket = () => socket;

export const updateSocket = aSocket => (socket = aSocket);

export const initSockets = aSocket => {
  const { events } = window;
  updateSocket(aSocket);
  socket.on(events.newUser, handleNewUser);
  socket.on(events.disconnected, handleDisconnected);
};
