// Variables
const formDOM = document.querySelector(".form");
const responseMessageDOM = document.querySelector(".response-message");

// Handle from submission
formDOM.addEventListener("submit", (e) => {
  e.preventDefault();

  let { activity, type, participants } = getFormData(e.target);

  let data = {
    activity: activity,
    type: type,
    participants: participants,
  };

  resetFormValues(e.target);

  fetch("https://www.boredapi.com/api/suggestion", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        if (!responseMessageDOM.classList.contains("response-message--info")) {
          alertMessage("response-message--info", "response-message--success");
        }
      } else {
        if (
          !responseMessageDOM.classList.contains("response-message--success")
        ) {
          alertMessage("response-message--success", "response-message--info");
        }
      }
      return response.json();
    })
    .then((data) => {
      if (data.error) {
        if (!responseMessageDOM.classList.contains("response-message--info")) {
          alertMessage("response-message--info", "response-message--success");
        }
        responseMessageDOM.textContent = "Please fill the form properly.";
      } else {
        responseMessageDOM.textContent = data.message;
      }
      setTimeout(hideAlertMessage, 4000);
    })
    .catch((error) => console.error(error));
});

// Get form data
function getFormData(target) {
  let activity = target.activity.value;
  let type = target.type.value;
  let participants = target.participants.value;
  return { activity, type, participants };
}

// Set the values of the form ""
function resetFormValues(target) {
  target.activity.value = "";
  target.type.value = "recreational";
  target.participants.value = "";
}

//set alert message
function alertMessage(addClass, removeClass) {
  responseMessageDOM.classList.add(addClass);
  responseMessageDOM.classList.remove(removeClass);
}

//hide alert message
function hideAlertMessage() {
  responseMessageDOM.textContent = "";
}
