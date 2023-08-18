let RankOneNickname = document.querySelector(".RankOneNickname");
let RankTwoNickname = document.querySelector(".RankTwoNickname");
let RankThreeNickname = document.querySelector(".RankThreeNickname");
let RankFourNickname = document.querySelector(".RankFourNickname");
let RankFiveNickname = document.querySelector(".RankFiveNickname");

let Ranks = [
  RankOneNickname,
  RankTwoNickname,
  RankThreeNickname,
  RankFourNickname,
  RankFiveNickname,
];

let RankOneScore = document.querySelector(".RankOneScore");
let RankTwoScore = document.querySelector(".RankTwoScore");
let RankThreeScore = document.querySelector(".RankThreeScore");
let RankFourScore = document.querySelector(".RankFourScore");
let RankFiveScore = document.querySelector(".RankFiveScore");

let RankScores = [
  RankOneScore,
  RankTwoScore,
  RankThreeScore,
  RankFourScore,
  RankFiveScore,
];

let MyRankNum = document.querySelector(".MyRankNum");
let MyNickname = document.querySelector(".MyNickname");
let MyScoreInRank = document.querySelector(".MyScoreInRank");
fetch("http://127.0.0.1:8000/api/users/rank/")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);

    if (data["me"][2] > 5) {
      MyRankNum.innerHTML = data["me"][2];
      MyNickname.innerHTML = data["me"][0];
      MyScoreInRank.innerHTML = data["me"][1];
    } else {
      MyRankNum.innerHTML = "";
      MyNickname.innerHTML = "";
      MyScoreInRank.innerHTML = "";
    }

    for (let i = 0; i < 5; i++) {
      Ranks[i].innerHTML = data["top_5_users"][i][1];
      RankScores[i].innerHTML = data["top_5_users"][i][0];
    }
  });

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
//               <span class="RankThreeNickname">인생안쓰다</span>
//               <span class="NumThree">3</span>
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
