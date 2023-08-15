const cards =document.querySelectorAll(".Cards li");

        let cardOne, cardTwo; // 선택한 카드
        let disableDeck = false;

        function flipCard(e) {
            let clickedCard = e.target;
            
            if(clickedCard !== cardOne && !disableDeck){ 
                clickedCard.classList.add("flip");

                if(!cardOne){
                    return cardOne = clickedCard
                }
                cardTwo =clickedCard;
                disableDeck = true;

                let cardOneImg = cardOne.querySelector(".Back img").src;
                let cardTwoImg = cardTwo.querySelector(".Back img").src;

                matchCards(cardOneImg, cardTwoImg);
            }
        }
        
        //두개의 이미지 비교하기
        function matchCards(img1, img2){
            if(img1 == img2){
                cardOne.removeEventListener("click", flipCard);
                cardTwo.removeEventListener("click", flipCard);
                cardOne = cardTwo = "";
                return disableDeck =false;
            }else{
                //틀린 이미지 애니메이션 효과 주기
                setTimeout(() => {
                    cardOne.classList.add("shake");
                    cardTwo.classList.add("shake");
                }, 400);

                setTimeout(() => {
                    cardOne.classList.remove("shake", "flip");
                    cardTwo.classList.remove("shake", "flip");
                    cardOne = cardTwo = "";
                    return disableDeck =false;
                }, 1200);
            }
        }

        cards.forEach(card => {
            card.addEventListener("click", flipCard);
        });