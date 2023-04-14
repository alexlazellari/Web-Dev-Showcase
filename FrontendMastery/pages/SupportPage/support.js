//Variables
const email = document.querySelector("#email");
const pwd = document.querySelector("#password");
const cpwd = document.querySelector("#cpassword");
const tel = document.querySelector("#tel");
const excited = document.querySelector("#excited");
const username = document.querySelector("#username");
const mismatchPwds = document.querySelector(".input-group__error");

email.addEventListener("input", (event) => {
  if (email.validity.typeMismatch) {
    email.setCustomValidity("Please provide a valid email");
  } else {
    email.setCustomValidity("");
  }
});

pwd.addEventListener("input", (event) => {
  if (pwd.validity.patternMismatch) {
    pwd.setCustomValidity(
      "Password must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters."
    );
    console.log("in");
  } else {
    pwd.setCustomValidity("");
  }

  if (!(cpwd.value === "")) {
    if (cpwd.value !== pwd.value) {
      mismatchPwds.textContent = "Passwords do not match.";
      cpwd.setCustomValidity("Passwords do not match.");
    } else {
      mismatchPwds.textContent = "";
    }
  }
});

cpwd.addEventListener("input", (event) => {
  if (cpwd.validity.patternMismatch) {
    cpwd.setCustomValidity(
      "Password must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters."
    );
  } else {
    cpwd.setCustomValidity("");
  }

  if (!(pwd.value === "")) {
    if (cpwd.value !== pwd.value) {
      mismatchPwds.textContent = "Passwords do not match.";
      cpwd.setCustomValidity("Passwords do not match.");
    } else {
      mismatchPwds.textContent = "";
    }
  }
});

tel.addEventListener("input", (event) => {
  if (tel.validity.tooShort) {
    tel.setCustomValidity(
      "Telephone number is too short. Must be at least 8 characters."
    );
  }

  if (tel.validity.patternMismatch) {
    tel.setCustomValidity("Telephone should only contain numbers.");
  }
});

excited.addEventListener("input", (event) => {
  if (excited.validity.rangeOverflow) {
    excited.setCustomValidity("The value should be lower or equal to 10.");
  } else {
    excited.setCustomValidity("");
  }

  if (excited.validity.rangeOverflow) {
    excited.setCustomValidity("The value should be greater or equal to 1.");
  } else {
    excited.setCustomValidity("");
  }
});

username.addEventListener("input", (event) => {
  if (username.validity.patternMismatch) {
    username.setCustomValidity(
      "Username must not contain space or special characters and at least 8 characters long."
    );
  } else {
    username.setCustomValidity("");
  }
});
