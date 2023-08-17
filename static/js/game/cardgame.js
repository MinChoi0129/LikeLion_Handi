// fetch("http://localhost:8000/api/game")
//  .then((request)) -> document.getElementsByClassName("Userimage")[0].src =
const userImageElement = document.querySelector(".Userimage");
// 유저 이미지, 이름 수정
// 추후 User.profile_img로 변경
// fetch ("http://localhost:8000/api/user/")
//   .then((response) => {
//   return response.json()
//   })
//   .then((response) => {
//   console.log(response)
//   })
const svgText =
  '<svg viewBox="0 0 36 36" fill="none" role="img" xmlns="http://www.w3.org/2000/svg" width="80" height="80"><mask id="mask__beam" maskUnits="userSpaceOnUse" x="0" y="0" width="36" height="36"><rect width="36" height="36" fill="#FFFFFF"></rect></mask><g mask="url(#mask__beam)"><rect width="36" height="36" fill="#F0AB3D"></rect><rect x="0" y="0" width="36" height="36" transform="translate(-5 -5) rotate(129 18 18) scale(1)" fill="#C20D90" rx="36"></rect><g transform="translate(-1 -6) rotate(-9 18 18)"><path d="M15 19c2 1 4 1 6 0" stroke="#FFFFFF" fill="none" stroke-linecap="round"></path><rect x="10" y="14" width="1.5" height="2" rx="1" stroke="none" fill="#FFFFFF"></rect><rect x="24" y="14" width="1.5" height="2" rx="1" stroke="none" fill="#FFFFFF"></rect></g></g></svg>';
const dataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
  svgText
)}`;
userImageElement.setAttribute("src", dataUrl);
//점수 계산
let currentScoreNum = document.querySelector(".CurrentScoreNum");
let highestScoreNum = document.querySelector(".HighestScoreNum");
function getScore() {
  currentScoreNum.innerHTML = `${
    parseInt(currentScoreNum.innerHTML) + stage * 10
  }`;
}
let start = 0;
let end = 4;
let nextstageScore = 8;
let stage = 1;
let level = document.querySelector(".LevelBackground");
let now_level = 1;
let cards = document.querySelectorAll(".Cards li");
function stageChange() {
  console.log(start, end);
  if (start == end) {
    end = nextstageScore;
    stage += 1;
    nextstageScore += 4;
    now_level += 1;
    level.innerHTML = "Stage " + now_level;
    cards.forEach((card) => {
      card.classList.remove("flip");
    });
    randomCardPosition(URL_data);
    disableDeck = true;
    cards.forEach((card) => {
      card.classList.add("flip");
    });
    setTimeout(() => {
      cards.forEach((card) => {
        card.classList.remove("flip");
      });
    }, 5000);
    disableDeck = false;
    cards.forEach((card) => {
      card.addEventListener("click", flipCard);
    });
  }
}
// 구현해야 할 점
// 1. 카드 뒷면에 Text or Video data를 넣어주기
// 2. 카드 뒤집은 다음 video면 1.5초간 재생
// 3. 카드 뒤집은 다음 text면 1.5초간 보여주기
// 4. 서로 맞는 카드인지 확인
// 5. 맞으면 카드 뒤집힌 상태 유지
// 6. 모든 카드가 맞으면 다음 스테이지로 전환
// 7. 초가 끝나면 모달창으로 결과 보여주기
function flipCard(e) {
  console.log(e.target);
  let clickedCard = e.target;
  if (clickedCard !== cardOne && !disableDeck) {
    clickedCard.classList.add("flip");

    if (!cardOne) {
      return (cardOne = clickedCard);
    }
    cardTwo = clickedCard;
    disableDeck = true;
    //cardOne과 cardTwo의 속성확인
    if (
      cardOne.querySelector(".View.Back .VideoContent").style.display == "none"
    ) {
      cardOneType = "word";
    } else {
      cardOneType = "video";
    }
    if (
      cardTwo.querySelector(".View.Back .VideoContent").style.display == "none"
    ) {
      cardTwoType = "word";
    } else {
      cardTwoType = "video";
    }
    if (cardOneType !== cardTwoType) {
      if (cardOneType == "word") {
        cardOneAttr = cardOne.querySelector(
          ".View.Back .TextContent p"
        ).textContent;
      } else {
        cardOneAttr = cardOne.querySelector(
          ".View.Back .VideoContent video"
        ).src;
      }
      if (cardTwoType == "word") {
        cardTwoAttr = cardTwo.querySelector(
          ".View.Back .TextContent p"
        ).textContent;
      } else {
        cardTwoAttr = cardTwo.querySelector(
          ".View.Back .VideoContent video"
        ).src;
      }
      matchCards(cardOneAttr, cardTwoAttr);
    } else {
      setTimeout(() => {
        cardOne.classList.add("shake");
        cardTwo.classList.add("shake");
      }, 400);
      setTimeout(() => {
        cardOne.classList.remove("shake", "flip");
        cardTwo.classList.remove("shake", "flip");
        cardOne = cardTwo = "";
        return (disableDeck = false);
      }, 1200);
    }
  }
}
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
}
let check_Attr = {};
function randomCardPosition(meta_data) {
  // 두가지로 분류, 양쪽을 통해 확인할 것임
  for (let i = 0; i < meta_data.length; i++) {
    check_Attr[meta_data[i][0]] = meta_data[i][1];
    check_Attr[meta_data[i][1]] = meta_data[i][0];
  }
  let all_data = [];
  for (let i = start; i < end; i++) {
    all_data.push([meta_data[i][0], "word"]);
    all_data.push([meta_data[i][1], "video"]);
  }
  shuffled_data = shuffleArray(all_data);
  console.log(shuffled_data);
  for (let i = 0; i < cards.length; i++) {
    // 카드 뒷면에 단어, video url 넣어주기 (아닌건 block 처리)
    if (shuffled_data[i][1] == "word") {
      let now_card = cards[i];
      now_card.querySelector(".View.Back .VideoContent").style.display = "none";
      now_card.querySelector(".View.Back .TextContent p").textContent =
        shuffled_data[i][0];
      now_card.querySelector(".View.Back .TextContent").style.display =
        "inline";
    } else {
      let now_card = cards[i];
      now_card.querySelector(".View.Back .TextContent").style.display = "none";
      now_card.querySelector(".View.Back .VideoContent video").src =
        shuffled_data[i][0];
      now_card.querySelector(".View.Back .VideoContent").style.display =
        "inline";
    }
  }
}

let cardOne, cardTwo; // 선택한 카드
let disableDeck = false;
//두개의 이미지 비교하기
function matchCards(Attr1, Attr2) {
  console.log(check_Attr[Attr1], check_Attr[Attr2]);
  if (check_Attr[Attr1] == Attr2 && check_Attr[Attr2] == Attr1) {
    getScore();
    cardOne.removeEventListener("click", flipCard);
    cardTwo.removeEventListener("click", flipCard);
    cardOne = cardTwo = "";
    start += 1;
    stageChange();
    return (disableDeck = false);
  } else {
    // 틀린 이미지 애니메이션 효과 주기
    setTimeout(() => {
      cardOne.classList.add("shake");
      cardTwo.classList.add("shake");
    }, 400);
    setTimeout(() => {
      cardOne.classList.remove("shake", "flip");
      cardTwo.classList.remove("shake", "flip");
      cardOne = cardTwo = "";
      return (disableDeck = false);
    }, 1500);
  }
}
function getCard() {
  return cards;
}
URL_data = [];
function loadMatadata(meta_data) {
  URL_data = meta_data;
}
const URL = "http://localhost:8000/api/game";
fetch(URL)
  .then((response) => {
    return response.json();
  })
  .then((response) => {
    return response["game_data"];
  })
  .then((meta_data) => {
    // 랜덤으로 카드 배치
    loadMatadata(meta_data);
    randomCardPosition(meta_data);
  });
// 카드 6초간 보여주기
disableDeck = true;
cards.forEach((card) => {
  card.classList.add("flip");
});
setTimeout(() => {
  cards.forEach((card) => {
    card.classList.remove("flip");
  });
  startGameTimer();
  disableDeck = false;
}, 5000);
cards.forEach((card) => {
  card.addEventListener("click", flipCard);
});
