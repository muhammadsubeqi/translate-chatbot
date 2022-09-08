if (!"webkitSpeechRecognition" in window) {
  alert("Speech");
}

let SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
let SpeechGrammarList = window.SpeechGrammarList || webkitSpeechGrammarList;
let SpeechRecognitionEvent =
  window.SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

let recognition = new SpeechRecognition();

recognition.continuous = true; // untuk merekam lanjutan suara, jadi suara akan terus terekam
recognition.lang = "id"; // untuk mengeluarkan input suara yang berupa bahasa indonesia
recognition.interimResults = false;

// identifikasi eror jika suara tidak ada/tidak dikenal
recognition.onerror = (event) => {
  console.log(event);
};

// hasil output
recognition.onresult = (event) => {
  console.log(event.results);

  let textResult = "";

  textResult = event.results[event.results.length - 1][0].transcript;
  console.log(textResult);

  // kode untuk memasukkan hasil suara berupa text ke dalam message
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
      "https://api.mymemory.translated.net/get?q=" + $value + "&langpair=id|en", // identifikasi api yang digunakan dengan menambahkan value yang telah di inputkan user
    success: function (result) {
      result = result.responseData.translatedText;
      console.log(result);

      // kode output berupa message dari reply an robot
      $replay =
        '<div class="bot-inbox inbox"><div class="icon"><i class="fas fa-robot"></i></div><div class="msg-header"><p>' +
        result +
        "</p></div></div>";
      $(".form").append($replay);

      // saat obrolan turun, bilah gulir secara otomatis turun ke bawah
      $(".form").scrollTop($(".form")[0].scrollHeight);
    },
  });
};

let textResult = "";

// kode ketika id start di tekan
document.querySelector("#start").onclick = () => {
  recognition.start();
};
// kode ketika id stop di tekan
document.querySelector("#stop").onclick = () => {
  recognition.stop();
};
