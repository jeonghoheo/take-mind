import events from "./events";
import { chooseWord } from "./words";

let sockets = [];
let inProgress = false;
let word = null;
let painter = null;
let timecheck = true;

const choosePainter = () => sockets[Math.floor(Math.random() * sockets.length)];

const socketController = (socket, io) => {
  const broadcast = (event, data) => socket.broadcast.emit(event, data);
  const superBroadcast = (event, data) => io.emit(event, data);
  const sendPlayerUpdate = () => {
    superBroadcast(events.playerUpdate, { sockets });
  };

  const startGame = () => {
    if (sockets.length > 1 && timecheck) {
      if (inProgress === false) {
        timecheck = false;
        inProgress = true;
        painter = choosePainter();
        word = chooseWord();
        superBroadcast(events.gameStarting);
        setTimeout(() => {
          superBroadcast(events.gameStarted);
          io.to(painter.id).emit(events.painterNotif, { word });
          superBroadcast(events.timeout);
        }, 4000);
      }
    }
  };

  const endGame = () => {
    inProgress = false;
    superBroadcast(events.gameEnded);
    superBroadcast(events.timeouted);
    if (!timecheck) {
      timecheck = true;
      setTimeout(() => {
        if (sockets.length > 1) {
          startGame();
        }
      }, 2000);
    }
  };

  const addPoints = id => {
    sockets = sockets.map(socket => {
      if (socket.id === id) {
        socket.points += 10;
      }
      return socket;
    });
    sendPlayerUpdate();
    superBroadcast(events.timeouted);
    endGame();
  };

  socket.on(events.timeouted, endGame);

  socket.on(events.setNickname, ({ nickname }) => {
    socket.nickname = nickname;
    sockets.push({ id: socket.id, points: 0, nickname: nickname });
    broadcast(events.newUser, { nickname });
    sockets = sockets.map(socket => {
      socket.points = 0;
      return socket;
    });
    sendPlayerUpdate();
    startGame();
  });

  socket.on(events.disconnect, () => {
    broadcast(events.timeouted);
    sockets = sockets.filter(aSocket => aSocket.id !== socket.id);
    if (sockets.length === 1) {
      endGame();
    } else if (painter) {
      if (painter.id === socket.id) {
        endGame();
      }
    }
    broadcast(events.disconnected, { nickname: socket.nickname });
    sendPlayerUpdate();
  });

  socket.on(events.sendMsg, ({ message }) => {
    if (message === word) {
      superBroadcast(events.newMsg, {
        message: `Winner is ${socket.nickname}, word was: ${word}`,
        nickname: "Bot"
      });
      addPoints(socket.id);
    } else {
      broadcast(events.newMsg, { message, nickname: socket.nickname });
    }
  });

  socket.on(events.beginPath, ({ x, y }) =>
    broadcast(events.beganPath, { x, y })
  );

  socket.on(events.strokePath, ({ x, y, color, size }) => {
    broadcast(events.strokedPath, { x, y, color, size });
  });

  socket.on(events.fill, ({ color }) => {
    broadcast(events.filled, { color });
  });

  socket.on(events.fill, ({ color }) => {
    broadcast(events.filled, { color });
  });
};

export default socketController;
