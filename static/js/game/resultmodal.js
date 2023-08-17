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
}

function restartGame() {
  //게임 재시작 코드
}
function rankHome() {
  //홈으로 가는 코드
}
more_btn.addEventListener("click", restartGame);
rankhome_btn.addEventListener("click", rankHome);
