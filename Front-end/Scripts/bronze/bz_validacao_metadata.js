bronzeData = "";
columnsIds = [];
metadata = "";
let user = JSON.parse(localStorage.getItem("usuario"));

window.onload = () => {
    updateNameUsuario();
    getBronzeData();
    getMetadata();
};

function generateTable() {
    let table = document.getElementById("body_dados");
    table.innerHTML = "";
    for (let x = 0; x < bronzeData.length; x++) {
        let tipo = "";
        if (bronzeData[x].tipo === "boolean") {
            tipo = "Verdadeiro/Falso";
        } else if (bronzeData[x].tipo === "string") {
            tipo = "Texto";
        } else if (bronzeData[x].tipo === "int") {
            tipo = "Número Inteiro";
        } else if (bronzeData[x].tipo === "float") {
            tipo = "Número Decimal";
        } else {
            tipo = "Carácter Único";
        }
        let dadosTable = `
        <tr>
            <td class="checkbox-container"><input type="checkbox" class="checkbox-custom" id="checkbox${x}"></td>
            <td class="val_data" id="rest${x}">${
            bronzeData[x].restricao == "true" ? "SIM" : "NÃO"
        }</td>
            <td class="val_data">${bronzeData[x].nome}</td>
            <td class="val_data">${tipo}</td>
            <td class="val_desc">${bronzeData[x].descricao}</td>
            <td class="val_data">
                <select>
                    <option value="VALIDADO" ${
                        bronzeData[x].validado === "VALIDADO" ? "selected" : ""
                    }>Validado</option>
                    <option value="INVALIDADO" ${
                        bronzeData[x].validado === "INVALIDADO"
                            ? "selected"
                            : ""
                    }>Invalidado</option>
                    <option value="PENDENTE" ${
                        bronzeData[x].validado === "PENDENTE" ? "selected" : ""
                    }>Pendente</option>
                </select>
            </td>
            <td class="val_data"><textarea name="desc" id="desc${x}" class="desc_input"></textarea></td>
            <td class="btn_data">
                <button class="delete-btn" id="excluir" data-index="${x}">
                    <i class="fa-solid fa-trash" style="color: #fa0000; font-size:1.5em; pointer-events: none;"></i>
                </button>
            </td>
        </tr>`;
        table.insertAdjacentHTML("afterbegin", dadosTable);
    }

    table.addEventListener("click", (e) => {
        if (e.target.classList.contains("delete-btn")) {
            let index = e.target.getAttribute("data-index");
            let id = columnsIds[index];
            confirmPrompt(id);
            // deleteColumn(id);
        }
    });
}

// function validation() {
//     const regex = /^[a-zA-Z0-9_]*$/;
//     let errors = [];

//     for (let i = 0; i < dados.length; i++) {
//         inputsTextsValue = document.getElementById(`input-text${i}`).value;
//         if (!regex.test(inputsTextsValue)) {
//             errors.push(inputsTextsValue);
//         }
//     }

//     if (errors.length === 0) {
//         getData(dados);
//     } else {
//         newFailedPrompt(errors);
//     }
// }

function updateNameUsuario() {
    document.getElementById("username").innerHTML = user.nome;
}

document.getElementById("save").addEventListener("click", () => {
    alert("OLA");
    sendData();
});

async function deleteColumn(id) {
    try {
        let response = await axios.delete(
            `http://localhost:8080/colunas/${id}`
        );
        console.log(response.status);
        getBronzeData();
    } catch (err) {
        console.error(err);
    }
}

async function getMetadata() {
    try {
        let response = await axios.get(`http://localhost:8080/metadatas/${1}`);
        metadata = response.data;
        document.getElementById(
            "title"
        ).innerText = `Validacao do Esquema ${metadata.nome}`;
        console.log(metadata);
    } catch (error) {
        console.error(error);
    }
}

async function getBronzeData() {
    try {
        const sendId = {
            id: 2,
        };
        let response = await axios.post(
            "http://localhost:8080/colunas/metadata",
            sendId
        );
        bronzeData = response.data;
        console.log(bronzeData);
        for (let coluna of bronzeData) {
            columnsIds.push(coluna.id);
        }

        console.log(columnsIds);
        generateTable();
    } catch (error) {
        console.error(error);
    }
}

async function sendData(obj) {
    try {
        let dados = [];
        for (let y = 0; y < bronzeData.length; y++) {
            dados.push({
                chavePrimaria: document.getElementById(`checkbox${y}`).checked,
                restricao: bronzeData[y].restricao,
                nome: bronzeData[y].nome,
                tipo: bronzeData[y].tipo,
                descricao: bronzeData[y].descricao,
                validado: document.getElementById(`checkbox_v${y}`).checked,
                comentarioBronze: document.getElementById(`desc${y}`).value,
            });
        }

        console.log(dados);
        // let response = await axios.post(
        //     "http://localhost:8080/colunas",
        //     newColuna
        // );

        // if (response.status === 201) {
        //     newSuccessPrompt();
        // } else {
        //     alert("Um erro ocorreu no sistema, tente novamente mais tarde.");
        // }
    } catch (error) {
        console.error(error);
    }
}

function newSuccessPrompt() {
    var back = `
    <div class="back_prompt" id="back_prompt">
    </div>
    `;

    var successPrompt = `
        <div class="prompt" id="prompt">
            <span class="prompt_text">Sucesso! Seu esquema foi criado.</span>
            <div class="btns">
                <button class="btn_p" id="btn_ok">OK</button>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML("beforeend", back);
    let var_back = document.getElementById("back_prompt");
    var_back.insertAdjacentHTML("beforeend", successPrompt);

    document.getElementById("btn_ok").addEventListener("click", () => {
        document.getElementById("prompt").remove();
        window.location.href = "homeUser.html";
    });
}

function newFailedPrompt(errors) {
    var back = `
    <div class="back_prompt" id="back_prompt">
    </div>
    `;

    var failedPrompt = `
        <div class="prompt" id="prompt">
            <span class="prompt_text" id="validate_identification">Valor inválido na(s) coluna(s): ${errors}</span>
            <div id="text_validation">O nome das colunas não podem conter espaços ou caracteres especiais, exceto o caractere de sublinhado (_).</div>
            <div class="btns">
                <button class="btn_p" id="btn_ok">OK</button>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML("beforeend", back);
    let var_back = document.getElementById("back_prompt");
    var_back.insertAdjacentHTML("beforeend", failedPrompt);

    document.getElementById("btn_ok").addEventListener("click", () => {
        document.getElementById("prompt").remove();
        document.getElementById("back_prompt").remove();
    });
}

function confirmPrompt(id) {
    var back = `
    <div class="back_prompt" id="back_prompt">
    </div>
    `;

    var secondPrompt = `
    <div class="prompt" id="prompt">
        <span class="prompt_text">Confirma a exclusão da coluna?</span>
        <div class="btns">
            <button class="btn_p" id="btn_yes">Sim</button>
            <button class="btn_p" id="btn_no">Não</button>
        </div>
    </div>
    `;

    document.body.insertAdjacentHTML("beforeend", back);
    let var_back = document.getElementById("back_prompt");
    var_back.insertAdjacentHTML("beforeend", secondPrompt);
    let prompt = document.getElementById("prompt");

    document.getElementById("btn_yes").addEventListener("click", () => {
        deleteColumn(id);
        prompt.remove();
        var_back.remove();
        // sendMetadata(id_empresa);
    });

    document.getElementById("btn_no").addEventListener("click", () => {
        prompt.remove();
        var_back.remove();
        // sendMetadata(id_empresa);
    });
}
