window.onload = () => {
    getAllUsuarios();
    buscarEmpresas();
    info_usuario(usuario);
};

let usuario = JSON.parse(localStorage.getItem("usuario"));
let token = JSON.parse(localStorage.getItem("token"))

const api = axios.create({
    baseURL:`http://localhost:8080`,
    headers: {
        'Authorization': `Bearer ${token}`
    }
})

let empresas_bubble = document.getElementById("options-selected");
let perm_bubble = document.getElementById("options_perm");
let roles = [];
let all_empresas = [];
let all_empresas_id = [];
let selecao = document.getElementById("role");
let empresa_selec = document.getElementById("empresa");
let botaoCadastrar = document.querySelector("#cadastrarUser");
let botaoOk = document.querySelector("#ok");
let opcoesempresas = document.getElementById("empresa");
botaoCadastrar.addEventListener("click", function () {
    montarUsuario(roles);
});

function info_usuario(usuario) {
    namespace = document.getElementById("user_name").textContent = usuario.nome;
}

empresa_selec.addEventListener("change", () => {
    let newempresa = empresa_selec.value;
    let newid = parseInt(
        empresa_selec.options[empresa_selec.selectedIndex].getAttribute("ident")
    );
    if (newempresa !== "") {
        if (!all_empresas.includes(newempresa)) {
            all_empresas.push(newempresa);
            all_empresas_id.push(newid);
            let buttonId = `btn_${newempresa}`;
            let bubble = `
                <div class="opt_empresa">${newempresa}<button id="${buttonId}" class="opt_btn">X</button></div>
            `;
            empresas_bubble.insertAdjacentHTML("beforeend", bubble);
            let botao = document.getElementById(buttonId);
            botao.addEventListener("click", () => {
                all_empresas = all_empresas.filter(
                    (item) => item !== newempresa
                );
                all_empresas_id = all_empresas_id.filter(
                    (item) => item !== newid
                );
                let divpai = botao.parentNode;
                divpai.parentNode.removeChild(divpai);
            });
        }
    }
});

selecao.addEventListener("change", () => {
    let newrole = selecao.value;
    if (newrole !== "") {
        if (newrole === "ROLE_ADMIN") {
            roles = [];
            perm_bubble.innerHTML = "";
            selecao.disabled = true;
        }
        if (!roles.includes(newrole)) {
            roles.push(newrole);
            let buttonId = `btn_${newrole}`;
            dict = {
                "ROLE_LZ" : "Landing Zone",
                "ROLE_BRONZE" : "Bronze",
                "ROLE_SILVER" : "ROLE_SILVER",
                "ROLE_ADMIN" : "Administrador"
            }
            let nomeRole= dict[newrole];
            let bubble = `
                <div class="opt_empresa">${nomeRole}<button id="${buttonId}" class="opt_btn">X</button></div>
            `;
            perm_bubble.insertAdjacentHTML("beforeend", bubble);

            let botao = document.getElementById(buttonId);
            botao.addEventListener("click", () => {
                roles = roles.filter((item) => item !== newrole);
                selecao.disabled = false;
                let divpai = botao.parentNode;
                divpai.parentNode.removeChild(divpai);
            });
        }
    }
});

function limparCampo() {
    document.getElementById("nome").value = "";
    document.getElementById("email").value = "";
    document.getElementById("senha").value = "";
    document.getElementById("empresa").value = "";
    document.getElementById("role").value = "";
}

async function getAllUsuarios() {
    let response = await api.get("/usuarios");
    dados = response.data;
    gerarTabela(dados);
}

function limparTabela() {
    let table = document.getElementById("body_dados");
    while (table.firstChild) {
        table.removeChild(table.firstChild);
    }
}

function gerarTabela(dados) {
    limparTabela();
    let table = document.getElementById("body_dados");
    console.log(dados);
    for (let x = 0; x < dados.length; x++) {
        let dadosTable = `
        <div class="line">
            <div class= "firstPart">
                <p>Nome: ${dados[x].nome}</p>
            </div>
            <div class= "secondPart">
                <p>Email: ${dados[x].email}</p>
            </div>
            <div class="buttonUser">
                    <button class="buttonEdit" id="editar${x}" onclick="firstPrompt('${dados[x].id}', '${dados[x].nome}', '${dados[x].email}', '${dados[x].senha}', '${dados[x].roleUsuario}', '${dados[x].listEmpresa}')"><i class="fa-solid fa-eye"style="color: #0c4df0; margin-right: 10px"></i>Visualizar</button>
                    <button class="buttonRemove" id="excluir" onclick="promptDelete('${dados[x].id}')"><i class="fa-solid fa-trash" style="color: #fa0000; margin-right: 10px"></i>Excluir</button> 
                    </div>
        </div>`;
        table.insertAdjacentHTML("afterbegin", dadosTable);
    }
}

