// Carregar elementos da página
window.onload = () => {
    separatorCSV()
    generateTable()
};

// Seleção de elementos
const saveButton = document.querySelector("#save");

let dados = localStorage.getItem("cabecalho");
let exampleData = localStorage.getItem("dados1");
let id_metadata = localStorage.getItem("metadata_id");
id_metadata = parseInt(id_metadata);

let allResquests = 0;

// Eventos
saveButton.addEventListener("click", function () {
    getData(dados);
});

// Funções
function separatorCSV(){
    let dados_string = dados.toString();

    if(dados_string.includes(",")){
        dados = dados.split(",")
        exampleData = exampleData.split(",")
    }else{
        dados = dados.split(";")
        exampleData = exampleData.split(";")
    }
}

function generateTable(){

    let table = document.getElementById("body_dados");
    for (let x = 0; x < dados.length; x++) {
        let dadosTable = `
        <tr>
          <td class="checkbox-container"><input type="checkbox" class="checkbox-custom" id="checkbox${x}"></td>
          <td><input type="text" class="inputs" id="input-text${x}" value="${dados[x]}"></td>
          <td>${exampleData[x]}</td>
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

        sendData(checkBoxesValues, inputsTextsValues, selectsValues, descValues, id_metadata)
    }
}

async function sendData(checkBoxesValues, inputsTextsValues, selectsValues, descValues, id_metadata) {
    try{
        let newColuna = {
            nome: inputsTextsValues,
            tipo: selectsValues,
            restricao: checkBoxesValues.toString(),
            descricao: descValues,
            metadata: {
                id: id_metadata
            }
        }

        let response = await axios.post("http://localhost:8080/colunas", newColuna);
        console.log(response);

        allResquests++;

        if(allResquests === dados.length){
            if(response.status === 201) {
                newPrompt();
            }else{
                alert("Um erro ocorreu no sistema, tente novamente mais tarde.")
            }
        }

    }catch(error){
        console.log(error);
    }
}

function newPrompt(){
    var back = `
    <div class="back_prompt" id="back_prompt">
    </div>
    `

    var successPrompt = `
        <div class="prompt" id="prompt">
            <span class="prompt_text">Sucesso! Seu esquema foi criado.</span>
            <div class="btns">
                <button class="btn_p" id="btn_ok">OK</button>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', back);
    let var_back = document.getElementById("back_prompt");
    var_back.insertAdjacentHTML('beforeend', successPrompt);

    document.getElementById("btn_ok").addEventListener("click", () => {
        document.getElementById("prompt").remove();
        window.location.href = "homeUser.html"
    });
}
