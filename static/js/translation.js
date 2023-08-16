function trans() {
  let sentence = document.getElementById("sentence").value;
  let mode = document.getElementById("mode").value;

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
      console.log(response);
      response.json();
    })
    .then((result) => {
      // const videoUrl = result["video_url"];
      console.log(result);
    });
}

// fetch("http://127.0.0.1:8000/api/translate/")
//   .then((response) => {
//     return response.json();
//   })
//   .then((result) => {
//     const videoUrl = result["video_url"];
//     const videoSource = document.getElementById("videoSource");
//     videoSource.src = videoUrl;
//     console.log(result["video_url"]);
//   });
