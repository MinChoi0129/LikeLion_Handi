const getCookie = (name) => {
  var cookieValue = null;
  if (document.cookie && document.cookie != "") {
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) == name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
};

const result_modal = document.querySelector(".resultmodal");
const result_overlay = result_modal.querySelector(".resultModalOverlay");
const more_btn = result_modal.querySelector(".moreBtn");
const rankhome_btn = result_modal.querySelector(".rankHomeBtn");
const high_score = result_modal.querySelector(".highestScoreTitle");
const my_score = result_modal.querySelector(".myScoreTitle");

function endGame(score) {
  result_modal.classList.remove("hidden");
  // 유저 최고 점수 기록
  //  high_score.innerHTML = high_score.innerHTML + "점";
  my_score.innerHTML = my_score.innerHTML + score + "점";

  fetch(SERVER_ADDRESS + "/api/users/rank/update/", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "X-CSRFToken": getCookie("csrftoken"),
    },
    body: new URLSearchParams({ score: score }),
  })
    .then((response) => response.json())
    .then((data) => {});

  fetch(SERVER_ADDRESS + "/api/users/rank/")
    .then((response) => response.json())
    .then((data) => {
      document.querySelector(".my_max_score").innerHTML = data["me"][2];
    });
}
