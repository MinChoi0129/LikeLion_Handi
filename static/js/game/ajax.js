// // 유저 닉네임
// fetch("http://localhost:8000/api/users/")
//   .then((response) => response.json())
//   .then((data) => {
//     const userId = 1;

//     const user = data.find((user) => user.id === userId);
//     if (user) {
//       const nicknameElement = document.querySelector(".Nickname");
//       nicknameElement.textContent = user.username;
//     }
//   })
//   .catch((error) => {
//     console.error("Error:", error);
//   });

// // 현재점수
// document.addEventListener("DOMContentLoaded", function () {
//   fetch("http://localhost:8000/api/users/", {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       const userId = 1; // 예시로 id가 1인 유저의 game_score 사용
//       const user = data.find((user) => user.id === userId);

//       if (user) {
//         const currentScoreNumElement =
//           document.querySelector(".CurrentScoreNum");
//         currentScoreNumElement.textContent = user.game_score;
//       }
//     })
//     .catch((error) => console.error("Error:", error));
// });

