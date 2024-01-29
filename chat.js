const GUser1MessageInput = document.getElementById("user_1_input_text");
const GUser2MessageInput = document.getElementById("user_2_input_text");

// const GUser1ChattingArea = document.getElementById("user_1_textarea");
// const GUser2ChattingArea = document.getElementById("user_2_textarea");

// const templatedMessageLeft = document.getElementById("temp-placeholder-text-left");
// const GTemplatedMessageRight = document.getElementById("temp-placeholder-text-right");



const GMessageObj = {
    messages: [],
    addMessage(text, userId) {
        if (text.trim()) {
            this.messages.push({
                text,
                userId,
                time: pvtFormatDate(new Date()),
            });
        } else {
            console.error("Please enter a valid message");
        }
    }
};

GUser1MessageInput.addEventListener("keypress", pvtUser1EnterKeyEvent);
GUser2MessageInput.addEventListener("keypress", pvtUser2EnterKeyEvent);


function pvtCreateMessageElement(text, time, isSender) {
    const LMessageElementDiv = document.createElement("div");
    const classes = ["flex", "flex-col", "text-black", "max-w-xs", "rounded-lg", "break-words"];
    if (isSender) {
        classes.push("justify-self-end", "bg-blue-300", "w-max");
    } else {
        classes.push("w-max", "bg-gray-300");
    }

    LMessageElementDiv.className = classes.join(" ");

    const LContentElement = document.createElement("div");
    LContentElement.className = "px-2";


    const LTextPara = document.createElement("p");
    LTextPara.className = 'whitespace-pre-line';
    LTextPara.appendChild(document.createTextNode(text));
    LContentElement.appendChild(LTextPara);
    LMessageElementDiv.appendChild(LContentElement);


    const LTimeElement = document.createElement("div");
    LTimeElement.className = "p-2 py-1 flex text-xs text-right";
    LTimeElement.appendChild(document.createTextNode(time));
    LMessageElementDiv.appendChild(LTimeElement);

    return LMessageElementDiv;
}

function pvtApplyTemplateLayer(p_varPlaceholderMessage) {
    p_varPlaceholderMessage.classList.remove("hidden");
}

function pvtRemoveTemplateLayer(p_varPlaceholderMessage) {
    p_varPlaceholderMessage.classList.add("hidden");
}

function pvtAppendMessageToConversation(p_varParent, p_varMessageElement) {
    p_varParent.appendChild(p_varMessageElement);
}

function pvtSendMessage(p_strText, p_intUserId, p_varSenderArea, p_varReceiverArea) {
    if (p_varReceiverArea.childElementCount === 0 || p_varSenderArea.childElementCount === 0) {
        const LPlaceholderTextLeft = document.getElementById("temp-placeholder-text-left");
        const LPlaceholderTextRight = document.getElementById("temp-placeholder-text-right");
        pvtRemoveTemplateLayer(LPlaceholderTextLeft);
        pvtRemoveTemplateLayer(LPlaceholderTextRight);
    }

    const LMessageObjectLength = GMessageObj.messages.length;
    const LIsUser1Bool = p_intUserId === 1;

    const LSenderElement = pvtCreateMessageElement(p_strText, GMessageObj.messages[LMessageObjectLength - 1].time, LIsUser1Bool);
    const LReceiverElement = pvtCreateMessageElement(p_strText, GMessageObj.messages[LMessageObjectLength - 1].time, !LIsUser1Bool);

    LSenderElement['title'] = LIsUser1Bool ? 'You' : 'User' + p_intUserId;
    LReceiverElement['title'] = !LIsUser1Bool ? 'You' : 'User' + p_intUserId;

    pvtAppendMessageToConversation(LIsUser1Bool ? p_varSenderArea : p_varReceiverArea, LSenderElement);
    pvtAppendMessageToConversation(LIsUser1Bool ? p_varReceiverArea : p_varSenderArea, LReceiverElement);

    pvtScrollToBottom();
    GUser1MessageInput.value = "";
    GUser2MessageInput.value = "";
}

function pvtUser1MessageSend() {
    const LTextInputFromUser1 = GUser1MessageInput.value;
    const LUser1TextConversationArea = document.getElementById("user_1_text_conversation_area");
    const LUser2TextConversationArea = document.getElementById("user_2_text_conversation_area");

    if (LTextInputFromUser1.trim().length > 0) {
        GMessageObj.addMessage(LTextInputFromUser1, 1);
        pvtSendMessage(LTextInputFromUser1, 1, LUser1TextConversationArea, LUser2TextConversationArea);
    } else {
        alert("Please enter a message");
    }
}

function pvtUser2MessageSend() {
    const LTextInputFromUser2 = GUser2MessageInput.value;

    const LUser1TextConversationArea = document.getElementById("user_1_text_conversation_area");
    const LUser2TextConversationArea = document.getElementById("user_2_text_conversation_area");

    if (LTextInputFromUser2.trim().length > 0) {
        GMessageObj.addMessage(LTextInputFromUser2, 2);
        pvtSendMessage(LTextInputFromUser2, 2, LUser2TextConversationArea, LUser1TextConversationArea);
    } else {
        alert('Please enter a message');
    }
}

const reset = (e) => {
    const LPlaceholderTextLeft = document.getElementById("temp-placeholder-text-left");
    const LPlaceholderTextRight = document.getElementById("temp-placeholder-text-right");

    const LUser1TextConversationArea = document.getElementById("user_1_text_conversation_area");
    const LUser2TextConversationArea = document.getElementById("user_2_text_conversation_area");

    if (e.target.classList.contains("left")) {
        LUser1TextConversationArea.innerHTML = "";
        pvtApplyTemplateLayer(LPlaceholderTextLeft);
    } else {
        LUser2TextConversationArea.innerHTML = "";
        pvtApplyTemplateLayer(LPlaceholderTextRight);
    }
};


function pvtUser1EnterKeyEvent(event) {
    if (event.shiftKey && event.key === 'Enter') {
        return;
    } else if (event.key === "Enter") {
        event.preventDefault();
        pvtUser1MessageSend();
    }
}

function pvtUser2EnterKeyEvent(event) {
    if (event.shiftKey && event.key === 'Enter') {
        return;
    } else if (event.key === "Enter") {
        event.preventDefault();
        pvtUser2MessageSend();
    }
}


function pvtScrollToBottom() {
    const LScrollContainer1 = document.getElementById("user_1_textarea");
    const LScrollContainer2 = document.getElementById("user_2_textarea");
    LScrollContainer1.scrollTop = LScrollContainer1.scrollHeight;
    LScrollContainer2.scrollTop = LScrollContainer2.scrollHeight;
}

function pvtFormatDate(date) {
    const options = {
        day: "numeric",
        month: "short",
        year: "2-digit",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
    };
    return new Intl.DateTimeFormat("en-US", options).format(date);
}
























/*let p_user1_input_text = document.getElementById("user_1_input_text");
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

// https://tailwindcomponents.com/component/chat-layout

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
*/
