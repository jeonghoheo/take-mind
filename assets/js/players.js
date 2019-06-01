import {
  disableCanvas,
  hideControls,
  resetCanvas,
  enableCanvas,
  showControls
} from "./paint";
import { disableChat, enableChat } from "./chat";
import { getSocket } from "./sockets";

const board = document.getElementById("jsPBoard");
const notifs = document.getElementById("jsNotifs");
const main = document.getElementById("jsMain");

let check = null;
let checkTime = true;

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
  notifs.style.padding = "10px";
  notifs.innerText = text;
};

const cleartNotifs = () => {
  notifs.style.padding = 0;
};

export const handleGameStarted = () => {
  setNotifs("");
  cleartNotifs();
  disableCanvas();
  hideControls();
  enableChat();
};
export const handlePainterNotif = ({ word }) => {
  enableCanvas();
  showControls();
  disableChat();
  setNotifs(`You are the Painter, paint: ${word}`);
};
export const handleGameEnded = () => {
  setNotifs("Game ended.");
  disableCanvas();
  hideControls();
  resetCanvas();
};
export const handleGameStarting = () => setNotifs("Game will start soon");

export const handleTimeout = () => {
  if (checkTime) {
    checkTime = false;
    let time = 30;
    const alramContainer = document.createElement("div");
    alramContainer.id = "timeout";
    const alram = document.createElement("span");
    alramContainer.appendChild(alram);
    main.prepend(alramContainer);
    check = setInterval(() => {
      alram.innerText = `${time}s`;
      time = time - 1;
      if (time < 0) {
        alram.innerText = ``;
        clearInterval(check);
        getSocket().emit(window.events.timeouted);
      }
    }, 1000);
  }
};

export const handleResetTimeout = () => {
  checkTime = true;
  if (check) {
    clearInterval(check);
  }
  const alramContainers = document.getElementById("timeout");
  if (alramContainers) {
    alramContainers.parentNode.removeChild(alramContainers);
  }
};
