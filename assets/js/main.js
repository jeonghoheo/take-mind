const body = document.querySelector("body");
const loginForm = document.getElementById("jsLogin");

const NICKNAME = "nickname";
const LOGED_OUT = "loggedOut";
const LOGED_IN = "loggedIn";

const nickname = localStorage.getItem(NICKNAME);

if (nickname === null) {
  body.className = LOGED_OUT;
} else {
  body.className = LOGED_IN;
}

const handleFormSubmit = e => {
  e.preventDefault();
  const input = loginForm.querySelector("input");
  const { value } = input;
  input.value = "";
  localStorage.setItem(NICKNAME, value);
};

if (loginForm) {
  loginForm.addEventListener("submit", handleFormSubmit);
}
