fetch("http://127.0.0.1:8000/api/users/")
  .then((response) => {
    return response.json();
  })
  .then((결과) => {
    console.log(결과[0].username);
  });
