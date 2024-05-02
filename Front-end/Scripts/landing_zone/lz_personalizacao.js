window.onload = () => {
    setCSVSeparator()
    generateTable()
};

const saveButton = document.querySelector("#save");

let dados = localStorage.getItem("cabecalho");
let exampleData = localStorage.getItem("dados1");
let id_metadata = parseInt(localStorage.getItem("metadata_id"));

let allResquests = 0;

function setCSVSeparator(){
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
                    <option value="date">Date</option>
                </select>
            </td>
            <td><textarea name="desc" id="desc${x}" class="desc_input"></textarea></td>
        </tr>`;
        table.insertAdjacentHTML("afterbegin", dadosTable);
    }
}

saveButton.addEventListener("click", function () {
    validation();
});

function validation() {
    const regex = /^[a-zA-Z0-9_]*$/;
    let errors = [];

    for(let i = 0; i < dados.length; i++){
        inputsTextsValue = document.getElementById(`input-text${i}`).value;
        if (!regex.test(inputsTextsValue)) {
            errors.push(inputsTextsValue)
        }
    }

    if (errors.length === 0){
        getData(dados)
    }else{
        newFailedPrompt(errors)
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
                newSuccessPrompt();
            }else{
                alert("Um erro ocorreu no sistema, tente novamente mais tarde.")
            }
        }

    }catch(error){
        console.log(error);
    }
}

function newSuccessPrompt(){
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
        localStorage.removeItem('metadata_id');
        localStorage.removeItem('cabecalho');
        localStorage.removeItem('dados1');
        window.location.href = "homeUser.html"
    });
}

function newFailedPrompt(errors){
    var back = `
    <div class="back_prompt" id="back_prompt">
    </div>
    `

    var failedPrompt = `
        <div class="prompt" id="prompt">
            <span class="prompt_text" id="validate_identification">Valor inválido na(s) coluna(s): ${errors}</span>
            <div id="text_validation">O nome das colunas não podem conter espaços ou caracteres especiais, exceto o caractere de sublinhado (_).</div>
            <div class="btns">
                <button class="btn_p" id="btn_ok">OK</button>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', back);
    let var_back = document.getElementById("back_prompt");
    var_back.insertAdjacentHTML('beforeend', failedPrompt);

    document.getElementById("btn_ok").addEventListener("click", () => {
        document.getElementById("prompt").remove();
        document.getElementById("back_prompt").remove();
    });
}
