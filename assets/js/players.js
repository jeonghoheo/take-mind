import {
  disableCanvas,
  hideControls,
  resetCanvas,
  enableCanvas,
  showControls
} from "./paint";
import { disableChat } from "./chat";

const board = document.getElementById("jsPBoard");
const notifs = document.getElementById("jsNotifs");

const addPlayers = players => {
  board.innerHTML = "";
  players.forEach(player => {
    const playerElement = document.createElement("span");
    playerElement.innerText = `${player.nickname}: ${player.points}`;
    board.appendChild(playerElement);
  });
};

export const handlePlayerUpdate = ({ sockets }) => addPlayers(sockets);

const setNotifs = text => {
  notifs.innerText = text;
};

export const handleGameStarted = () => {
  setNotifs("");
  disableCanvas();
  hideControls();
};
export const handlePainterNotif = ({ word }) => {
  enableCanvas();
  showControls();
  disableChat();
  notifs.innerText = `You are the Painter, paint: ${word}`;
};
export const handleGameEnded = () => {
  setNotifs("Game ended.");
  disableCanvas();
  hideControls();
  resetCanvas();
};
export const handleGameStarting = () => setNotifs("Game will start soon");
