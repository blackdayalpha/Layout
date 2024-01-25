let p_user1_input_text = document.getElementById("user_1_input_text");
let p_user2_input_text = document.getElementById("user_2_input_text");

const User1_TextArea = document.getElementById("user_1_textarea");
const User2_TextArea = document.getElementById("user_2_textarea");

let sender;
let reciever;

const messageObject = {
  messages: [],
  addMessage(text, userId) {
    this.messages.push({
      text,
      userId,
      time: formatDate(new Date()),
    });
  },
  clearAllMessages() {
    this.messages = [];
  },
};

function getCurrentTime() {
  const now = new Date();
  return `${now.getDate()}/${
    now.getMonth() + 1
  }/ , ${now.getHours()}:${now.getMinutes()}`;
}

function createSenderMessageElement(text, time) {
  const messageElement = document.createElement("div");
  messageElement.className = "flex justify-end flex-col";
  const senderMessageText = document.createElement("div");
  senderMessageText.className =
    "bg-blue-200 text-black p-2 rounded-l-lg max-w-xs";
  senderMessageText.appendChild(document.createTextNode(text));
  messageElement.appendChild(senderMessageText);
  const timeElement = document.createElement("div");
  timeElement.className =
    "pr-1 pb-1 flex text-xs text-right items-end rounded-r-lg bg-blue-200";
  timeElement.appendChild(document.createTextNode(time));
  messageElement.appendChild(timeElement);
  return messageElement;
}
function createReceiverMessageElement(text, time) {
  const messageElement = document.createElement("div");
  messageElement.className =
    "flex flex-col w-max bg-gray-300 text-black max-w-xs rounded-lg p-1";
  const recieverMessageElement = document.createElement("div");
  recieverMessageElement.className = "p-1";
  recieverMessageElement.appendChild(document.createTextNode(text));
  messageElement.appendChild(recieverMessageElement);
  const timeElement = document.createElement("div");
  timeElement.className = "flex text-xs text-right items-end";
  timeElement.appendChild(document.createTextNode(time));
  messageElement.appendChild(timeElement);
  return messageElement;
}

function F_User1_Message_Send() {
  let length = messageObject.messages.length;
  let textContent = p_user1_input_text.value;
  if (textContent.length > 0) {
    messageObject.addMessage(p_user1_input_text.value, 1);
    console.log(User1_TextArea);
    const senderElement = createSenderMessageElement(
      textContent,
      messageObject.messages[length].time
    );
    const recieverElement = createReceiverMessageElement(
      textContent,
      messageObject.messages[length].time
    );

    console.log(User1_TextArea.children);
    appendSenderMessageElement(User1_TextArea.children[0], senderElement);
    appendRecieverMessageElement(User2_TextArea.children[0], recieverElement);
    scrollToBottom();
    p_user1_input_text.value = "";
    console.log(messageObject.messages);
  }
}

function appendSenderMessageElement(parent, element) {
  parent.appendChild(element);
  console.log(element);
}
function appendRecieverMessageElement(parent, element) {
  parent.appendChild(element);
  console.log(element);
}

function F_User2_Message_Send() {
  let length = messageObject.messages.length;
  let textContent = p_user2_input_text.value;
  if (textContent.length > 0) {
    messageObject.addMessage(p_user1_input_text.value, 2);
    console.log(User2_TextArea);
    const senderElement = createSenderMessageElement(
      textContent,
      messageObject.messages[length].time
    );
    const recieverElement = createReceiverMessageElement(
      textContent,
      messageObject.messages[length].time
    );

    console.log(User2_TextArea.children);
    appendSenderMessageElement(User2_TextArea.children[0], senderElement);
    appendRecieverMessageElement(User1_TextArea.children[0], recieverElement);
    p_user2_input_text.value = "";
    scrollToBottom();
    console.log(messageObject.messages);
  }
}
const reset = (e) => {
  console.log(e.target.className);
  if (e.target.classList.contains("left")) {
    User1_TextArea.children[0].innerHTML = "";
  } else {
    User2_TextArea.children[0].innerHTML = "";
  }
};

p_user1_input_text.addEventListener("keypress", (event) => {
  // event.preventDefault();
  if (event.key === "Enter") {
    console.log("Enter");
    F_User1_Message_Send();
  }
});

p_user2_input_text.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    console.log("Enter");
    F_User2_Message_Send();
  }
});

function scrollToBottom() {
  const scrollContainer = document.getElementById("user_1_textarea");
  const scrollContainer2 = document.getElementById("user_2_textarea");
  scrollContainer.scrollTop = scrollContainer.scrollHeight;
  scrollContainer2.scrollTop = scrollContainer2.scrollHeight;
}

const clear = document.getElementsByClassName("clearBtn");

console.log(clear);

// for (let i = 0; i < clear.length; i++) {
//   clear[i].addEventListener("click", reset);
// }

function formatDate(date) {
  const options = {
    day: "numeric",
    month: "short",
    year: "2-digit",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);
  return formattedDate;
}

// Example usage:
const currentDate = new Date();
const formattedDate = formatDate(currentDate);
console.log(typeof formattedDate);

// const Message = {
//   text: "Message",
//   userId: 1,
//   Time: getCurrentTime(),
// };
// const messageObject = {
//   messages: [],
//   FaddMessage(text, userId) {
//     this.messages.push({
//       text,
//       userId,
//       time: getCurrentTime(),
//     });
//   },
//   FclearAllMessages() {
//     this.messages = [];
//   },
// };

// function F_User1_Message_Send() {
//   messageObject.FAddMessage("How are you??", 1);
//   console.log(messageObject.message);
//   alert("U1 message sent");
// }

// function F_User2_Message_Send() {
//   messageObject.FaddMessage("I am Good", 2);
//   alert("U2 message sent");
// }

// const getCurrentTime = () => {
//   const now = new Date();
//   return `${now.getHours()}:${now.getMinutes()}`;
// };
