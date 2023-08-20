function getCookie(name) {
  var cookieValue = null;
  if (document.cookie && document.cookie != "") {
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) == name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

var csrftoken = getCookie("csrftoken");

function trans() {
  let sentence = document.getElementById("sentence").value;
  let mode = document.getElementById("mode_watch").value;

  fetch("http://101.101.209.37/api/translate/", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "X-CSRFToken": getCookie("csrftoken"),
      mode: "same-origin",
    },
    body: new URLSearchParams({
      sentence: sentence,
      mode: mode,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      const videoUrl = result["video_url"];
      document
        .getElementById("videoSource")
        .setAttribute("src", "/" + videoUrl);
    });
}

function save() {
  let video_url = document.getElementById("videoSource").getAttribute("src");
  let mode = document.getElementById("mode_save").value;

  fetch("http://101.101.209.37/api/translate/", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "X-CSRFToken": csrftoken,
      mode: "same-origin",
    },
    body: new URLSearchParams({
      video_url: video_url,
      mode: mode,
    }),
  })
    .then((response) => {
      return response.blob();
    })
    .then((data) => {
      var a = document.createElement("a");
      a.href = window.URL.createObjectURL(data);
      a.download = "translation_result";
      a.click();
    });
}
