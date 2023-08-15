document.addEventListener('DOMContentLoaded', function() {
    updateLetterCount('');
  });
  
  function updateLetterCount(text) {
    const maxLength = 50;
    const currentLength = text.length;
    const letterNumElement = document.querySelector('.ChangeLetterNum');
    const textareaElement = document.querySelector('textarea[name="TranslationContent"]');
  
    if (currentLength > maxLength) {
      letterNumElement.textContent = maxLength;
      textareaElement.value = text.slice(0, maxLength);
    } else {
      letterNumElement.textContent = currentLength;
    }
  }


  fetch('http://localhost:8000/api/translate/<video_url>')
	.then((response) => {
		return response.json()
		})
	.then((결과) => {
		console.log(결과[0].["username"])
		console.log(결과[0].username)
	})