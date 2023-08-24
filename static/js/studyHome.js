const level = { 1: "난이도 하", 2: "난이도 중", 3: "난이도 상" };

function goToLectureDetailPage(lecture_id) {
  location.href = location.href + lecture_id;
}

fetch(SERVER_ADDRESS + "/api/lecturemanagers/")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    for (let i = 0; i < data.length; i++) {
      fetch(SERVER_ADDRESS + "/api/lecture/" + data[i]["lecture"] + "/")
        .then((inshinjia) => {
          return inshinjia.json();
        })
        .then((lecture) => {
          studying_boxes = document.querySelectorAll(".lectures")[0]

          let text = `<div class="lecture">
          <div class="lecture" onclick="goToLectureDetailPage(${lecture.id
            })">
          <div class="difficulty">${level[lecture.level]}</div>
          <img class="lectureImg" src="${lecture.lecture_img}"/>
          <div class="lectureName">${lecture.name}</div>
          <div class="lengthWithPercent">
              <div class="maxLength">총 ${lecture.length}개</div>
              <div class="percent">${lecture.percentage}%</div>
          </div>
          <div class="processing"></div>
          </div>`;
          studying_boxes.innerHTML += text;





          console.log(lecture)
        })
    }
  })

fetch(SERVER_ADDRESS + "/api/lectures/")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    lectures = document.querySelectorAll(".lectures");

    lecture1 = lectures[1];
    lecture2 = lectures[2];
    lecture3 = lectures[3];

    for (let i = 0; i < 10; i++) {
      now_data = data[i];

      let text = `<div class="lecture">
                <div class="lecture" onclick="goToLectureDetailPage(${now_data.id
        })">
                <div class="difficulty">${level[now_data.level]}</div>
                <img class="lectureImg" src="${now_data.lecture_img}"/>
                <div class="lectureName">${now_data.name}</div>
                <div class="lengthWithPercent">
                    <div class="maxLength">총 ${now_data.length}개</div>
                    <div class="percent">${now_data.percentage}%</div>
                </div>
                <div class="processing"></div>
                </div>`;
      lecture1.innerHTML += text;
    }

    for (let i = 10; i < 20; i++) {
      now_data = data[i];

      let text = `<div class="lecture">
                <div class="lecture" onclick="goToLectureDetailPage(${now_data.id
        })">
                <div class="difficulty">${level[now_data.level]}</div>
                <img class="lectureImg" src="${now_data.lecture_img}"/>
                <div class="lectureName">${now_data.name}</div>
                <div class="lengthWithPercent">
                    <div class="maxLength">총 ${now_data.length}개</div>
                    <div class="percent">${now_data.percentage}%</div>
                </div>
                <div class="processing"></div>
                </div>`;
      lecture2.innerHTML += text;
    }

    for (let i = 20; i < 30; i++) {
      now_data = data[i];

      let text = `<div class="lecture">
                <div class="lecture" onclick="goToLectureDetailPage(${now_data.id
        })">
                <div class="difficulty">${level[now_data.level]}</div>
                <img class="lectureImg" src="${now_data.lecture_img}"/>
                <div class="lectureName">${now_data.name}</div>
                <div class="lengthWithPercent">
                    <div class="maxLength">총 ${now_data.length}개</div>
                    <div class="percent">${now_data.percentage}%</div>
                </div>
                <div class="processing"></div>
                </div>`;
      lecture3.innerHTML += text;
    }
  });


// 버튼 조작
document.addEventListener("DOMContentLoaded", function () {
  const leftButton = document.querySelectorAll(".left");
  const rightButton = document.querySelectorAll(".right");
  const lecturesContainers = document.querySelectorAll(".lectures");

  let currentPositions = new Array(lecturesContainers.length);
  for (let i = 0; i < currentPositions.length; ++i) {
    currentPositions[i] = 0;
  }

  const lectureWidth = 187; // 각 박스의 너비

  for (let index = 0; index < lecturesContainers.length; index++) {
    leftButton[index].addEventListener("click", function () {
      if (currentPositions[index] < 0) {
        currentPositions[index] += lectureWidth;
        lecturesContainers[
          index
        ].style.transform = `translateX(${currentPositions[index]}px)`;
      }
    });

    rightButton[index].addEventListener("click", function () {
      const maxPosition = -(
        lectureWidth *
        (lecturesContainers[index].children.length - 4)
      ); // 4개의 박스가 화면에 보일 때까지만 이동
      if (currentPositions[index] > maxPosition) {
        currentPositions[index] -= lectureWidth;
        lecturesContainers[
          index
        ].style.transform = `translateX(${currentPositions[index]}px)`;
      }
    });
  }
});
