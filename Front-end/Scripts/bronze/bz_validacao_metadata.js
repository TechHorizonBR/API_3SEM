window.onload = () => {
    opcoes_roles_metadata(roles,pagina_por_role,nome_por_role);
    opcoes_roles_acoes(userData);
    info_usuario(userData);
    addYamlAction();
    getBronzeData();
};

bronzeData = "";
columnsIds = [];

let roles = JSON.parse(localStorage.getItem("roles"))
let userData = JSON.parse(localStorage.getItem("usuario"));
let metadata = JSON.parse(localStorage.getItem("metadata"));
let token = JSON.parse(localStorage.getItem("token"))

const api = axios.create({
    baseURL:`http://localhost:8080`,
    headers: {
        'Authorization': `Bearer ${token}`
    }
})

function opcoes_roles_acoes(userData){
    let table = document.querySelector(".upload");
    for (let i in userData.roleUsuario){
        if (userData.roleUsuario[i] === "ROLE_LZ"){
            var listar_metadata = `
            <li><a href="../landing_zone/lz_upload.html">Upload CSV</a></li>
        `;
        table.insertAdjacentHTML("beforeend", listar_metadata);
        }
    }
}

let pagina_por_role = {
    0: "../admin/homeAdmin.html",
    1: "../landing_zone/lz_visualizar_metadata.html",
    2: "../bronze/bz_visualizar_metadata.html",
    3: "../silver/sv_visualizacao_metadata.html"

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

function addYamlAction(){
    document.getElementById("btn_yaml").addEventListener("click", ()=>{
        generateYaml();
    })
}

async function generateYaml(){
    try{
        let res = await api.get(`/download/yaml/2/${metadata.id}`, {
            responseType:'blob'
        });

        if(res && res.data){
            let url = window.URL.createObjectURL(res.data);
            let a = document.createElement("a");
            a.href = url;
            a.download = "config_bz.yaml";
            a.click();
            window.URL.revokeObjectURL(url);
        }else{
            console.error("A resposta da api não contém dados válidos.")
        }
    }catch(err){
        console.error("Erro ao baixar o arquivo YAML:",err);
    }
}

function generateTable() {
    let titulo = document.getElementById("title");
    titulo.innerHTML = "Visualização do metadata " + metadata.nome;

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

            let comentarioBronze = bronzeData[x].comentario === null || bronzeData[x].comentario === "null" ? "" : bronzeData[x].comentario;

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
                <td class="val_data"><textarea name="desc" id="desc${x}" class="desc_input">${comentarioBronze}</textarea></td>
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
        }
    });
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
        let response = await api.delete(`/colunas/${id}`);
        let message = "Campo deletado com sucesso.";
        let path = '/Front-end/media/images/success-img.gif'
        prompt_function(message, path)
        getBronzeData();
    } catch (err) {
        let message = "Alguma coisa deu errado. Tente novamente mais tarde.";
        let path = '/Front-end/media/images/error-img.gif'
        prompt_function(message, path)
    }
}

function prompt_function(message, path) {
    var back = `
    <div class="back_prompt" id="back_prompt">
    </div>
    `;

    var prompt_function= `
        <div class="prompt1" id="prompt">
            <img src="${path}" style="width: 35%">
            <span class="prompt_text">${message}</span>
            <div class="btns">
                <button class="btn_p" id="btn_OK">OK</button>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML("beforeend", back);
    let var_back = document.getElementById("back_prompt");
    var_back.insertAdjacentHTML("beforeend", prompt_function);

    document.getElementById("btn_OK").addEventListener("click", () => {
        document.getElementById("back_prompt").remove();
        document.getElementById("prompt").remove();
    });
}
async function getBronzeData() {
    try {
        let response = await api.get(`/colunas/metadata/${metadata.id}`);
        bronzeData = response.data;
        for (let coluna of bronzeData) {
            columnsIds.push(coluna.id);
        }
        generateTable();
    } catch (error) {
        let message = "Alguma coisa deu errado. Tente novamente mais tarde.";
        let path = '/Front-end/media/images/error-img.gif'
        prompt_function(message, path)
    }
}

async function sendData() {
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
        let response = await api.put("/colunas/update/bronze", dados);

        if (response.status === 200) {
            let message = "Dados atualizados com sucesso.";
            let path = '/Front-end/media/images/success-img.gif'
            prompt_function(message, path)
        } else {
            let message = "Alguma coisa deu errado. Tente novamente mais tarde.";
            let path = '/Front-end/media/images/error-img.gif'
            prompt_function(message, path)
        }
    } catch (error) {
        let message = "Alguma coisa deu errado. Tente novamente mais tarde.";
        let path = '/Front-end/media/images/error-img.gif'
        prompt_function(message, path)
    }
}

function confirmPrompt(id) {
    let existingBackPrompt = document.getElementById("back_prompt");
    let existingPrompt = document.getElementById("prompt");

    if (existingBackPrompt) {
        existingBackPrompt.remove();
    }
    if (existingPrompt) {
        existingPrompt.remove();
    }
    let back = `
    <div class="back_prompt" id="back_prompt">
    </div>
    `;

    let secondPrompt = `
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

    });

    document.getElementById("btn_no").addEventListener("click", () => {
        prompt.remove();
        var_back.remove();
    });
}