async function buscarEmpresas() {
    let response = await api.get("/empresas");
    let empresas_json = response.data;

    if (response.status == 200) {
        listarEmpresas(empresas_json);
    }
}

function listarEmpresas(empresas_json) {
    empresas_json.forEach((empresa_json) => {
        let option_empresa = document.createElement("option");
        option_empresa.setAttribute("ident", empresa_json.id);
        option_empresa.value = empresa_json.nome;
        option_empresa.textContent = empresa_json.nome;
        opcoesempresas.appendChild(option_empresa);
    });
}

function montarUsuario(roles) {
    let newNome = document.getElementById("nome").value;
    let newemail = document.getElementById("email").value;
    let newsenha = document.getElementById("senha").value;
    console.log(roles)

    if (newsenha.length < 6) {
        alert("A senha deve ter pelo menos 6 caracteres.");
    }
    else if (roles.length === 0 ) {
        alert("Insira pelo menos 1 permissão")
    }
    else{
        let dataJson = {
            nome: newNome.toUpperCase(),
            email: newemail,
            senha: newsenha,
            listEmpresa: all_empresas_id,
            roleUsuario: roles,
        };
        cadastrarUsuario(dataJson);
    }
}
async function cadastrarUsuario(dataJson) {
    try {
        let response = await api.post("/usuarios", dataJson);
        if (response.status === 201) {
            promptCadastradosucess();
        }
    } catch (err) {
        console.error(err);
    }
}

function promptCadastradosucess() {
    var back = `
    <div class="back_prompt" id="back_prompt">
    </div>
    `;

    var successPrompt = `
        <div class="prompt" id="prompt">
            <span class="prompt_text">Usuário cadastrado com Sucesso!</span>
            <div class="btns">
                <button class="btn_p" id="btn_ok">OK</button>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML("beforeend", back);
    let var_back = document.getElementById("back_prompt");
    var_back.insertAdjacentHTML("beforeend", successPrompt);

    document.getElementById("btn_ok").addEventListener("click", () => {
        getAllUsuarios();
        limparCampo();
        document.getElementById("prompt").remove();
        document.getElementById("back_prompt").remove();
    });
}
function promptDeletadosucess() {
    var back = `
    <div class="back_prompt" id="back_prompt">
    </div>
    `;

    var successPrompt = `
        <div class="prompt" id="prompt">
            <span class="prompt_text">Usuário deletado com Sucesso!</span>
            <div class="btns">
                <button class="btn_p" id="btn_ok">OK</button>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML("beforeend", back);
    let var_back = document.getElementById("back_prompt");
    var_back.insertAdjacentHTML("beforeend", successPrompt);

    document.getElementById("btn_ok").addEventListener("click", () => {
        getAllUsuarios();
        document.getElementById("prompt").remove();
        document.getElementById("back_prompt").remove();
    });
}

