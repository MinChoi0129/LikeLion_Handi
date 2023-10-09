const level = { 1: "난이도 하", 2: "난이도 중", 3: "난이도 상" };
fetch(SERVER_ADDRESS + "/api/lecturemanagers/done/")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    fetch(SERVER_ADDRESS + "/api/lectures/")
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        let Lectures = document.querySelector(".CompleteLectures");
        const moreBtn = document.querySelector(".HomeBtnBox");
        const max = 6;
        let start = 0;
        let click = 1;
        for (let i = start; i < max; i++) {
          if (i < max && data[i]) {
            let lecturelist = `
                    <div class="lecture">
                        <div class="difficulty">${
                          level[res[data[i].lecture - 1].level]
                        }</div>
                        <img class="lectureImg" src="${
                          res[data[i].lecture - 1].lecture_img
                        }"/>
                        <div class="lectureName">${
                          res[data[i].lecture - 1].name
                        }</div>
                    </div>
                `;
            Lectures.insertAdjacentHTML("beforeend", lecturelist);
          } else {
            return;
          }
        }
        if (data.length / max > click) {
          moreBtn.style.display = "flex";
        } else {
          moreBtn.style.display = "none";
        }
        moreBtn.addEventListener("click", function (e) {
          click++;
          if (data.length / max > click) {
            moreBtn.style.display = "flex";
          } else {
            moreBtn.style.display = "none";
          }
          let calcheight = -190 * (click - 1);
          moreBtn.style.bottom = `${calcheight}px`;
          for (let i = max * (click - 1); i < max * click; i++) {
            if (i < data.length) {
              let lecturelist = `
                        <div class="lecture">
                            <div class="difficulty">${
                              level[res[data[i].lecture - 1].level]
                            }</div>
                            <img class="lectureImg" src="${
                              res[data[i].lecture - 1].lecture_img
                            }"/>
                            <div class="lectureName">${
                              res[data[i].lecture - 1].name
                            }</div>
                        </div>
                    `;
              Lectures.insertAdjacentHTML("beforeend", lecturelist);
            } else {
              return;
            }
          }
        });
      });
  });

//user정보불러오기
fetch(SERVER_ADDRESS + "/api/user/")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data);
    const myNickname = document.querySelector(".myNickname");
    const myId = document.querySelector(".myId");
    const myName = document.querySelector("#name");
    const myEmail = document.querySelector("#email");
    const myRank = document.querySelector("#rank");
    const myScore = document.querySelector("#score");
    const myImage = document.querySelector(".myImg");

    myImage.src = `${data.profile_img || "/static/image/profile_img.png"}`; //원래이미지코드

    myNickname.innerHTML = data.nickname;
    myId.innerHTML = "@" + `${data.username}`;
    myName.innerHTML = data.name;
    
    console.log(data.email);
    if (!data.email  && !data.email_address) {
      myEmail.innerHTML = "-";
    } else if (data.email_address != null) {
      console.log("dd");
      myEmail.innerHTML = data.email_address;
    } else {
      console.log("dds");
      myEmail.innerHTML = data.email;
    }
    myScore.innerHTML = `${data.game_score}` + "점";
    fetch(SERVER_ADDRESS + "/api/users/rank/")
      .then((response) => response.json())
      .then((data) => {
        if (data.me[2] == null) {
          myRank.innerHTML = "-등.";
        } else {
          myRank.innerHTML = `${data.me[2]}` + "등.";
        }
      });
  });

//모달열기
const modal = document.querySelector(".ChangeModal");
const back = document.querySelector(".Back");
const chbtn = document.querySelector(".chbtn");

const cancel = document.querySelector(".cancel");
const submit = document.querySelector(".submit");

chbtn.addEventListener("click", () => {
  modal.style.display = "flex";
  back.style.display = "block";
});
cancel.addEventListener("click", () => {
  modal.style.display = "none";
  back.style.display = "none";
});
submit.addEventListener("click", () => {
  let mynickname = document.getElementById("nickname").value;

  fetch(SERVER_ADDRESS + "/api/user/update/", {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "X-CSRFToken": getCookie("csrftoken"),
    },
    cache: "no-cache",
    mode: "same-origin",
    body: new URLSearchParams({ nickname: mynickname }),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      window.location.href = SERVER_ADDRESS + "/mypage/";
    });
});

const Imgmodal = document.querySelector(".ImgModal");
const imgChangeBtn = document.querySelector(".imgChangeBtn");
const cancel2 = document.querySelector(".cancel2");
const submit2 = document.querySelector(".submit2");

imgChangeBtn.addEventListener("click", () => {
  Imgmodal.style.display = "flex";
  back.style.display = "block";
});
cancel2.addEventListener("click", () => {
  Imgmodal.style.display = "none";
  back.style.display = "none";
});
submit2.addEventListener("click", () => {
  //이미지 변경코드
  let myImg = document.getElementById("chooseimg").files[0];
  let myImage = document.querySelector(".myImg");

  let data = new FormData();
  data.append("profile_img", myImg);

  fetch(SERVER_ADDRESS + "/api/user/update/", {
    method: "PATCH",
    body: data,
    headers: { "X-CSRFToken": getCookie("csrftoken") },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      window.location.href = SERVER_ADDRESS + "/mypage/";
    });
});
