let metadata_id = localStorage.getItem("metadata");
metadata_id = JSON.parse(metadata_id);
dados_Json = "";
var isEdit = false;

async function getAllData() {
    try {
        const sendId = {
            id: metadata_id.id,
        };
        let response = await axios.post(
            "http://localhost:8080/colunas/metadata",
            sendId
        );
        dados_Json = response.data;
        popularTabela();
    } catch (error) {
        console.error(error);
    }
}

async function updateData(newData) {
    try {
        let response = await axios.put(
            "http://localhost:8080/colunas/update",
            newData
        );
        if(response.status === 200){
            newPrompt();
            document.getElementById("btn_pen").className = "fa-solid fa-pen";
            document.getElementById("btn_atualizar").removeEventListener("click", eventoAtualizar)
            getAllData();
            isEdit =  false;
        }else{
            console.log("Um erro aconteceu no sistema.")
        }
        popularTabela();
    } catch (error) {
        console.error(error);
    }
}

function eventoAtualizar(){
    let todosDados = [];
    for(let y = 0; y < dados_Json.length; y++){
        let checkBoxesValues = document.getElementById(`checkbox${y}`).checked;
        let inputsTextsValues = document.getElementById(`input-text${y}`).value;
        let selectsValues = document.getElementById(`select${y}`).value;
        let descValues = document.getElementById(`desc${y}`).value;

        let newColuna = {
            id: dados_Json[y].id,
            nome: inputsTextsValues,
            tipo: selectsValues,
            restricao: checkBoxesValues.toString(),
            descricao: descValues,
        }

        todosDados.push(newColuna);
    }
    updateData(todosDados);
}

function popularTabela() {
    let tabela = document.getElementById("body_dados");
    let btn_atualizar = document.getElementById("btn_atualizar");
    btn_atualizar.style = "visibility: hidden;";
    tabela.innerHTML = "";
    let titulo = document.getElementById("title");
    titulo.innerHTML = "Visualização do metadata " + metadata_id.name;

    for (let x = dados_Json.length - 1; x >= 0; x--) {
        let linha = tabela.insertRow();
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        if (dados_Json[x].restricao === "true") {
            checkbox.checked = true;
        }
        checkbox.addEventListener("click", (e) => {
            e.preventDefault();
        });
        checkbox.style = "pointer-events: none; cursor: not-allowed;";

        let celulaCheck = linha.insertCell(0);
        let celulaNome = linha.insertCell(1);
        let celulaDado = linha.insertCell(2);
        let celulaDesc = linha.insertCell(3);
        celulaCheck.appendChild(checkbox);
        celulaNome.innerHTML = dados_Json[x].nome;
        if (dados_Json[x].tipo === "boolean") {
            celulaDado.innerHTML = "Verdadeiro/Falso";
        } else if (dados_Json[x].tipo === "string") {
            celulaDado.innerHTML = "Texto";
        } else if (dados_Json[x].tipo === "int") {
            celulaDado.innerHTML = "Número Inteiro";
        } else if (dados_Json[x].tipo === "float") {
            celulaDado.innerHTML = "Número Decimal";
        } else {
            celulaDado.innerHTML = "Carácter Único";
        }

        // celulaDado.innerHTML = dados_Json[x].tipo;
        celulaDesc.innerHTML = dados_Json[x].descricao;

        celulaCheck.classList.add("tab_check");
    }
}

window.onload = () => {
    getAllData();
};

function editData(){
    let tabela_atual = document.getElementById("body_dados");
    let btn_atualizar = document.getElementById("btn_atualizar");
    tabela_atual.innerHTML = "";
    btn_atualizar.style = "visibility: visible;";
    for (let x = 0; x < dados_Json.length; x++) {
        let isChecked = "";
        if (dados_Json[x].restricao === "true") {
            isChecked = "checked";
        } else {
            isChecked = "";
        }

        let selectedOption = [];
        console.log(dados_Json[x].tipo);
        switch (dados_Json[x].tipo) {
            case "string":
                selectedOption[0] = "selected";
                break;
            case "float":
                selectedOption[1] = "selected";
                break;
            case "int":
                selectedOption[2] = "selected";
                break;
            case "boolean":
                selectedOption[3] = "selected";
                break;
            case "char":
                selectedOption[4] = "selected";
                break;
            default:
                selectedOption[0] = "";
                selectedOption[1] = "";
                selectedOption[2] = "";
                selectedOption[3] = "";
                selectedOption[4] = "";
        }

        let dadosTable = `
        <tr>
          <td class="checkbox-container"><input type="checkbox" class="checkbox-custom" id="checkbox${x}" ${isChecked}></td>
          <td><input type="text" class="inputs" id="input-text${x}" value="${dados_Json[x].nome}"></td>
          <td>
              <select class="inputs select-custom" id="select${x}">
                  <option value="string" ${selectedOption[0]}>Texto</option>
                  <option value="float" ${selectedOption[1]}>Número decimal</option>
                  <option value="int" ${selectedOption[2]}>Número inteiro</option>
                  <option value="boolean" ${selectedOption[3]}>Verdadeiro/Falso</option>
                  <option value="char" ${selectedOption[4]}>Caracter Único (Ex: M ou F)</option>
              </select>
          </td>
          <td><textarea name="desc" id="desc${x}" class="desc_input">${dados_Json[x].descricao}</textarea></td>
        </tr>`;
        tabela_atual.insertAdjacentHTML("afterbegin", dadosTable);
    }
    btn_atualizar.addEventListener("click", eventoAtualizar);
}

document.getElementById("btn_pen").addEventListener("click", () => {

    if(!isEdit){
        document.getElementById("btn_pen").className = "fa-solid fa-xmark";
        editData();
        isEdit = true;
    }else{
        document.getElementById("btn_pen").className = "fa-solid fa-pen";
        popularTabela();
        isEdit =  false;
    }
    
});

function newPrompt(){
    var back = `
    <div class="back_prompt" id="back_prompt">
    </div>
    `

    var successPrompt = `
        <div class="prompt" id="prompt">
            <span class="prompt_text">Sucesso! Seu esquema foi atualizado.</span>
            <div class="btns">
                <button class="btn_p" id="btn_ok">OK</button>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', back);
    let var_back = document.getElementById("back_prompt");
    var_back.insertAdjacentHTML('beforeend', successPrompt);

    document.getElementById("btn_ok").addEventListener("click", () => {
        // document.getElementById("prompt").remove();
        document.getElementById("back_prompt").remove();
    });
}