/* 모달창 구현 */
const modal = document.querySelector(".resultmodal");
const overlay = modal.querySelector(".modalOverlay");
const more_btn = modal.querySelector(".moreBtn");
const rankhome_btn = modal.querySelector(".rankHomeBtn");
const high_score = modal.querySelector(".highestScoreTitle");
const my_score = modal.querySelector(".myScoreTitle");

function endGame(score) {
  modal.classList.remove("hidden");
  console.log(score)
    // 유저 최고 점수 기록
  //  high_score.innerHTML = high_score.innerHTML + "점";
  my_score.innerHTML = my_score.innerHTML + score + "점";
};

function restartGame() {
    //게임 재시작 코드
}
function rankHome() {
    //홈으로 가는 코드
};
more_btn.addEventListener("click", restartGame);
rankhome_btn.addEventListener("click", rankHome);
