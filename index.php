<!-- Created By CodingNepal -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Simple Chatbot</title>
    <link rel="stylesheet" href="assets/style.css" />
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
    />
    <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
  </head>
  <body>
    <div class="wrapper">
      <div class="title">Translate Chatbot</div>
      <div class="form">
        <div class="bot-inbox inbox">
          <div class="icon">
            <i class="fas fa-robot"></i>
          </div>
          <div class="msg-header">
            <p>Hello there, What can I translate to English?</p>
          </div>
        </div>
      </div>
      <div class="typing-field">
        <div class="input-data" style="display: none;">
          <input
            id="data"
            type="text"
            placeholder="Type something here.."
            required
          />
          <button id="send-btn">Send</button>
        </div>
        <button id="start"><i class="fa fa-microphone"></i> Start</button>
        <button id="stop"><i class="fa fa-stop"></i> Stop</button>
      </div>
    </div>

    <script src="assets/main.js"></script>
    <script>
      $(document).ready(function () {
        $("#send-btn").on("click", function () {
          $value = $("#data").val();
          $msg =
            '<div class="user-inbox inbox"><div class="msg-header"><p>' +
            $value +
            "</p></div></div>";
          $(".form").append($msg);
          $("#data").val("");

          // start ajax code
          $.ajax({
            url: "https://api.mymemory.translated.net/get?q="+ $value +"&langpair=id|en",
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
        });
      });
    </script>
  </body>
</html>
