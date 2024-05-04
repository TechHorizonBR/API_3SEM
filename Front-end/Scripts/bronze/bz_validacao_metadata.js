bronzeData = "";
columnsIds = [];
                                    let user = JSON.parse(localStorage.getItem("usuario"));
met_selec = localStorage.getItem("metadata");

window.onload = () => {
    opcoes_roles_metadata(roles,pagina_por_role,nome_por_role)
    opcoes_roles_acoes(userData)
    info_usuario(userData)
    getBronzeData();
    getMetadata();
};
let metadata = JSON.parse(localStorage.getItem("metadata"));

let metadataId = metadata.id;
let metadataName = metadata.nome;

let usuario = localStorage.getItem("usuario");
let roles = JSON.parse(localStorage.getItem("roles"))
let userData = JSON.parse(localStorage.getItem("usuario"));


function opcoes_roles_acoes(userData){
    let table = document.querySelector(".upload");
    for (let i in userData.roleUsuario){
        if (userData.roleUsuario[i] === "ROLE_LZ"){
            var listar_metadata = `
            <li><a href="../landing_zone/lz_upload.html">Upload CSV</a></li>
        `;
        console.log(userData.roleUsuario)
        table.insertAdjacentHTML("beforeend", listar_metadata);
        }
        else if(userData.roleUsuario[i] === "ROLE_SILVER"){
            var listar_metadata = `
            <li><a href="#">Relacionamentos</a></li>
        `;
        console.log(userData.roleUsuario)
        table.insertAdjacentHTML("beforeend", listar_metadata);
        }
    }
}

let pagina_por_role = {
    0: "../admin/homeAdmin.html",
    1: "../landing_zone/homeUser.html",
    2: "../bronze/bz_visualizar_metadata.html",
    3: "../silver/",
}
let nome_por_role= {
    0: "Adminstrador",
    1: "Landing Zone",
    2: "Bronze",
    3: "Silver",
}
function info_usuario(userData){
    namespace = document.getElementById("user_name").textContent = userData.nome
}
function opcoes_roles_metadata(roles,pagina_por_role,nome_por_role) {
    let table = document.querySelector(".metadatas");

    for (let chave in roles) {
        enum_role = roles[chave]
        let rota = pagina_por_role[enum_role];
        let nome = nome_por_role[enum_role];
        console.log("CHAVE:",pagina_por_role[1])

        if(roles[chave] == "ROLE_LZ"){
            var listar_metadata = `
            <li><a href="${pagina_por_role[1]}">${nome_por_role[1]}</a></li>
        `;
            table.insertAdjacentHTML("beforeend", listar_metadata);
        }else if(roles[chave] == "ROLE_BRONZE"){
            var listar_metadata = `
            <li><a href="${pagina_por_role[2]}">${nome_por_role[2]}</a></li>
        `;
            table.insertAdjacentHTML("beforeend", listar_metadata);
        }else if(roles[chave] == "ROLE_SILVER"){
            var listar_metadata = `
            <li><a href="${pagina_por_role[3]}">${nome_por_role[3]}</a></li>
        `;
            table.insertAdjacentHTML("beforeend", listar_metadata);
        }  
    }
}

function generateTable() {
    let titulo = document.getElementById("title");
    titulo.innerHTML = "Visualização do metadata " + metadataName;

    let table = document.getElementById("body_dados");
    table.innerHTML = "";
    for (let x = 0; x < bronzeData.length; x++) {
        if(bronzeData[x].ativo !== false){
            let tipo = "";
            if (bronzeData[x].tipo === "boolean") {
                tipo = "Verdadeiro/Falso";
            } else if (bronzeData[x].tipo === "string") {
                tipo = "Texto";
            } else if (bronzeData[x].tipo === "int") {
                tipo = "Número Inteiro";
            } else if (bronzeData[x].tipo === "float") {
                tipo = "Número Decimal";
            } else if (bronzeData[x].tipo === "char"){
                tipo = "Carácter Único";
            }else{
                tipo = "Data";
            }
            let checkboxChecked = bronzeData[x].chavePrimaria ? "checked" : "";
            let dadosTable = `
            <tr>
                <td class="checkbox-container"><input type="checkbox" class="checkbox-custom" id="checkbox${x}" ${checkboxChecked}></td>
                <td class="val_data" id="rest${x}">${
                bronzeData[x].restricao == "true" ? "SIM" : "NÃO"
            }</td>
                <td class="val_data">${bronzeData[x].nome}</td>
                <td class="val_data">${tipo}</td>
                <td class="val_desc">${bronzeData[x].descricao}</td>
                <td class="val_data">
                    <select id="valid_select_${x}">
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
                <td class="val_data"><textarea name="desc" id="desc${x}" class="desc_input">${bronzeData[x].comentario}</textarea></td>
                <td class="btn_data">
                    <button class="delete-btn" id="excluir" data-index="${x}">
                        <i class="fa-solid fa-trash" style="color: #fa0000; font-size:1.5em; pointer-events: none;"></i>
                    </button>
                </td>
            </tr>`;
            table.insertAdjacentHTML("afterbegin", dadosTable);
        }
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
    sendData();
});

async function deleteColumn(id) {
    try {
        let col_delete = {
            id:id,
            ativo:false
        }
        let response = await axios.patch(
            `http://localhost:8080/colunas/update/ativo`,
            col_delete
        );
        getBronzeData();
    } catch (err) {
        console.error(err);
    }
}

async function getBronzeData() {
    try {
        let response = await axios.get(
            `http://localhost:8080/colunas/metadata/${metadataId}`
        );
        bronzeData = response.data;
        for (let coluna of bronzeData) {
            columnsIds.push(coluna.id);
        }
        generateTable();
    } catch (error) {
        console.error(error);
    }
}

async function sendData(obj) {
    try {
        let dados = [];
        for (let y = 0; y < bronzeData.length; y++) {
            if(bronzeData[y].ativo !== false){
                dados.push({
                    id: bronzeData[y].id,
                    chavePrimaria: document.getElementById(`checkbox${y}`).checked,
                    validado: document.getElementById(`valid_select_${y}`).value,
                    comentario: document.getElementById(`desc${y}`).value,
                });
            }
        }

        console.log(dados);
        let response = await axios.put(
            "http://localhost:8080/colunas/update/bronze",
            dados
        );

        if (response.status === 200) {
            newSuccessPrompt();
        } else {
            alert("Um erro ocorreu no sistema, tente novamente mais tarde.");
        }
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
            <span class="prompt_text">Sucesso! Seu esquema foi Atualizado.</span>
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
        window.location.href = "bz_visualizar_metadata.html";
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
