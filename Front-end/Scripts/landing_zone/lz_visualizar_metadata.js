window.onload = () => {
    opcoes_roles_metadata(roles,pagina_por_role,nome_por_role)
    opcoes_roles_acoes(userData)
    info_usuario(userData)
    getEmpresas();
};

let roles = JSON.parse(localStorage.getItem("roles"));
let userData = JSON.parse(localStorage.getItem("usuario"));
let token = JSON.parse(localStorage.getItem("token"))

const api = axios.create({
    baseURL:`http://localhost:8080`,
    headers: {
    'Authorization': `Bearer ${token}`
    }

})

let empresasList, selectValueEmpresa

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
    }
}

function info_usuario(userData){
    namespace = document.getElementById("user_name").textContent = userData.nome
}

function opcoes_roles_metadata(roles,pagina_por_role,nome_por_role) {
    let table = document.querySelector(".metadatas");

    for (let chave in roles) {
        enum_role = roles[chave]
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

async function getEmpresas() {
    try{
        let response = await api.get(`/usuarioEmpresa/usuario/${userData.id}`);
        let empresas = response.data;

        if(response.status === 200) {
            generateOptions(empresas)
            console.log(empresas)
        }
        else{
            alert("Um erro ocorreu no sistema, tente novamente mais tarde.")
        }
    }
    catch(error){
        console.error(error);
    }
};

function generateOptions(empresas){
    let select = document.getElementById("select-filter");

    for(let i = 0; i < empresas.length; i++){
        let selectOptions = `
            <option class="option" id="select${i}" value="${empresas[i].id}">${empresas[i].nome}</option>
        `
        select.insertAdjacentHTML("afterbegin", selectOptions);
    }

    select.addEventListener("change", function () {
        let selectValue = select.value;
        getMetadata(selectValue, empresas);
    });
};

async function getMetadata(selectValue, empresas) {
    empresasList = empresas
    selectValueEmpresa = selectValue

    try{
        let response = await api.get(`/metadatas/empresa/${selectValue}`);
        let metadatas = response.data;

        if(response.status === 200) {
            generateList(metadatas, empresas, selectValue);
        }else{
            alert("Um erro ocorreu no sistema, tente novamente mais tarde.")
    }

    }
    catch(error){
        console.error(error);
    }
};

function generateList(metadatas, empresas, selectValue) {
    let listMetadatas = document.getElementById("listMetadatas");

    listMetadatas.innerHTML = '';

    if (metadatas.length === 0){
        let metadatasList = `<h3 id="messageMet">Não há metadatas disponíveis para essa empresa</h3>`
        listMetadatas.insertAdjacentHTML("afterbegin", metadatasList);
    }else{
        for(let x = 0; x < metadatas.length; x++){
            let selectedEmpresa = empresas.find(emp => emp.id == selectValue);

            let metadatasList = `
                <div id="metadatas">
                    <div class="line">
                        <div class="base-name" id="name">Base: </div>
                        <div>${metadatas[x].nome}</div>
                    </div>
                    <div class="line">
                        <div class="base-name">Empresa: </div>
                        <div>${selectedEmpresa ? selectedEmpresa.nome : 'Nome da empresa não encontrado'}</div>
                    </div>
                    <div class="viewMetadata">
                        <i class="fa-solid fa-trash" id="trash"></i>
                        <button class="cadastrarUsuario" id="trash-metadata" onclick="confirmarExclusao(${metadatas[x].id})">EXCLUIR</button>
                        <i class="fa-solid fa-eye" id="view_eye"></i>
                        <button class="cadastrarUsuario" id="view-metadata" onclick="viewMetadata(${metadatas[x].id}, '${metadatas[x].nome}')"v>VISUALIZAR</button>
                    </div>
                </div>
            `
            listMetadatas.insertAdjacentHTML("afterbegin", metadatasList);
        }
    }
}

function viewMetadata(metadata_id, metadata_nome) {
    localStorage.setItem("metadata", JSON.stringify({ id: metadata_id, nome: metadata_nome }));
    window.location.href = "lz_resultado.html";
}

function confirmarExclusao(metadata){
    var back = `
    <div class="back_prompt" id="back_prompt">
    </div>
    `

    var successPrompt = `
        <div class="prompt" id="prompt">
            <span class="prompt_text">Deseja excluir o metadata selecionado?</span>
            <div class="btns">
                <button class="btn_p" id="btn_yes">Sim</button>
                <button class="btn_p" id="btn_no">Não</button>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', back);
    let var_back = document.getElementById("back_prompt");
    var_back.insertAdjacentHTML('beforeend', successPrompt);
    let prompt = document.getElementById("prompt");

    document.getElementById("btn_yes").addEventListener("click", ()=>{
        prompt.remove();
        var_back.remove();
        excluirMetadata(metadata);
    })

    document.getElementById("btn_no").addEventListener("click", ()=>{
        prompt.remove();
        var_back.remove();;
    })
}

async function excluirMetadata(metadata) {
    try {
        let response = await api.delete(`/metadatas/${metadata}`)

        if(response.status === 204) {

            let message = "Metadata excluído com sucesso.";
            let path = '/Front-end/media/images/success-img.gif'
            prompt_function(message, path)
            getMetadata(selectValueEmpresa, empresasList);
        }else{
            let message = "Alguma coisa deu errado. Tente novamente mais tarde.";
            let path = '/Front-end/media/images/error-img.gif'
            prompt_function(message, path)
        }
    }
    catch (error) {
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