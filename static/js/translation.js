function trans() {
  let sentence = document.getElementById("sentence").value;
  let mode = document.getElementById("mode_watch").value;

  fetch(SERVER_ADDRESS + "/api/translate/", {
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

  fetch(SERVER_ADDRESS + "/api/translate/", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "X-CSRFToken": getCookie("csrftoken"),
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
