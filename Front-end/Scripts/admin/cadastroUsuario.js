window.onload = () => {
    getAllUsuarios() 
}


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

let botaoCadastrar = document.querySelector("#cadastrarUser")
botaoCadastrar.addEventListener("click", function(){
    montarUsuario();
})

async function montarUsuario(){
    let newNome = document.getElementById("nome").value;
    let newemail = document.getElementById("email").value;
    let newsenha = document.getElementById("senha").value;
    let newempresa = document.getElementById("empresa").value;
    let newrole = document.getElementById("role").value;
    let dataJson = {
        nome: newNome,
        email: newemail,
        //senha: newsenha,
        //empresa: newempresa,
        roleUsuario: newrole
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
        window.location.href = "cadastroUsuario.html";        
    } 
}


