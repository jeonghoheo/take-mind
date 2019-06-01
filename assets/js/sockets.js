import { handleNewUser, handleDisconnected } from "./notifications";
import { handleNewMessage } from "./chat";
import {
  handleBeganPath,
  handleStrokedPath,
  handleFilled,
  handleLineWeight
} from "./paint";
import {
  handlePlayerUpdate,
  handleGameStarted,
  handlePainterNotif,
  handleGameEnded,
  handleGameStarting,
  handleTimeout,
  handleResetTimeout
} from "./players";

let socket = null;

export const getSocket = () => socket;

export const updateSocket = aSocket => (socket = aSocket);

export const initSockets = aSocket => {
  const { events } = window;
  updateSocket(aSocket);
  socket.on(events.newUser, handleNewUser);
  socket.on(events.disconnected, handleDisconnected);
  socket.on(events.newMsg, handleNewMessage);
  socket.on(events.beganPath, handleBeganPath);
  socket.on(events.strokedPath, handleStrokedPath);
  socket.on(events.filled, handleFilled);
  socket.on(events.changeLineWidth, handleLineWeight);
  socket.on(events.playerUpdate, handlePlayerUpdate);
  socket.on(events.gameStarted, handleGameStarted);
  socket.on(events.painterNotif, handlePainterNotif);
  socket.on(events.gameEnded, handleGameEnded);
  socket.on(events.gameStarting, handleGameStarting);
  socket.on(events.timeout, handleTimeout);
  socket.on(events.timeouted, handleResetTimeout);
};
