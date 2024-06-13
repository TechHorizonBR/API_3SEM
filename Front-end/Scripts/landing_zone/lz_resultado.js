window.onload = () => {
    opcoes_roles_metadata(roles,pagina_por_role,nome_por_role)
    opcoes_roles_acoes(userData)
    info_usuario(userData)
    getAllData();
    // updateNameUsuario();
    addYamlAction();
};

let roles = JSON.parse(localStorage.getItem("roles"))
let userData = JSON.parse(localStorage.getItem("usuario"));
let token = JSON.parse(localStorage.getItem("token"))

const api = axios.create({
    baseURL:`http://localhost:8080`,
    headers: {
    'Authorization': `Bearer ${token}`
    }

})

function addYamlAction(){
    document.getElementById("btn_yaml").addEventListener("click", ()=>{
        generateYaml();
    })
}

function opcoes_roles_acoes(userData){
    let table = document.querySelector(".upload");
    for (let i in userData.roleUsuario){
        if (userData.roleUsuario[i] === "ROLE_LZ"){
            var listar_metadata = `
            <li><a href="../landing_zone/lz_upload.html">Upload CSV</a></li>
        `;
        table.insertAdjacentHTML("beforeend", listar_metadata);
        }
        else if(userData.roleUsuario[i] === "ROLE_SILVER"){
            var listar_metadata = `
            <li><a href="#">Relacionamentos</a></li>
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
        let rota = pagina_por_role[enum_role];
        let nome = nome_por_role[enum_role];

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
let metadata = JSON.parse(localStorage.getItem("metadata"));

let metadataId = metadata.id;
let metadataName = metadata.nome;

let userId = userData.id;
let userName = userData.nome;

var isEdit = false;

async function getAllData() {
    try {

        let response = await api.get(`/colunas/metadata/${metadataId}`);

        dados_Json = response.data;
        popularTabela();
    } catch (error) {
        console.error(error);
    }
}

async function updateData(newData) {
    try {
        let response = await api.put(
            "/colunas/update",
            newData
        );
        if(response.status === 200){
            let message = "Dados atualizados com sucesso.";
            let path = '/Front-end/media/images/success-img.gif'
            prompt_function(message, path)
            document.getElementById("btn_pen").className = "fa-solid fa-pen";
            document.getElementById("btn_atualizar").removeEventListener("click", eventoAtualizar)
            getAllData();
            isEdit =  false;
        }else{
            let message = "Alguma coisa deu errado. Tente novamente mais tarde.";
            let path = '/Front-end/media/images/error-img.gif'
            prompt_function(message, path)
        }
        popularTabela();
    } catch (error) {
        let message = "Alguma coisa deu errado. Tente novamente mais tarde.";
        let path = '/Front-end/media/images/error-img.gif'
        prompt_function(message, path)
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
    validation(todosDados);
}

async function generateYaml(){
    try{
        let res = await api.get(`/download/yaml/1/${metadataId}`, {
            responseType:'blob'
        });

        if(res && res.data){
            let url = window.URL.createObjectURL(res.data);
            let a = document.createElement("a");
            a.href = url;
            a.download = "config_lz.yaml";
            a.click();
            window.URL.revokeObjectURL(url);
        }else{
            console.error("A resposta da api não contém dados válidos.")
        }
    }catch(err){
        console.error("Erro ao baixar o arquivo YAML:",err);
    }
}

function popularTabela() {
    let tabela = document.getElementById("body_dados");
    let btn_atualizar = document.getElementById("btn_atualizar");
    let btn_yaml = document.getElementById("btn_yaml");
    btn_atualizar.style = "display:none;";
    btn_yaml.style = "display:block;"

    tabela.innerHTML = "";

    let titulo = document.getElementById("title");
    titulo.innerHTML = "Visualização do metadata " + metadataName;

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
        celulaCheck.appendChild(checkbox);

        let celulaNome = linha.insertCell(1);
        celulaNome.innerHTML = dados_Json[x].nome;

        let celulaDado = linha.insertCell(2);
        if (dados_Json[x].tipo === "boolean") {
            celulaDado.innerHTML = "Verdadeiro/Falso";
        } else if (dados_Json[x].tipo === "string") {
            celulaDado.innerHTML = "Texto";
        } else if (dados_Json[x].tipo === "int") {
            celulaDado.innerHTML = "Número Inteiro";
        } else if (dados_Json[x].tipo === "float") {
            celulaDado.innerHTML = "Número Decimal";
        } else if (dados_Json[x].tipo === "char") {
            celulaDado.innerHTML = "Carácter Único";
        } else {
            celulaDado.innerHTML = "Data";
        }

        let celulaDesc = linha.insertCell(3);
        celulaDesc.innerHTML = dados_Json[x].descricao;

        let celulaStatus = linha.insertCell(4);
        let status = dados_Json[x].validado.toLowerCase();

        switch (status) {
            case "pendente":
                celulaStatus.innerHTML = "Pendente";
                celulaStatus.style.color = "#FFA800";
                break;
            case "validado":
                celulaStatus.innerHTML = "Validado";
                celulaStatus.style.color = "#0CF030";
                break;
            case "invalidado":
                celulaStatus.innerHTML = "Invalidado";
                celulaStatus.style.color = "#f00c0c";
                break;
            default:
                celulaStatus.innerHTML = status;
        }

        let celulaFeedback = linha.insertCell(5);
        celulaFeedback.innerHTML = dados_Json[x].comentario === "null" ? "" : dados_Json[x].comentario;

        celulaCheck.classList.add("tab_check");
    }
}

function editData(){
    let tabela_atual = document.getElementById("body_dados");
    let btn_atualizar = document.getElementById("btn_atualizar");
    let btn_yaml = document.getElementById("btn_yaml");
    tabela_atual.innerHTML = "";
    btn_yaml.style = "display: none;"
    btn_atualizar.style = "display: block;";
    for (let x = 0; x < dados_Json.length; x++) {
        let isChecked = "";
        if (dados_Json[x].restricao === "true") {
            isChecked = "checked";
        } else {
            isChecked = "";
        }

        let selectedOption = [];
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
            case "date":
                selectedOption[5] = "selected";
                break;
            default:
                selectedOption[0] = "";
                selectedOption[1] = "";
                selectedOption[2] = "";
                selectedOption[3] = "";
                selectedOption[4] = "";
                selectedOption[5] = "";
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
                  <option value="date" ${selectedOption[5]}>Data</option>
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


function validation(todosDados) {
    const regex = /^[a-zA-Z0-9_]*$/;
    let errors = [];

    for(let i = 0; i < todosDados.length; i++){
        inputsTextsValue = document.getElementById(`input-text${i}`).value;
        if (!regex.test(inputsTextsValue)) {
            errors.push(inputsTextsValue)
        }
    }

    if (errors.length === 0){
        updateData(todosDados)
    }else{
        newFailedPrompt(errors)
    }

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

// function updateNameUsuario(){
//     document.getElementById("username").innerHTML = userName
// }
