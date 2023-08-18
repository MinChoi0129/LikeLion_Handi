const result_modal = document.querySelector(".resultmodal");
const result_overlay = result_modal.querySelector(".resultModalOverlay");
const more_btn = result_modal.querySelector(".moreBtn");
const rankhome_btn = result_modal.querySelector(".rankHomeBtn");
const high_score = result_modal.querySelector(".highestScoreTitle");
const my_score = result_modal.querySelector(".myScoreTitle");

function endGame(score) {
  result_modal.classList.remove("hidden");
  console.log(score);
  // 유저 최고 점수 기록
  //  high_score.innerHTML = high_score.innerHTML + "점";
  my_score.innerHTML = my_score.innerHTML + score + "점";

  fetch("http://101.101.209.37/api/users/rank/update/", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "X-CSRFToken": csrftoken,
    },
    body: new URLSearchParams({ score: score }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("패치 성공 데이터");
      console.log(data);
    });

  fetch("http://101.101.209.37/api/users/rank/")
    .then((response) => response.json())
    .then((data) => {
      document.querySelector(".my_max_score").innerHTML = data["me"][2];
    });
}
