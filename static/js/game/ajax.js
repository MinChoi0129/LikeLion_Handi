// 유저 닉네임
fetch("http://localhost:8000/api/users/")
  .then((response) => response.json())
  .then((data) => {
    const userId = 1;

    const user = data.find((user) => user.id === userId);
    if (user) {
      const nicknameElement = document.querySelector(".Nickname");
      nicknameElement.textContent = user.username;
    }
  })
  .catch((error) => {
    console.error("Error:", error);
  });

// 현재점수
document.addEventListener("DOMContentLoaded", function () {
  fetch("http://localhost:8000/api/users/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const userId = 1; // 예시로 id가 1인 유저의 game_score 사용
      const user = data.find((user) => user.id === userId);

      if (user) {
        const currentScoreNumElement =
          document.querySelector(".CurrentScoreNum");
        currentScoreNumElement.textContent = user.game_score;
      }
    })
    .catch((error) => console.error("Error:", error));
});


fetch("http://localhost:8000/api/users/rank/")
.then((response) => response.json())
.then((data) => {
  console.log(data)
})


// <!-- 랭킹보드 -->
//         <div class="LankBoard">
//           <h3 class="RankTitle">Rank</h3>
//           <div class="RankWrap">
//             <div class="RankInfo LankOne">
//               <span class="NumOne">1</span>
//               <span class="RankOneNickname">인생쓰다</span>
//               <span class="RankOneScore">1020</span>
//             </div>
//             <div class="RankInfo LankTwo">
//               <span class="NumTwo">2</span>
//               <span class="RankTwoNickname">인생달다</span>
//               <span class="RankTwoScore">920</span>
//             </div>
//             <div class="RankInfo LankThree">
//               <span class="NumThree">3</span>
//               <span class="RankThreeNickname">인생안쓰다</span>
//               <span class="RankThreeScore">880</span>
//             </div>
//             <div class="RankInfo LankFour">
//               <span class="NumFour">4</span>
//               <span class="RankFourNickname">인생안달다</span>
//               <span class="RankFourScore">870</span>
//             </div>
//             <div class="RankInfo LankFive">
//               <span class="NumFive">5</span>
//               <span class="RankFiveNickname">맛있는 착한돼지</span>
//               <span class="RankFiveScore">600</span>
//             </div>
//             <div class="RankInfo MyRank">
//               <span class="MyRankNum">4</span>
//               <span class="MyNickname">인생안달다</span>
//               <span class="MyScoreInRank">870</span>
//             </div>
//           </div>
//         </div>