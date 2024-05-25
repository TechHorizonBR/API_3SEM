window.onload = () => {
    //getAllUsuarios();
    //buscarEmpresas();
    //info_usuario(usuario);
    
};

let usuario = JSON.parse(localStorage.getItem("usuario"));
dadosDoUsuario(usuario.id);
console.log(usuario.id)
async function dadosDoUsuario(id) {
    try {
        let response = await axios.get(
            `http://localhost:8080/usuarios/buscar/${id}`
        );
        response = response.data
        let nome = document.getElementById('nome')
        nome.innerHTML = response.nome

        let emailElement = document.getElementById('email')
        emailElement.innerHTML = response.email

        let lista = response.roleUsuario
        let listaPermissoes = document.getElementById('listaPermissoes')
        for(i of lista){
            var bloco = `
                <li>${i}</li>
            `
            listaPermissoes.insertAdjacentHTML("beforeend", bloco);
        }
        let listaEmpresas = document.getElementById('listaEmpresas')
        let listEpresa = response.listEmpresa
        for(let idEmpresa of listEpresa){
            
            let responseEmpresa = await axios.get(
                `http://localhost:8080/empresas/${idEmpresa}`
            );
            responseEmpresa = responseEmpresa.data
            var bloco = `   
                <li>${responseEmpresa.nome}</li>
            `
            listaEmpresas.insertAdjacentHTML("beforeend", bloco);
        }
    } catch (err) {
        console.error("ERRO:", err);
        alert("Erro no sistema.");
    }
}

async function getEmpresaById(id){        
    let responseEmpresa = await axios.get(
        `http://localhost:8080/empresas/${id}`
    );
    return responseEmpresa;
}


function changePassword() {
    var back = `
        <div class="back_prompt" id="back_prompt">
        </div>
        `;

    var firstPrompt = `
        <div class="prompt" id="prompt">
        <div class="conteudoEditar">
        <div class="l0">
            <i class="fa-solid fa-xmark" id="btnfechar"></i>
        </div>      
        <div class="l1">
            <h3>ALTERAR SENHA</h3>
            <p>Digite a senha atual:</p>
            <input type="password" name="senha" id="senha_atual" class="fields">
            <p>Digite a nova senha:</p>
            <input type="password" name="novaSenha" id="senha_nova" class="fields">
            <p>Confirme a nova senha:</p>
            <input type="password" name="confSenha" id="conf_senha" class="fields">
        </div>
        <div class="l3s">
            <button class="salvar" id="btn_salvar">SALVAR</button>
        </div>
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
            <button class="ok" id="btn_ok">OK</button>
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

async function validatePassword() {
    const senhaAtual = document.getElementById("senha_atual").value;
    const senhaNova = document.getElementById("senha_nova").value;
    const confSenha = document.getElementById("conf_senha").value;

    if (senhaAtual.length < 5) {
        document.getElementById("prompt").remove();
        showValidationPrompt("A senha atual deve ter no mínimo 5 caracteres.");
        return;
    }
    if (senhaNova.length < 6) {
        document.getElementById("prompt").remove();
        showValidationPrompt("A nova senha deve ter no mínimo 6 caracteres.");
        return;
    }
    if (senhaNova !== confSenha) {
        document.getElementById("prompt").remove();
        showValidationPrompt("A nova senha e a confirmação de senha devem ser iguais.");
        return;
    }

    let dados = {
        id: usuario.id,
        senhaAntiga: senhaAtual,
        novaSenha: senhaNova,
        novaSenhaConfirma: confSenha
    }

	postChangePassword(dados);

}

async function postChangePassword(dados){
	try {
        let responseSenha = await axios.patch(`http://localhost:8080/usuarios`, dados);
        if (responseSenha.status === 200) {
            document.getElementById("prompt").remove();
            showValidationPrompt("Senha alterada com sucesso!");
        }
    } catch (error) {
        document.getElementById("prompt").remove();
        showValidationPrompt("Erro ao alterar a senha. Tente novamente.");
    }

}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("changePassword").addEventListener("click", changePassword);
});