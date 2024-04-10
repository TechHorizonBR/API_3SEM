// Carregar elementos da página
window.onload = () => {
    generateTable(dados)
};

// Seleção de elementos
const backButton = document.querySelector("#back");
const saveButton = document.querySelector("#save");
let dados = localStorage.getItem("cabecalho");
let metadata = localStorage.getItem("metadata_id");
metadata = parseInt(metadata);

console.log(metadata)

// Eventos
saveButton.addEventListener("click", function () {
    getData(dados);
});

// Funções
function generateTable(dados){
    let dados_string = dados.toString();

    if(dados_string.includes(",")){
        dados = dados.split(",")
    }else{
        dados = dados.split(";")
    }

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
}

function getData(dados) {
    for(let y = 0; y < dados.length; y++){
        let checkBoxesValues = document.getElementById(`checkbox${y}`).checked;
        let inputsTextsValues = document.getElementById(`input-text${y}`).value;
        let selectsValues = document.getElementById(`select${y}`).value;
        let descValues = document.getElementById(`desc${y}`).value;

        sendData(checkBoxesValues, inputsTextsValues, selectsValues, descValues, metadata)
    }

}

async function sendData(checkBoxesValues, inputsTextsValues, selectsValues, descValues, metadata) {
    try{
        let newColuna = {
            nome: inputsTextsValues,
            tipo: selectsValues,
            restricao: checkBoxesValues.toString(),
            descricao: descValues,
            metadata: {
                id: metadata
            }
        }
        console.log(newColuna)
        let response = await axios.post("http://localhost:8080/colunas", newColuna);
        console.log(response);

        if(response.status === 200){
            window.location.href = "homeUser.html";
        }else{
            alert("Um erro ocorreu no sistema, tente novamente mais tarde.")
        }

    }catch(error){
        console.error(error);
    }
}
