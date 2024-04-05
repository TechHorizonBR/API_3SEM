window.onload = () => {
    let dados = localStorage.getItem("cabecalho");
    dados = dados.split(";");

    let table = document.getElementById("body_dados");
    for (let x = 0; x < dados.length; x++) {
        let dadosTable = `
        <tr>
          <td><input type="checkbox" id="checkbox"></td>
          <td><input type="text" class="inputs" id="input-text" value="${dados[x]}"></td>
          <td>
              <select class="inputs" id="select">
                  <option value="string">Texto</option>
                  <option value="float">Número decimal</option>
                  <option value="int">Número inteiro</option>
                  <option value="boolean">Verdadeiro/Falso</option>
                  <option value="char">Caracter Único (Ex: M ou F)</option>
              </select>
          </td>
          <td><textarea name="desc" id="desc" class="desc_input" cols="30" rows="1" maxlength="100"></textarea></td>
        </tr>`;
        table.insertAdjacentHTML("afterbegin", dadosTable);
    }
};

// Seleção de elementos
const backButton = document.querySelector("#back");
const saveButton = document.querySelector("#save");

// Eventos
saveButton.addEventListener("click", function () {
    let checkboxValue = document.querySelector("#checkbox").checked;
    let inputTextValue = document.querySelector("#input-text").value;
    let selectValue = document.querySelector("#select").value;

    if(checkboxValue === true){
      checkboxValue = "NOT NULL";
    }else{
      checkboxValue = null;
    }
    console.log(checkboxValue);
    console.log(inputTextValue);
    console.log(selectValue);

    sendData(checkboxValue, inputTextValue, selectValue)
});

backButton.addEventListener("click", function () {
    updateInput();
});

// Funções

function sendData(checkboxValue, inputTextValue, selectValue) {
    fetch("http://localhost:8080/colunas", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            checkbox: checkboxValue,
            inputText: inputTextValue,
            select: selectValue,
        }),
    })
        .then((response) => {
            if (response.ok) {
                console.log("Deu bom!!!");
            } else {
                console.error("Deu ruim :(");
            }
        })
        .catch((error) => {
            console.error("Erro: ", error);
        });
}
