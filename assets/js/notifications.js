const body = document.querySelector("body");
const notification = document.getElementsByClassName("notification");

const fireNotification = (text, color) => {
  const notification = document.createElement("div");
  notification.innerText = text;
  notification.style.backgroundColor = color;
  notification.className = "notification";
  body.appendChild(notification);
};

const deleteNoti = () => {
  if (notification) {
    while (notification.length > 0) {
      notification[0].parentNode.removeChild(notification[0]);
    }
  }
};

export const handleNewUser = ({ nickname }) => {
  fireNotification(`${nickname} just logined!`, "rgb(0, 122, 255)");
  setTimeout(deleteNoti, 2000);
};

export const handleDisconnected = ({ nickname }) => {
  fireNotification(`${nickname} just left!`, "rgb(255, 204, 0)");
  setTimeout(deleteNoti, 2000);
};
