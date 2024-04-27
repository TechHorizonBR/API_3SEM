window.onload = () => {
    getAllUsuarios() 
}

let botaoCadastrar = document.querySelector("#cadastrarUser")
let botaoOk = document.querySelector("#ok")


botaoCadastrar.addEventListener("click", function(){
    montarUsuario();
});

botaoOk.addEventListener("click", function(){
    window.location.href = "cadastroUsuario.html"
})





async function getAllUsuarios(){
    let response = await axios.get("http://localhost:8080/usuarios");
    dados = response.data;
    console.log(response);
    gerarTabela(dados)
}

function gerarTabela(dados){
    
    let table = document.getElementById("body_dados");
    for (let x = 0; x < dados.length; x++) {
        let dadosTable = `
        <div class="line">
            <div class= "firstPart">
                <p>Nome: ${dados[x].nome}</p>
                <p>Empresa: ${dados[x].empresa}</p>
            </div>
            <div class= "secondPart">
                <p>Email: ${dados[x].email}</p>
                <p>Permissão: ${dados[x].role}</p>
            </div>
        </div>`
        table.insertAdjacentHTML("afterbegin", dadosTable);
    }
}


async function montarUsuario(){
    let newNome = document.getElementById("nome").value;
    let newemail = document.getElementById("email").value;
    let newsenha = document.getElementById("senha").value;
    let newempresa = document.getElementById("empresa").value;
    let newrole = document.getElementById("role").value;
    let dataJson = {
        nome: newNome,
        email: newemail,
        senha: newsenha,
        //empresa: newempresa,
        roleUsuario: [newrole],
    };
    console.log(dataJson)
    cadastrarUsuario(dataJson);
}
async function cadastrarUsuario(dataJson){
    try{

    }catch(err){
        console.error(err)
    }
    let response = await axios.post("http://localhost:8080/usuarios",dataJson);
    console.log(response);
    if (response.status === 201){
        promptCadastrado();        
    } 
}

function promptCadastrado(){
    var back = `
    <div class="back_prompt" id="back_prompt">
    </div>
    `

    var successPrompt = `
        <div class="prompt" id="prompt">
            <span class="prompt_text">Usuário cadastrado com Sucesso!</span>
            <div class="btns">
                <button class="btn_p" id="btn_ok">OK</button>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', back);
    let var_back = document.getElementById("back_prompt");
    var_back.insertAdjacentHTML('beforeend', successPrompt);

    document.getElementById("btn_ok").addEventListener("click", () => {
        window.location.href = "cadastroUsuario.html"
    });
}


