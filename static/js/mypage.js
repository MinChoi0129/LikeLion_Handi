const level = { 1: "난이도 하", 2: "난이도 중", 3: "난이도 상" };
fetch(SERVER_ADDRESS + "/api/lecturemanagers/")
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        console.log(data);
        fetch(SERVER_ADDRESS + "/api/lectures/")
        .then((response)=>{
            return response.json();
        })
        .then((res) => {
            let Lectures = document.querySelector('.CompleteLectures');
            const moreBtn = document.querySelector('.HomeBtnBox');
            const max= 6;
            let start = 0;
            let click = 1;
            for(let i = start; i< max; i++){
                if(i < max){
                    let lecturelist = `
                    <div class="lecture">
                        <div class="difficulty">${level[res[data[i].lecture -1].level]}</div>
                        <img class="lectureImg" src="${res[data[i].lecture -1].lecture_img}"/>
                        <div class="lectureName">${res[data[i].lecture -1].name}</div>
                    </div>
                `
                if(data[i].percentage == 100) {
                    Lectures.insertAdjacentHTML("beforeend", lecturelist);
                } else {
                    return
                }

                } else {
                    return
                }

            }
            console.log(data.length);
            if ((data.length / max) > click) {
                moreBtn.style.display = "flex";
            } else {
                moreBtn.style.display = "none";
            }
            moreBtn.addEventListener("click", function(e){
                click++;
                if ((data.length / max) > click) {
                    moreBtn.style.display = "flex";
                } else {
                    moreBtn.style.display = "none";
                }
                let calcheight = - 190*(click-1);
                moreBtn.style.bottom = `${calcheight}px`;
                for(let i = max*(click-1); i< max*click; i++) {
                    if(i < data.length){
                        let lecturelist = `
                        <div class="lecture">
                            <div class="difficulty">${level[res[data[i].lecture -1].level]}</div>
                            <img class="lectureImg" src="${res[data[i].lecture -1].lecture_img}"/>
                            <div class="lectureName">${res[data[i].lecture -1].name}</div>
                        </div>
                    `
                        Lectures.insertAdjacentHTML("beforeend", lecturelist);
                    } else {
                        return;
                    }

                }

            })

        });
    });

//user정보불러오기
fetch(SERVER_ADDRESS + "/api/user/")
    .then((response) => {
    return response.json();
    })
    .then((data) => {
        console.log(data);
        const myNickname = document.querySelector('.myNickname');
        const myId = document.querySelector('.myId');
        const myName = document.querySelector('#name');
        const myEmail = document.querySelector('#email');
        const myRank = document.querySelector('#rank');
        const myScore = document.querySelector('#score');
        const myImg = document.querySelector('.myImg');

        myNickname.innerHTML = data.nickname;
        myId.innerHTML = "@" + `${data.username}`;
        myName.innerHTML = data.name;
        if(data.email_address == null) {
            myEmail.innerHTML = "-";
        }
        myScore.innerHTML = `${data.game_score}` + '점';
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
const modal = document.querySelector('.ChangeModal');
const back = document.querySelector('.Back');
const chbtn = document.querySelector('.chbtn');

const cancel = document.querySelector('.cancel');
const submit = document.querySelector('.submit');


chbtn.addEventListener("click", ()=>{
    modal.style.display= "flex";
    back.style.display = "block";
})
cancel.addEventListener("click",()=> {
    modal.style.display= "none";
    back.style.display = "none";
})
submit.addEventListener("click", ()=>{
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
        body: new URLSearchParams({nickname : mynickname}),
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            window.location.href = SERVER_ADDRESS + "/mypage/";
        });
    })