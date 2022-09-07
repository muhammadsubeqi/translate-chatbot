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

  document.querySelector("#data").value = `${textResult}`;

  $value = $("#data").val();
  $msg =
    '<div class="user-inbox inbox"><div class="msg-header"><p>' +
    $value +
    "</p></div></div>";
  $(".form").append($msg);
  $("#data").val("");

  // start ajax code
  $.ajax({
    url:
      "https://api.mymemory.translated.net/get?q=" + $value + "&langpair=id|en",
    success: function (result) {
      result = result.responseData.translatedText;
      console.log(result);
      $replay =
        '<div class="bot-inbox inbox"><div class="icon"><i class="fas fa-robot"></i></div><div class="msg-header"><p>' +
        result +
        "</p></div></div>";
      $(".form").append($replay);
      // when chat goes down the scroll bar automatically comes to the bottom
      $(".form").scrollTop($(".form")[0].scrollHeight);
    },
  });
};

let textResult = "";

document.querySelector("#start").onclick = () => {
  recognition.start();
};

document.querySelector("#stop").onclick = () => {
  recognition.stop();
};
