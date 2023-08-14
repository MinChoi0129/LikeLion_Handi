// fetch("http://localhost:8000/api/game")
//  .then((request)) -> document.getElementsByClassName("Userimage")[0].src = 
const userImageElement = document.querySelector(".Userimage");
// 추후 User.profile_img로 변경
const svgText = '<svg viewBox="0 0 36 36" fill="none" role="img" xmlns="http://www.w3.org/2000/svg" width="80" height="80"><mask id="mask__beam" maskUnits="userSpaceOnUse" x="0" y="0" width="36" height="36"><rect width="36" height="36" fill="#FFFFFF"></rect></mask><g mask="url(#mask__beam)"><rect width="36" height="36" fill="#F0AB3D"></rect><rect x="0" y="0" width="36" height="36" transform="translate(-5 -5) rotate(129 18 18) scale(1)" fill="#C20D90" rx="36"></rect><g transform="translate(-1 -6) rotate(-9 18 18)"><path d="M15 19c2 1 4 1 6 0" stroke="#FFFFFF" fill="none" stroke-linecap="round"></path><rect x="10" y="14" width="1.5" height="2" rx="1" stroke="none" fill="#FFFFFF"></rect><rect x="24" y="14" width="1.5" height="2" rx="1" stroke="none" fill="#FFFFFF"></rect></g></g></svg>';
const dataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgText)}`;
userImageElement.setAttribute("src", dataUrl);

const URL = "http://localhost:8000/api/game";

fetch(URL)
	.then((response) => {
		return response.json()
		})
  .then((response) => {
    return response["game_data"]
    })
	.then((meta_data) => { 
    let word_to_video_check = {};
    let video_to_word_check = {};
    
    for (let i = 0; i < meta_data.length; i++) {
      word_to_video_check[meta_data[i][0]] = meta_data[i][1];
      video_to_word_check[meta_data[i][1]] = meta_data[i][0];
    }
    cards = document.querySelectorAll(".CardGroup");
    console.log(cards)  
    cards.forEach((card) => {
      card.addEventListener("click", flipCard);
      console.log("clicked")
    });
    let cardOne, cardTwo; // 선택한 카드
    let disableDeck = false;

    function flipCard(e) {
      let clickedCard = e.target;
    
      if (clickedCard !== cardOne && !disableDeck) {
        clickedCard.classList.add("flip");
      
        if (!cardOne) {
          return (cardOne = clickedCard);
        }
        cardTwo = clickedCard;
        disableDeck = true;
    
        matchCards(cardOneImg, cardTwoImg);
      }
    }

    //두개의 이미지 비교하기
    function matchCards(img1, img2) {
      if (img1 == img2) {
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        cardOne = cardTwo = "";
        return (disableDeck = false);
      } else {
        //틀린 이미지 애니메이션 효과 주기
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

  })
