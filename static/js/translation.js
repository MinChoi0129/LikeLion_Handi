document.addEventListener('DOMContentLoaded', function() {
    updateLetterCount('');
  });
  
  function updateLetterCount(text) {
    const maxLength = 50;
    const currentLength = text.length;
    const letterNumElement = document.querySelector('.ChangeLetterNum');
    const textareaElement = document.querySelector('textarea[name="sentence"]');
  
    if (currentLength > maxLength) {
      letterNumElement.textContent = maxLength;
      textareaElement.value = text.slice(0, maxLength);
    } else {
      letterNumElement.textContent = currentLength;
    }
  }


  fetch('http://localhost:8000/api/translate')
  .then((response) => {
      return response.json();
  })
  .then((result) => {
      const videoUrl = result["video_url"];
      const videoSource = document.getElementById("videoSource");
      videoSource.src = videoUrl;
  })