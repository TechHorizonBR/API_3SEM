window.onload = () => {
    opcoes_roles_metadata(roles,pagina_por_role,nome_por_role)
    opcoes_roles_acoes(userData)
    info_usuario(userData)
    setCSVSeparator()
    generateTable()
};

const saveButton = document.querySelector("#save");

let dados = localStorage.getItem("cabecalho");
let exampleData = localStorage.getItem("dados1");
let id_metadata = parseInt(localStorage.getItem("metadata_id"));

let roles = JSON.parse(localStorage.getItem("roles"))
let userData = JSON.parse(localStorage.getItem("usuario"));
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
                    <option value="date">Data</option>
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

        
        let message = `
            <div id="text_validation" style="text-align: center">
            <span style="font-weight: bold;">Valor inválido na(s) coluna(s): ${errors}</span><br>
            O nome das colunas não podem conter espaços ou caracteres especiais, exceto o caractere de sublinhado (_).</div>
        `;
        let path = '/Front-end/media/images/error-img.gif'
        prompt_function(message, path, 0)
        
    }

}

function getData(dados) {
    let allData = [];

    for (let y = 0; y < dados.length; y++) {
        let descricaoValue = document.getElementById(`desc${y}`).value;

        if (descricaoValue.trim() === "") {
            let message = "Preencha todas as descrições antes de enviar os dados.";
            let path = '/Front-end/media/images/error-img.gif'
            prompt_function(message, path, 0)
            return;
        }

        allData.push({
            nome: document.getElementById(`input-text${y}`).value,
            tipo: document.getElementById(`select${y}`).value,
            restricao: document.getElementById(`checkbox${y}`).checked.toString(),
            descricao: descricaoValue,
            metadata: {
                id: id_metadata
            }
        });
    }

    sendData(allData);
}

function prompt_function(message, path, check) {
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

        console.log(check)
        if (check == 1) {
            location.href = '/Front-end/Pages/landing_zone/lz_visualizar_metadata.html';
        }
        
    });
    
}
async function sendData(allData) {
    try{
        console.log(allData);

        let response = await api.post("/colunas", allData);
        console.log(response);

        if(response.status === 201) {
            let message = "Campos registrados com sucesso.";
            let path = '/Front-end/media/images/success-img.gif'
            prompt_function(message, path, 1)
        }
    }catch(error){
        let message = "Alguma coisa deu errado. Tente novamente mais tarde.";
        let path = '/Front-end/media/images/error-img.gif'
        prompt_function(message, path, 0)
    }
}
