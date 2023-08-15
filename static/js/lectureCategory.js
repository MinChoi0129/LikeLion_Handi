fetch("http://localhost:8000/api/lecture/" + lecture_id + "/")
  .then((response) => {
    return response.json();
  })
  .then((결과) => {
    let 아이디 = 결과.id;
    let button = document.querySelector(".study");
    if (아이디 <= 543) {
      // word
      button.addEventListener("click", () => {
        location.href =
          "http://localhost:8000/lecture/" + lecture_id + "/study/word/";
      });
    } else {
      location.href =
        "http://localhost:8000/lecture/" + lecture_id + "/study/sentence/"; // situation
    }
  });
