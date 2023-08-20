//변수설정
const ChapterTitle = document.querySelector(".ChapterTitle ");
const chart = document.querySelector(".ChartBar");
const FailedWordWrap = document.querySelector(".FailedWordWrap");
let totalMinwon = chart.dataset.percent;

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

//ajax 백엔드 연결
fetch("http://101.101.209.37/api/lecture/" + Id + "/")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data);
    ChapterTitle.innerHTML = data.name;

    // wrong_choices, RightPer 보내기
    fetch("http://101.101.209.37/api/quiz/result/" + Id + "/", {
      method: "GET",
      credentials: "include",
      cache: "no-cache",
      mode: "same-origin",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        totalMinwon = `${data[0].RightPer}`;
        // chartevent
        chart.style.background = `conic-gradient(#FFBD6D 0% ${totalMinwon}%, #FFEA8D ${totalMinwon}% 100%)`;
        let t4 = 0;
        const chartAnimation = setInterval(() => {
          chart.dataset.percent = t4;
          chart.style.background = `conic-gradient(#FFBD6D 0 ${t4}%, #FFEA8D ${t4}% 100% )`;
          t4++ >= totalMinwon && clearInterval(chartAnimation);
        }, 15);
        //오답문제정리

        var wrong_choices_arr = data[0].wrong_choices.split(",");
        console.log(wrong_choices_arr);
        for (let i = 0; i < wrong_choices_arr.length; i++) {
          let wrongs = `<div class="FailedWord">${wrong_choices_arr[i]}</div>`;

          FailedWordWrap.insertAdjacentHTML("beforeend", wrongs);
        }

        fetch("http://101.101.209.37/api/quiz/result/delete/" + Id + "/", {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "X-CSRFToken": csrftoken,
          },
          cache: "no-cache",
          mode: "same-origin",
        }).then((data) => {
          console.log(data);
        });
      });
  });
// 틀린 퀴즈 목록 설정

// 버튼 구현
const HomeBtn = document.querySelector(".HomeBtn");
const ReviewBtn = document.querySelector(".ReviewBtn");
HomeBtn.addEventListener("click", () => {
  location.replace("http://101.101.209.37/");
});
ReviewBtn.addEventListener("click", () => {
  location.replace("http://101.101.209.37/lecture/" + Id + "/study/word");
});
