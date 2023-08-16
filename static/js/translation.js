function trans() {
  let sentence = document.getElementById("sentence").value;
  let mode = document.getElementById("mode_watch").value;

  fetch("http://127.0.0.1:8000/api/translate/", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
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

  fetch("http://127.0.0.1:8000/api/translate/", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      video_url: video_url,
      mode: mode,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((result) => {});
}
