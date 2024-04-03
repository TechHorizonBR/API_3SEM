// Seleção de elementos
const backButton = document.querySelector("#back");
const saveButton = document.querySelector("#save");

// Eventos

saveButton.addEventListener("click", function() {
  const checkboxValue = document.querySelector("#checkbox").checked;
  const inputTextValue = document.querySelector("#input-text").value;
  const selectValue = document.querySelector("#select").value;

  console.log(checkboxValue)
  console.log(inputTextValue)
  console.log(selectValue)

  sendData(checkboxValue, inputTextValue, selectValue)
});

backButton.addEventListener("click", function() {
  updateInput();
});

// Funções

function sendData(checkboxValue, inputTextValue, selectValue) {
  fetch("http://127.0.0.1:5501/Back-end", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        checkbox: checkboxValue,
        inputText: inputTextValue,
        select: selectValue
    })
  })
  .then(response => {
      if (response.ok) {
          console.log("Deu bom!!!");
      } else {
          console.error("Deu ruim :(");
      }
  })
  .catch(error => {
      console.error("Erro: ", error);
  });
}

