if (!"webkitSpeechRecognition" in window) {
  alert("Speech");
}

let SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
let SpeechGrammarList = window.SpeechGrammarList || webkitSpeechGrammarList;
let SpeechRecognitionEvent =
  window.SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

let recognition = new SpeechRecognition();

recognition.continuous = true;
recognition.lang = "id";
recognition.interimResults = false;

recognition.onerror = (event) => {
  console.log(event);
};

recognition.onresult = (event) => {
  console.log(event.results);

  let textResult = "";

  textResult = event.results[event.results.length - 1][0].transcript;
  console.log(textResult);

  if (textResult == "Rubah.") {
    recognition.lang = "id";
    console.log("sudah ganti indonesia");
  }

  if (textResult == "Switch.") {
    recognition.lang = "en";
    console.log("sudah ganti english");
  }

  if (textResult == "Stop." || textResult == "Berhenti.") {
    recognition.stop();
  }

  if (recognition.lang == "en") {
    translateEn(textResult).then((response) =>
      document
        .querySelector("#result")
        .insertAdjacentHTML("afterend", `<p>${response}</p>`)
    );
  }

  if (recognition.lang == "id") {
    translateId(textResult).then((response) =>
      document
        .querySelector("#result")
        .insertAdjacentHTML("afterend", `<p>${response}</p>`)
    );
  }
};

let textResult = "";

document.querySelector("#start").onclick = () => {
  recognition.start();
};

document.querySelector("#stop").onclick = () => {
  recognition.stop();
};

// api translate
function translateEn(kata) {
  let apiUrl = `https://api.mymemory.translated.net/get?q=${kata}&langpair=en|id`;
  return fetch(apiUrl)
    .then((res) => res.json())
    .then((data) => {
      return data.responseData.translatedText;
    });
}

function translateId(kata) {
  let apiUrl = `https://api.mymemory.translated.net/get?q=${kata}&langpair=id|en`;
  return fetch(apiUrl)
    .then((res) => res.json())
    .then((data) => {
      return data.responseData.translatedText;
    });
}
