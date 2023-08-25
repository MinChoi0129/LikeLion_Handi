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
        .then((res) => {;
            let Lectures = document.querySelector('.CompleteLectures');
            const max= 6;
            let start = 0;
            for(let i = start; i< max; i++){
                let lecturelist = `
                    <div class="lecture">
                        <div class="difficulty">${level[res[data[i].lecture -1].level]}</div>
                        <img class="lectureImg" src="${res[data[i].lecture -1].lecture_img}"/>
                        <div class="lectureName">${res[data[i].lecture -1].name}</div>
                    </div>
                `
                Lectures.insertAdjacentHTML("beforeend", lecturelist);
            }

        });

    });

//user정보불러오기
fetch(SERVER_ADDRESS + "/api/user/")
    .then((response) => {
    return response.json();
    })
    .then((data) => {
    const myImg = document.querySelector('.myImg');
    const myNickname = document.querySelector('.myNickname');
    const myId = document.querySelector('.myId');
    const myName = document.querySelector('#name');
    const myEmail = document.querySelector('#email');
    const myRank = document.querySelector('#rank');
    const myScore = document.querySelector('#score');

    myNickname.innerHTML = data.username;
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

//진행도100% 불러오기

//더보기버튼 클릭시 더 나오게 하기