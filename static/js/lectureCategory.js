let parent_main = document.querySelector(".main");

fetch(SERVER_ADDRESS + "/api/lecture/" + inshinjia + "/")
  .then((response) => {
    return response.json();
  })
  .then((뭔가) => {
    document.querySelector(".apple1").src = 뭔가["lecture_img"];
    document.querySelector(".title1").innerHTML = 뭔가["name"];
    document.querySelector(".count1").innerHTML = "총 " + 뭔가["length"] + "개";
    document.querySelector(".description").innerHTML = 뭔가["description"];

    const percentage = 뭔가["percentage"];
    const completedWidth = percentage + "%";
    const remainingWidth = 100 - percentage + "%";

    
    const barElement = document.querySelector(".bar1");
    barElement.style.width = "300px";
    barElement.style.background = `linear-gradient(to right, #838383 ${completedWidth}, #d9d9d9 ${remainingWidth})`;
  });

    // 학습하기
    document.querySelector(".study").addEventListener("click", function () {
      if (inshinjia <= 543) {
        fetch(SERVER_ADDRESS + "/api/lecturemanager/" + inshinjia + "/", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
            "X-CSRFToken": getCookie("csrftoken"),
          },
          cache: "no-cache",
          mode: "same-origin",
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.length == 0) {
              fetch(SERVER_ADDRESS + "/api/lecturemanagers/", {
                method: "POST",
                credentials: "include",
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
                  "X-CSRFToken": getCookie("csrftoken"),
                },
                cache: "no-cache",
                mode: "same-origin",
                body: new URLSearchParams({ lecture: inshinjia, percentage: 0 }),
              })
                .then((response) => response.json())
                .then((data) => { });
            }
          });

        window.location.href = SERVER_ADDRESS + `/lecture/${inshinjia}/study/word/`;
      } else {
        window.location.href =
          SERVER_ADDRESS + `/lecture/${inshinjia}/study/sentence/`;
      }
    });

    // 퀴즈 풀기
    document.querySelector(".game").addEventListener("click", function () {
      if (inshinjia <= 543) {
        window.location.href = SERVER_ADDRESS + `/lecture/${inshinjia}/quiz/word/`;
      } else {
        window.location.href =
          SERVER_ADDRESS + `/lecture/${inshinjia}/quiz/sentence/`;
      }
    });
