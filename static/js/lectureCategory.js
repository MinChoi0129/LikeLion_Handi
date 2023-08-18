let parent_main = document.querySelector(".main");

<<<<<<< Updated upstream
fetch("http://localhost:8000/api/lecture/" + inshinjia + "/")
=======
fetch("http://101.101.209.37/api/lecture/" + inshinjia + "/")
>>>>>>> Stashed changes
  .then((response) => {
    return response.json();
  })
  .then((뭔가) => {
    console.log(뭔가);
    document.querySelector(".apple1").src = 뭔가["lecture_img"];
    document.querySelector(".title1").innerHTML = 뭔가["name"];
    document.querySelector(".count1").innerHTML +=
      "총 " + 뭔가["length"] + "개";
    document.querySelector(".description").innerHTML = 뭔가["description"];
  });

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

// 학습하기
document.querySelector(".study").addEventListener("click", function () {
  if (inshinjia <= 543) {
    fetch("http://101.101.209.37/api/lecturemanager/" + inshinjia + "/", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        "X-CSRFToken": csrftoken,
      },
      cache: "no-cache",
      mode: "same-origin",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        console.log(inshinjia);
        if (data.length == 0) {
          fetch("http://101.101.209.37/api/lecturemanagers/", {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              "X-CSRFToken": csrftoken,
            },
            cache: "no-cache",
            mode: "same-origin",
            body: new URLSearchParams({ lecture: inshinjia, percentage: 0 }),
          })
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
            });
        }
      });

    window.location.href = `http://101.101.209.37/lecture/${inshinjia}/study/word/`;
  } else {
    window.location.href = `http://101.101.209.37/lecture/${inshinjia}/study/sentence/`;
  }
});

// 퀴즈 풀기
document.querySelector(".game").addEventListener("click", function () {
  if (inshinjia <= 543) {
    window.location.href = `http://101.101.209.37/lecture/${inshinjia}/quiz/word/`;
  } else {
    window.location.href = `http://101.101.209.37/lecture/${inshinjia}/quiz/sentence/`;
  }
});