function promptDelete(id) {
    var back = `
    <div class="back_prompt" id="back_prompt">
    </div>
    `;

    var deletePrompt = `
        <div class="prompt1" id="prompt">
            <span class="prompt_text">Deseja realmente excluir?</span>
            <div class="btns">
                <button class="btn_p" id="btn_sim">SIM</button>
                <button class="btn_p" id="btn_nao">NÃO</button>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML("beforeend", back);
    let var_back = document.getElementById("back_prompt");
    var_back.insertAdjacentHTML("beforeend", deletePrompt);

    document.getElementById("btn_nao").addEventListener("click", () => {
        document.getElementById("back_prompt").remove();
        document.getElementById("prompt").remove();
    });

    document.getElementById("btn_sim").addEventListener("click", () => {
        excluirEmpresa(id);
        document.getElementById("back_prompt").remove();
        document.getElementById("prompt").remove();
    });
}

function firstPrompt(id, nome, email, senha, listaRole, listaEmp) {

    let empresas_json;
    async function buscarEmpresasEditar() {
        let response = await api.get("/empresas");
        empresas_json = response.data;
    
        if (response.status == 200) {
            listarEmpresasEditar(empresas_json);
        }
    }

    var back = `
        <div class="back_prompt" id="back_prompt">
        </div>
        `;

    var firstPrompt = `
        <div class="prompt" id="prompt">
        <div class="conteudoEditar">
        <div class="l0">
            <i class="fa-solid fa-xmark" id="btnfechar" ></i>
        </div>
        <div class="l1">
            <p>Nome:</p>
            <input type="text" name="nome" id="nome_edit" value=${nome} class="fields">
            <p>Email:</p>
            <input type="text" name="email" id="email_edit" value=${email} class="fields">
        </div>
        <div class="l2">
            <p>Senha:</p>
            <input type="password" name="senha" id="senha_edit" value=${senha} class="fields" disabled>
            <br>
            <p>Empresa:</p>
            <div class="all-select">
                <select name="empresa" id="empresa_edit" class="fields">
                    <option value="">Selecione...</option>
                </select>
                <div class="options-selected" id="options-selected_edit">
                </div>

            </div>

            <p>Permissões:</p>
            <div class="all-select">
                <select name="permissao" id="role_edit" class="fields">
                    <option value="">Selecione...</option>
                    <option value="ROLE_ADMIN">Administrador</option>
                    <option value="ROLE_LZ">Landing Zone</option>
                    <option value="ROLE_BRONZE">Bronze</option>
                    <option value="ROLE_SILVER">Silver</option>
                </select>
                <div class="options-selected" id="options_perm_edit">

                </div>
            </div>

        </div>
        <div class="l3s">
            <i class="fa-solid fa-floppy-disk id="plusCad" style="color: #0c4df0;"></i>
            <button class="salvar" id="btn_salvar" onclick="editPrompt">SALVAR</button>
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


    let roles_edit = [];
    let all_empresas_edit = [];
    let all_empresas_id_edit = [];
    let perm_bubble_edit = document.getElementById("options_perm_edit");
    let empresas_bubble_edit = document.getElementById("options-selected_edit");
    let empresa_selec_edit = document.getElementById("empresa_edit");
    let perm_selec_edit = document.getElementById("role_edit");

    async function addEmpresasExistentes(listaEmp){
        await buscarEmpresasEditar();
        for(let x = 0; x < listaEmp.length; x++){
            let id = listaEmp[x];
            let empresa = empresas_json.find(emp=>emp.id == id);
            if(empresa){
                all_empresas_id_edit.push(id);
                all_empresas_edit.push(empresa.nome);
                let buttonId = `btn_${empresa.nome}`;
                let bubble = `
                        <div class="opt_empresa">${empresa.nome}<button id="${buttonId}" class="opt_btn">X</button></div>
                    `;
                empresas_bubble_edit.insertAdjacentHTML("beforeend", bubble);
                let botao = document.getElementById(buttonId);
                botao.addEventListener("click", () => {
                    all_empresas_edit = all_empresas_edit.filter(
                        (item) => item !== empresa.nome
                    );
                    all_empresas_id_edit = all_empresas_id_edit.filter(
                        (item) => item !== id
                    );
                    let divpai = botao.parentNode;
                    divpai.parentNode.removeChild(divpai);
                });
            }
        }
    }

    function addRolesExistentes(listaRole){
        listaRole = listaRole.split(",");
        for(let x = 0; x < listaRole.length; x++){
            roles_edit.push(listaRole[x]);
            let buttonId = `btn_${listaRole[x]}`;
            let nomeRole= "";
            if(listaRole[x] === "ROLE_LZ"){
                nomeRole = "Landing Zone";
            }else if(listaRole[x] === "ROLE_BRONZE"){
                nomeRole = "Bronze";
            }else if(listaRole[x] === "ROLE_SILVER"){
                nomeRole = "Silver";
            }else{
                nomeRole = "Administrador";
            }
            let bubble = `
                    <div class="opt_empresa">${nomeRole}<button id="${buttonId}" class="opt_btn">X</button></div>
                `;
            perm_bubble_edit.insertAdjacentHTML("beforeend", bubble);
            let botao = document.getElementById(buttonId);
            botao.addEventListener("click", () => {
                roles_edit = roles_edit.filter(
                    (item) => item !== listaRole[x]
                );
                let divpai = botao.parentNode;
                divpai.parentNode.removeChild(divpai);
            });
        }
    }
    addEmpresasExistentes(listaEmp);
    addRolesExistentes(listaRole);
    empresa_selec_edit.addEventListener("change", () => {
        let newempresa = empresa_selec_edit.value;
        let newid = parseInt(
            empresa_selec_edit.options[
                empresa_selec_edit.selectedIndex
            ].getAttribute("ident")
        );
        if (newempresa !== "") {
            if (!all_empresas_edit.includes(newempresa)) {
                all_empresas_edit.push(newempresa);
                all_empresas_id_edit.push(newid);
                let buttonId = `btn_${newempresa}`;
                let bubble = `
                        <div class="opt_empresa">${newempresa}<button id="${buttonId}" class="opt_btn">X</button></div>
                    `;
                empresas_bubble_edit.insertAdjacentHTML("beforeend", bubble);
                let botao = document.getElementById(buttonId);
                botao.addEventListener("click", () => {
                    all_empresas_edit = all_empresas_edit.filter(
                        (item) => item !== newempresa
                    );
                    all_empresas_id_edit = all_empresas_id_edit.filter(
                        (item) => item !== newid
                    );
                    let divpai = botao.parentNode;
                    divpai.parentNode.removeChild(divpai);
                });
            }
        }
    });

    perm_selec_edit.addEventListener("change", () => {
        let newrole = perm_selec_edit.value;
        if (newrole !== "") {
            if (newrole === "ROLE_ADMIN") {
                roles_edit = [];
                perm_bubble_edit.innerHTML = "";
                perm_selec_edit.disabled = true;
            }
            if (!roles_edit.includes(newrole)) {
                roles_edit.push(newrole);
                let buttonId = `btn_${newrole}`;
                let nomeRole= "";
                if(newrole === "ROLE_LZ"){
                    nomeRole = "Landing Zone";
                }else if(newrole === "ROLE_BRONZE"){
                    nomeRole = "Bronze";
                }else if(newrole === "ROLE_SILVER"){
                    nomeRole = "Silver";
                }else{
                    nomeRole = "Administrador";
                }
                let bubble = `
                        <div class="opt_empresa">${nomeRole}<button id="${buttonId}" class="opt_btn">X</button></div>
                    `;
                perm_bubble_edit.insertAdjacentHTML("beforeend", bubble);

                let botao = document.getElementById(buttonId);
                botao.addEventListener("click", () => {
                    roles_edit = roles_edit.filter((item) => item !== newrole);
                    perm_selec_edit.disabled = false;
                    let divpai = botao.parentNode;
                    divpai.parentNode.removeChild(divpai);
                });
            }
        }
    });

    function listarEmpresasEditar(empresas_json) {
        empresas_json.forEach((empresa_json) => {
            let option_empresa = document.createElement("option");
            option_empresa.setAttribute("ident", empresa_json.id);
            option_empresa.value = empresa_json.nome;
            option_empresa.textContent = empresa_json.nome;
            empresa_selec_edit.appendChild(option_empresa);
        });
    }
    
    let salvar = document.getElementById("btn_salvar");
    salvar.addEventListener("click", ()=>{
        montarUsuarioEdit();
    })

    async function atualizarUsuario(dataJson) {
        try {
            let response = await api.put("/usuarios", dataJson);
            if (response.status === 200) {
                document.getElementById("back_prompt").remove();
                getAllUsuarios();
                editPrompt();
            }
        } catch (err) {
            console.error(err);
        }
    }

    function editPrompt() {
        var back = `
        <div class="back_prompt" id="back_prompt">
        </div>
        `;

        var editPrompt = `
            <div class="prompt1" id="prompt">
                <span class="prompt_text">Alteração feita com sucesso!</span>
                <div class="btns">
                    <button class="btn_p" id="btn_OK">OK</button>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML("beforeend", back);
        let var_back = document.getElementById("back_prompt");
        var_back.insertAdjacentHTML("beforeend", editPrompt);

        document.getElementById("btn_OK").addEventListener("click", () => {
            document.getElementById("back_prompt").remove();
            document.getElementById("prompt").remove();
        });
    }

    function montarUsuarioEdit() {
        let newNomeEdit = document.getElementById("nome_edit").value;
        let newemailEdit = document.getElementById("email_edit").value;
        let newsenhaEdit = document.getElementById("senha_edit").value;

        let dataJson = {
            id:parseInt(id),
            nome: newNomeEdit.toUpperCase(),
            email: newemailEdit,
            senha: newsenhaEdit,
            roleUsuario: roles_edit,
            listEmpresa: all_empresas_id_edit
        };
        atualizarUsuario(dataJson);
    }
}
async function excluirEmpresa(id) {
    let response = await api.delete(`/usuarios/${id}`);
    if(response.status == 204) promptDeletadosucess();
    else alert("Alguma coisa não ocorreu bem!")
}
