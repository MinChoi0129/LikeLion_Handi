<<<<<<< Updated upstream
fetch("http://localhost:8000/api/users/")
=======
fetch("http://101.101.209.37/api/users/")
>>>>>>> Stashed changes
  .then((response) => {
    return response.json();
  })
  .then((결과) => {
    console.log(결과[0].username);
  });
