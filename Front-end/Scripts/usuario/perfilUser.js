window.onload = () => {
    getAllUsuarios();
    buscarEmpresas();
    info_usuario(usuario);
};

async function dadosDoUsuario(id, nome, email, permissao, empresa, senha) {
    try {
        let data = {
            nome: nome,
            email: email,
            empresa: empresa,
            permissão: permissao,
            senha: senha,
            id: id,
        };
        let response = await axios.put(
            `http://localhost:8080/usuarios/${id}`,
            data
        );
    } catch (err) {
        console.error("ERRO:", err);
        alert("Erro no sistema.");
    }
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
            <input type="text" name="senha" id="senha_atual" class="fields">
            <p>Digite a nova senha:</p>
            <input type="text" name="novaSenha" id="senha_nova" class="fields">
            <p>Confirme a nova senha:</p>
            <input type="text" name="confSenha" id="conf_senha" class="fields">
        </div>
        <div class="l3s">
            <i class="fa-solid fa-floppy-disk" id="plusCad" style="color: #0c4df0;"></i>
            <button class="salvar" id="btn_salvar" onclick="editPrompt()">SALVAR</button>
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

    function validatePassword() {
        const senhaAtual = document.getElementById("senha_atual").value;
        const senhaNova = document.getElementById("senha_nova").value;
        const confSenha = document.getElementById("conf_senha").value;
        
        if (senhaAtual.length < 6) {
            alert("A senha atual deve ter no mínimo 5 caracteres.");
            return;
        }
        if (senhaNova.length < 6) {
            alert("A nova senha deve ter no mínimo 5 caracteres.");
            return;
        }
        if (senhaNova !== confSenha) {
            alert("A nova senha e a confirmação de senha devem ser iguais.");
            return;
        }

        alert("Senha alterada com sucesso!");
        document.getElementById("back_prompt").remove();
    }

    document.addEventListener("DOMContentLoaded", () => {
        document.getElementById("changePassword").addEventListener("click", changePassword);
    });