// Carregar elementos da página
window.onload = () => {
    let dados = localStorage.getItem("cabecalho");
    dados = dados[0].split(";")

    let table = document.getElementById("body_dados");
    for (let x = 0; x < dados.length; x++) {
        let dadosTable = `
        <tr>
          <td class="checkbox-container"><input type="checkbox" class="checkbox-custom" id="checkbox${x}"></td>
          <td><input type="text" class="inputs" id="input-text${x}" value="${dados[x]}"></td>
          <td>
              <select class="inputs select-custom" id="select${x}">
                  <option value="string">Texto</option>
                  <option value="float">Número decimal</option>
                  <option value="int">Número inteiro</option>
                  <option value="boolean">Verdadeiro/Falso</option>
                  <option value="char">Caracter Único (Ex: M ou F)</option>
              </select>
          </td>
          <td><textarea name="desc" id="desc${x}" class="desc_input"></textarea></td>
        </tr>`;
        table.insertAdjacentHTML("afterbegin", dadosTable);
    }
};

// Seleção de elementos
const backButton = document.querySelector("#back");
const saveButton = document.querySelector("#save");

// Eventos
saveButton.addEventListener("click", function () {
    getData(checkBoxesValues, inputsTextsValues, selectsValues, descValues);
});

// Funções
function getData(checkBoxesValues, inputsTextsValues, selectsValues, descValues) {
    for(let y = 0; y < dados.length; y++){
        checkBoxesValues = document.getElementById(`checkbox${y}`).checked;
        inputsTextsValues = document.getElementById(`input-text${y}`).value;
        selectsValues = document.getElementById(`select${y}`).value;
        descValues = document.getElementById(`desc${y}`).value;

        sendData(checkBoxesValues, inputsTextsValues, selectsValues, descValues)
    }

}


async function sendData(checkBoxesValues, inputsTextsValues, selectsValues, descValues) {
    try{
        let newColuna = {
            nome: inputsTextsValues,
            tipo: selectsValues,
            restricao: checkBoxesValues,
            descricao: descValues
        }

        let response = await axios.post("http://localhost:8080/colunas", newColuna);
        console.log(response);

        if(response.status === 200){
            window.location.href = "Front-end/Pages/homeUser.html";
        }else{
            alert("Um erro ocorreu no sistema, tente novamente mais tarde.")
        }

    }catch(error){
        console.log('Deu ruim')
        console.error(error);
    }
}
