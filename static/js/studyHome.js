const level = { 1: "난이도 하", 2: "난이도 중", 3: "난이도 상" };
let stopBackup = false;
let backupHTML = "";
let studyingNowLength;

// 진행 중인 학습
fetch(SERVER_ADDRESS + "/api/lecturemanagers/")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    // Extract an array of lecture IDs in the order they were studied
    const lectureOrder = data.map((item) => item.lecture);

    // Fetch details of the lectures
    Promise.all(
      lectureOrder.map((lectureId) => {
        return fetch(SERVER_ADDRESS + "/api/lecture/" + lectureId + "/").then(
          (response) => response.json()
        );
      })
    ).then((lectures) => {
      const studyingBoxes = document.querySelectorAll(".lectures")[0];
      studyingBoxes.innerHTML = ""; // Clear the container
      // Render the lectures in the order they were studied
      studyingNowLength = lectures.length;
      lectures.forEach((lecture) => {
        // if (parseInt(lecture.percentage) < 100)
        {
          let text = `
          <div class="lecture" onclick="goToLectureDetailPage(${lecture.id})">
          <div class="difficulty">${level[lecture.level]}</div>
          <img class="lectureImg" src="${lecture.lecture_img}"/>
          <div class="lectureName">${lecture.name}</div>
          <div class="lengthWithPercent">
          <div class="maxLength">총 ${lecture.length}개</div>
          <div class="percent">${lecture.percentage}%</div>
          </div>
          <div class="processing" style="background: linear-gradient(to right, #838383 0%, #838383 ${lecture.percentage}%, #d9d9d9 ${lecture.percentage}%, #d9d9d9 100%);"></div>
          </div>
          `;
          studyingBoxes.innerHTML += text;
        }
      });
      if (lectures.length <= 5) {
        document.querySelectorAll(".right")[0].style.visibility = "hidden";
      }
    });
  });

// 주간 인기 모음
fetch(SERVER_ADDRESS + "/api/lectures/popular/")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    // Extract an array of lecture IDs in the order they were studied
    // Fetch details of the lectures
    Promise.all(
      data.map((lecture) => {
        return fetch(SERVER_ADDRESS + "/api/lecture/" + lecture.id + "/").then(
          (response) => response.json()
        );
      })
    ).then((lectures) => {
      const studyingBoxes = document.querySelectorAll(".lectures")[1];

      studyingBoxes.innerHTML = ""; // Clear the container
      // Render the lectures in the order they were studied
      lectures.forEach((lecture) => {
        let text = `
           <div class="lecture" onclick="goToLectureDetailPage(${lecture.id})">
           <div class="difficulty">${level[lecture.level]}</div>
           <img class="lectureImg" src="${lecture.lecture_img}"/>
           <div class="lectureName">${lecture.name}</div>
           <div class="lengthWithPercent">
           <div class="maxLength">총 ${lecture.length}개</div>
           <div class="percent">${lecture.percentage}%</div>
           </div>
           <div class="processing" style="background: linear-gradient(to right, #838383 0%, #838383 ${
             lecture.percentage
           }%, #d9d9d9 ${lecture.percentage}%, #d9d9d9 100%);"></div>
           </div>
           `;
        studyingBoxes.innerHTML += text;
      });
    });
  });

// 3가지
fetch(SERVER_ADDRESS + "/api/lectures/")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    lectures = document.querySelectorAll(".lectures");

    lecture1 = lectures[2];
    lecture2 = lectures[3];
    lecture3 = lectures[4];

    for (let i = 0; i < 10; i++) {
      now_data = data[i];

      let text = `
      <div class="lecture" onclick="goToLectureDetailPage(${now_data.id})">
      <div class="difficulty">${level[now_data.level]}</div>
                <img class="lectureImg" src="${now_data.lecture_img}"/>
                <div class="lectureName">${now_data.name}</div>
                <div class="lengthWithPercent">
                    <div class="maxLength">총 ${now_data.length}개</div>
                    <div class="percent">${now_data.percentage}%</div>
                </div>
                <div class="processing" style="background: linear-gradient(to right, #838383 0%, #838383 ${
                  now_data.percentage
                }%, #d9d9d9 ${now_data.percentage}%, #d9d9d9 100%);"></div>
              `;
      lecture1.innerHTML += text;
    }

    for (let i = 10; i < 20; i++) {
      now_data = data[i];

      let text = `
      <div class="lecture" onclick="goToLectureDetailPage(${now_data.id})">
      <div class="difficulty">${level[now_data.level]}</div>
      <img class="lectureImg" src="${now_data.lecture_img}"/>
      <div class="lectureName">${now_data.name}</div>
      <div class="lengthWithPercent">
      <div class="maxLength">총 ${now_data.length}개</div>
      <div class="percent">${now_data.percentage}%</div>
      </div>
      <div class="processing" style="background: linear-gradient(to right, #838383 0%, #838383 ${
        now_data.percentage
      }%, #d9d9d9 ${now_data.percentage}%, #d9d9d9 100%);"></div>
      `;
      lecture2.innerHTML += text;
    }

    for (let i = 20; i < 30; i++) {
      now_data = data[i];

      let text = `
      <div class="lecture" onclick="goToLectureDetailPage(${now_data.id})">
      <div class="difficulty">${level[now_data.level]}</div>
      <img class="lectureImg" src="${now_data.lecture_img}"/>
      <div class="lectureName">${now_data.name}</div>
      <div class="lengthWithPercent">
      <div class="maxLength">총 ${now_data.length}개</div>
      <div class="percent">${now_data.percentage}%</div>
                </div>
                <div class="processing" style="background: linear-gradient(to right, #838383 0%, #838383 ${
                  now_data.percentage
                }%, #d9d9d9 ${now_data.percentage}%, #d9d9d9 100%);"></div>
                `;
      lecture3.innerHTML += text;
    }
  });

