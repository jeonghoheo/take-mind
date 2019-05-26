import express from "express";
import socketIO from "socket.io";
import logger from "morgan";
import socketController from "./socketController";
import events from "./events";

const PORT = 4000;
const app = express();
app.set("view engine", "pug");
// 템플린 엔진 설정하기
app.set("views", `${__dirname}/views`);
// views폴더 경로 재설정하기
app.use(express.static(`${__dirname}/static`));
// static 파일 경로 설정하기
app.use(logger("dev"));
app.get("/", (req, res) =>
  res.render("home", { events: JSON.stringify(events) })
);

const handleListening = () => {
  console.log(__dirname + "static");
  console.log(`✅ Server running: http://localhost:${PORT}`);
};

const server = app.listen(PORT, handleListening);

const io = socketIO.listen(server);

io.on("connection", socket => socketController(socket));
