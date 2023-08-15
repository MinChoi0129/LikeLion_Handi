function trans() {
  let sentence = document.getElementById("sentence").value;
  fetch("http://127.0.0.1:8000/api/translate/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      video_url: "media/translate/1955920.mp4",
      mode: "download",
    }),
  })
    .then((response) => response.json())
    .then((result) => {
      const videoUrl = result["video_url"];
      const videoSource = document.getElementById("videoSource");
      console.log(videoSource.src);
      console.log(videoUrl);
    });
}

// fetch("http://localhost:8000/api/translate")
//   .then((response) => {
//     return response.json();
//   })
//   .then((result) => {
//     const videoUrl = result["video_url"];
//     const videoSource = document.getElementById("videoSource");
//     videoSource.src = videoUrl;
//   });
