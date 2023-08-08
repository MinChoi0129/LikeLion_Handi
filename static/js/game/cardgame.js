// JavaScript 코드
const firstCard = document.querySelector('.FirstCard');

firstCard.addEventListener('click', function() {
  // 클릭 시 변경하고자 하는 이미지 URL로 변경하세요.
  const newImageUrl = '새로운 이미지 URL';
  
  // 이미지 변경
  firstCard.src = newImageUrl;
});