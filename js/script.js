"use-strict";

const logInSection = document.querySelector("#logIn");
const logInInput = document.querySelector("#login-input-name");
const logInButton = document.querySelector(".logIn__button");
const logInErrorText = document.querySelector(".welcome__error-text");

const appSection = document.querySelector("#app");

const users = [
  {
    name: "fran",
    balance: 0,
    activity: [],
  },
];

class App {
  constructor() {
    let name = "";
    let isLoggedIn = false;
    let balance = 0;

    this.#init();
  }

  // User Data Methods
  #userExists(username) {
    return users.filter((user) => user.name === username).length > 0;
  }

  // LogIn Methods

  #getIsLoggedIn() {
    return localStorage.getItem("isLogged") === "true" || false;
  }

  #logIn() {
    const usernameValue = logInInput.value;
    localStorage.setItem("isLogged", true);
    if (usernameValue.length === 0) {
      return this.#showErrorMessage(logInErrorText, "Enter username");
    }
    if (!this.#userExists(usernameValue)) {
      return this.#showErrorMessage(logInErrorText, "User not registered");
    }
    this.#showAppView();
  }

  #logOut() {
    localStorage.setItem("isLogged", false);
    this.#showLogInView();
  }

  // UI Controls
  #addEle(domElement) {
    domElement.style.display = "flex";
  }

  #showEle(domElement) {
    logInSection.classList.remove("hidden");
  }

  #updateEle(domElement) {}

  #removeEle(domElement) {
    domElement.style.display = "none";
  }

  #hideEle(domElement) {
    logInSection.classList.add("hidden");
  }

  #hideAndRemove(domElement) {
    this.#hideEle(domElement);
    setTimeout(() => this.#removeEle(domElement), 1000);
  }

  #addAndShow(domElement) {
    this.#addEle(domElement);
    setTimeout(() => this.#showEle(domElement), 500);
  }

  #showLogInView() {
    this.#hideAndRemove(appSection);
    this.#addAndShow(logInSection);
  }

  #showAppView() {
    this.#hideAndRemove(logInSection);
    this.#addAndShow(appSection);
  }

  #showErrorMessage(domElement, message) {
    this.#addAndShow(domElement);
    domElement.innerHTML = message;
  }

  //   UNIT

  #init() {
    const isLoggedIn = this.#getIsLoggedIn();
    isLoggedIn ? this.#showAppView() : this.#showLogInView();
    this.#addEventListeners();
  }

  #addEventListeners() {
    logInButton.addEventListener("click", () => {
      this.#logIn();
    });
  }
}

const app = new App();
