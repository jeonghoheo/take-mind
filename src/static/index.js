// eslint-disable-next-line no-undef
const socket = io("/");

socket.on("hello", () => console.log("Somebody joined"));

setTimeout(() => socket.emit("helloGUys"), 3000);