// 버튼 조작
window.onload = function () {
  const leftButton = document.querySelectorAll(".left");
  const rightButton = document.querySelectorAll(".right");
  const lecturesContainers = document.querySelectorAll(".lectures");
  const lectureWidth = 187; // 각 박스의 너비
  let currentPositions = new Array(lecturesContainers.length);

  for (let i = 0; i < currentPositions.length; ++i) {
    currentPositions[i] = 0;
  }

  for (let index = 0; index < lecturesContainers.length; index++) {
    leftButton[index].addEventListener("click", function () {
      if (currentPositions[index] < 0) {
        currentPositions[index] += lectureWidth;
        lecturesContainers[
          index
        ].style.transform = `translateX(${currentPositions[index]}px)`;
        rightButton[index].style.visibility = "visible";

        if (currentPositions[index] == 0) {
          leftButton[index].style.visibility = "hidden";
        }
      } else {
        leftButton[index].style.visibility = "hidden";
      }
    });

    rightButton[index].addEventListener("click", function () {
      let maxPosition = -(
        lectureWidth *
        (lecturesContainers[index].children.length - 5)
      ); // 5개의 박스가 화면에 보일 때까지만 이동
      if (currentPositions[index] > maxPosition) {
        currentPositions[index] -= lectureWidth;
        lecturesContainers[
          index
        ].style.transform = `translateX(${currentPositions[index]}px)`;
        leftButton[index].style.visibility = "visible";
        if (currentPositions[index] - lectureWidth <= maxPosition) {
          rightButton[index].style.visibility = "hidden";
        }
      } else {
        rightButton[index].style.visibility = "hidden";
      }
    });

    for (var i = 0; i < lecturesContainers.length; i++) {
      leftButton[i].style.visibility = "hidden";
    }
  }
  rightButton[1].style.visibility = "hidden";
};
// 검색
document.getElementById("SearchBtn").addEventListener("click", searchLecture);
document.getElementById("search").addEventListener("keyup", function (event) {
  event.preventDefault();
  if (document.getElementById("search").value.length == 0) {
    backUpAndRestore("restore");
    stopBackup = false;
  } else {
    if (!stopBackup) {
      backUpAndRestore("backup");
      stopBackup = true;
    }
    document.getElementById("SearchBtn").click();
  }
});

function goToLectureDetailPage(lecture_id) {
  location.href = location.href + lecture_id;
}

function backUpAndRestore(mode) {
  if (mode == "backup") {
    backupHTML = document.getElementById("lectureSection").innerHTML;
  } else if (mode == "restore") {
    document.getElementById("lectureSection").innerHTML = backupHTML;
  } else {
    alert("큰일났따!");
  }
}

function searchLecture() {
  let searchText = document.getElementById("search").value;
  let main_category = document
    .getElementsByClassName("categoryBtn")[0]
    .innerText.trim();
  fetch(SERVER_ADDRESS + "/api/lectures/search/", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "X-CSRFToken": getCookie("csrftoken"),
    },
    body: new URLSearchParams({
      name: searchText,
      main_category: main_category,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("lectureSection").innerHTML = "";

      let main = document.getElementById("lectureSection");
      main.innerHTML += `<div class="searchTitle" style="word-break: break-all">검색 결과</div><div class="searchList">
      </div>`;

      let box = document.getElementsByClassName("searchList")[0];
      for (let i = 0; i < data.length; i++) {
        now_data = data[i];
        let text = `
          <div class="lecture" onclick="goToLectureDetailPage(${now_data.id})">
          <div class="difficulty">${level[now_data.level]}</div>
            <img class="lectureImg" src="${now_data.lecture_img}"/>
            <div class="lectureName">${now_data.name}</div>
            <div class="lengthWithPercent">
                <div class="maxLength">총 ${now_data.length}개</div>
                <div class="percent">${now_data.percentage}%</div>
            </div>
          <div class="processing" style="background: linear-gradient(to right, #838383 0%, #838383 ${
            now_data.percentage
          }%, #d9d9d9 ${now_data.percentage}%, #d9d9d9 100%);"></div>
          </div>`;
        box.innerHTML += text;
      }
    });
}

// 카테고리 누르면 항목으로 글자 변경
function changeBtnName(a) {
  const categoryBtn = document.getElementById("categoryBtn");
  const html = `<div> 메룽 </div> `;
  categoryBtn.innerHTML = a.innerText.trim();

  if (listContainer.style.transform === "translateY(310px)") {
    listContainer.style.transform = "translateY(0)";
  } else {
    listContainer.style.transform = "translateY(310px)";
  }

  document.getElementById("SearchBtn").click();
}
