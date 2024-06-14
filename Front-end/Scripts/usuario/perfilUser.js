window.onload = () => {
    opcoes_roles_metadata(roles,pagina_por_role,nome_por_role)
    opcoes_roles_acoes(userData)
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

let pagina_por_role = {
    0: "../admin/homeAdmin.html",
    1: "../landing_zone/lz_visualizar_metadata.html",
    2: "../bronze/bz_visualizar_metadata.html",
    3: "../silver/sv_visualizacao_metadata.html"
}

let nome_por_role = {
    0: "Adminstrador",
    1: "Landing Zone",
    2: "Bronze",
    3: "Silver",
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

let usuario = JSON.parse(localStorage.getItem("usuario"));
dadosDoUsuario(usuario.id);

async function dadosDoUsuario(id) {
    try {
        let response = await api.get(`/usuarios/buscar/${id}`);
        response = response.data
        let nome = document.getElementById('nome')
        nome.innerHTML = response.nome

        let emailElement = document.getElementById('email')
        emailElement.innerHTML = response.email

        let lista = response.roleUsuario
        let listaPermissoes = document.getElementById('listaPermissoes')
        for(i of lista){
            let nomeRole = ''
            if(i === "ROLE_LZ"){
                nomeRole = "Landing Zone";
            }else if(i === "ROLE_BRONZE"){
                nomeRole = "Bronze";
            }else if(i === "ROLE_SILVER"){
                nomeRole = "Silver";
            }else{
                nomeRole = "Administrador";
            }


            var bloco = `
                <span class="badge">${nomeRole}</span>
            `;
            listaPermissoes.insertAdjacentHTML("beforeend", bloco);
        }
        let listaEmpresas = document.getElementById('listaEmpresas')
        let listEmpresa = response.listEmpresa
        for(let idEmpresa of listEmpresa){

            let responseEmpresa = await api.get(`/empresas/${idEmpresa}`);
            responseEmpresa = responseEmpresa.data
            var bloco = `
                <span class="badge">${responseEmpresa.nome}</span>
            `;
            listaEmpresas.insertAdjacentHTML("beforeend", bloco);
        }
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



function changePassword() {
    var back = `
        <div class="back_prompt" id="back_prompt">
        </div>
        `;

    var firstPrompt = `
        <div class="promptEx" id="prompt">
            
                <div class="l0">
                    <i class="fa-solid fa-xmark" id="btnfechar"></i>
                </div>
                <div class="l1">
                    <h3>ALTERAR SENHA</h3>
                    <p>Digite a senha atual:</p>
                    <input type="password" name="senha" class="input_senha" id="senha_atual" class="fields">
                    <p>Digite a nova senha:</p>
                    <input type="password" name="novaSenha" class="input_senha" id="senha_nova" class="fields">
                    <p>Confirme a nova senha:</p>
                    <input type="password" name="confSenha" class="input_senha" id="conf_senha" class="fields">
                </div>
                <div class="l3s">
                    <button class="btn" id="btn_salvar">SALVAR</button>
                </div>
            
        </div>
        `;

    document.body.insertAdjacentHTML("beforeend", back);
    let var_back = document.getElementById("back_prompt");
    var_back.insertAdjacentHTML("beforeend", firstPrompt);

    document.getElementById("btnfechar").addEventListener("click", () => {
        document.getElementById("back_prompt").remove();
    });

    document.getElementById("btn_salvar").addEventListener("click", validatePassword);
}

function showValidationPrompt(message) {
    var validationPrompt = `
        <div class="prompt" id="validation_prompt">
            <div class="conteudoEditar">
                <div class="l0">
                    <i class="fa-solid fa-xmark" id="validation_btnfechar"></i>
                </div>
                <div class="l1">
                    <h3>VALIDAÇÃO</h3>
                    <p>${message}</p>
                </div>
                <div class="l3s">
                    <button class="btn" id="btn_ok">OK</button>
                </div>
            </div>
        </div>
    `;

    let var_back = document.getElementById("back_prompt");
    var_back.insertAdjacentHTML("beforeend", validationPrompt);

    document.getElementById("btn_ok").addEventListener("click", () => {
        document.getElementById("back_prompt").remove();
    });

    document.getElementById("validation_btnfechar").addEventListener("click", () => {
        document.getElementById("back_prompt").remove();
    });
}

function validatePassword() {
    const senhaAtual = document.getElementById("senha_atual").value;
    const senhaNova = document.getElementById("senha_nova").value;
    const confSenha = document.getElementById("conf_senha").value;

    let validationMessage = '';

    switch (true) {
        case (senhaAtual.length < 5):
            validationMessage = "A senha atual deve ter no mínimo 5 caracteres.";
            break;
        case (senhaNova.length < 6):
            validationMessage = "A nova senha deve ter no mínimo 6 caracteres.";
            break;
        case (senhaNova !== confSenha):
            validationMessage = "A nova senha e a confirmação de senha devem ser iguais.";
            break;
        default:
            let dados = {
                id: usuario.id,
                senhaAntiga: senhaAtual,
                novaSenha: senhaNova,
                novaSenhaConfirma: confSenha
            };
            postChangePassword(dados);
            return;
    }

    if (validationMessage) {
        document.getElementById("back_prompt").remove();
        let path = '/Front-end/media/images/error-img.gif'
        prompt_function(validationMessage, path)
    }
}


async function postChangePassword(dados){
	try {
        let responseSenha = await api.patch(`/usuarios`, dados);
        if (responseSenha.status === 200) {
            document.getElementById("back_prompt").remove();
            let message = "Senha alterada com sucesso.";
            let path = '/Front-end/media/images/success-img.gif'
            prompt_function(message, path)
        }
    } catch (error) {
        document.getElementById("back_prompt").remove();
        let message = "Alguma coisa deu errado. Tente novamente mais tarde.";
        let path = '/Front-end/media/images/error-img.gif'
        prompt_function(message, path)
    }

}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("changePassword").addEventListener("click", changePassword);
});
