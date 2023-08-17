fetch("http://localhost:8000/api/users/")
  .then((response) => {
    return response.json();
  })
  .then((결과) => {
    console.log(결과[0].username);
  });
