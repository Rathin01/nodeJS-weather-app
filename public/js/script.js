const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const msgOne = document.querySelector("#message1");
const msgTwo = document.querySelector("#message2");

weatherForm.addEventListener("submit", e => {
  e.preventDefault();
  const location = search.value;
  const url = "/weather?address=" + encodeURIComponent(location);
  msgTwo.textContent = "";
  msgOne.textContent = "Loading. Please wait....";
  fetch(url).then(response => {
    response.json().then(data => {
      if (data.error) {
        msgOne.textContent = data.error;
      } else {
        msgOne.textContent = data.location;
        msgTwo.textContent = data.weather;
      }
    });
  });
});
