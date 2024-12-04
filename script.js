let select = document.querySelector(".select-heading");
let options = document.querySelector(".options");
let arrow = document.querySelector(".select-heading img");
let option = document.querySelectorAll(".option");
let selecttext = document.querySelector(".select-heading span");
let h1 = document.querySelector(".h1");
let chatImg = document.getElementById("chatbotimg");
let chatBox = document.querySelector(".chat-box");

chatImg.addEventListener("click", () => {
  chatBox.classList.toggle("active-chat-box");
  if (chatBox.classList.contains("active-chat-box")) {
    chatImg.src = "images/cross.svg";
  } else {
    chatImg.src = "images/chatbot.svg";
    }
  }
  
);

select.addEventListener("click", () => {
  options.classList.toggle("active-options");
  arrow.classList.toggle("rotate");
});

option.forEach((item) => {
  item.addEventListener("click", () => {
    selecttext.innerText = item.innerText;
  });
});

//chatbot

let prompt = document.querySelector(".prompt");
let chatbtn = document.querySelector(".input-area button");
let chatContainer = document.querySelector(".chat-container");
let userMessage = "";

let api_url =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyCpGONWZh6WU8kFs4E0ZTMQuOGyNeOdre4";

async function generateApiResponse(aiChatBox) {
  const textElement = aiChatBox.querySelector(".text");
  try {
    const response = await fetch(api_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: `${userMessage} in 10 words.` }],
          },
        ],
      }),
    });
    const data = await response.json();
    console.log("[DATA]", data);

    const apiResponse = data?.candidates[0].content.parts[0].text.trim();
    textElement.innerText = apiResponse;
    console.log(apiResponse);
  } catch (error) {
    console.log(error);
  } finally {
    aiChatBox.querySelector(".loading").style.display = "none";
  }
}

function createChatBox(html, className) {
  const div = document.createElement("div");
  div.classList.add(className);
  div.innerHTML = html;
  return div;
}

function showLoading() {
  const html = `<p class="text"></p>
    <img src="images/load.gif" class="loading" alt="loading" width="40px">`;
  let aiChatBox = createChatBox(html, "ai-chat-box");
  chatContainer.appendChild(aiChatBox);
  generateApiResponse(aiChatBox);
}

chatbtn.addEventListener("click", () => {
  h1.style.display = "none";
  userMessage = prompt.value;
  const html = `<p class="text"></p>`;
  let userChatBox = createChatBox(html, "user-chat-box");
  userChatBox.querySelector(".text").innerText = userMessage;
  chatContainer.appendChild(userChatBox);
  prompt.value = "";
  setTimeout(showLoading, 500);
});

//virtual Assistant

let ai = document.querySelector(".virtual-assistant img");
let speakPage = document.querySelector(".speak-page");
let content= document.querySelector(".speak-page h1");


function speak(text) {
  let text_speak = new SpeechSynthesisUtterance(text);
  text_speak.rate = 1;
  text_speak.pitch = 1;
  text_speak.volume = 1;
  text_speak.lang = "hi-GB";
  window.speechSynthesis.speak(text_speak);
 
}

let speechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new speechRecognition();
recognition.onresult = (event) => {
  speakPage.style.display = "none";
  let currentIndex = event.resultIndex;
  let transcript = event.results[currentIndex][0].transcript;
  content.innerText = transcript;
  takeCommand(transcript.toLowerCase());
};

function takeCommand(message) {
  if(message.includes("open") && message.includes("chat")){
    speak("okay sir, opening chatbot");
    chatBox.classList.add("active-chat-box");
  } else if(message.includes("close") && message.includes("chat")){
    speak("okay sir, closing chatbot");
    chatBox.classList.remove("active-chat-box");
  }else if(message.includes("time")){
    let time = new Date().toLocaleString(undefined,{hour:"numeric",minute:"numeric"});
    speak(time);
  }else if(message.includes("date")){
    let date = new Date().toLocaleString(undefined,{day:"numeric",month:"short"} );
    speak(date);
  }else if(message.includes("homepage")){
    speak("okay sir, going to home page");
    window.open("https://fit-club-banta.vercel.app/index.html","_self");
  }else if(message.includes("back")){
    speak("okay sir, back workout");
    window.open("https://fit-club-banta.vercel.app/back.html","_self");
  }else if(message.includes("bicep")|| message.includes("tricep")){
    speak("okay sir, bicep workout with triceps included");
    window.open("https://fit-club-banta.vercel.app/biceps-triceps.html","_self");
  }else if(message.includes("chest")){
    speak("okay sir, chest workout");
    window.open("https://fit-club-banta.vercel.app/chest.html","_self");
  }else if(message.includes("leg")|| message.includes("legs")){
    speak("okay sir, legs workout");
    window.open("https://fit-club-banta.vercel.app/leg.html","_self");
  }else if(message.includes("shoulder")){
    speak("okay sir, shoulder workout");
    window.open("https://fit-club-banta.vercel.app/shoulder.html","_self");
  }else if(message.includes("workout")|| message.includes("workouts")){
    speak("okay sir, all workout");
    window.open("https://fit-club-banta.vercel.app/workout.html","_self");
  }
}


ai.addEventListener("click", () => {
  recognition.start();
  speakPage.style.display = "flex";
});

