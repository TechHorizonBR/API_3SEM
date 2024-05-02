window.onload = () => {
    getEmpresas();
    updateNameUsuario()
};

let usuario = localStorage.getItem("usuario");
let userData = JSON.parse(usuario);

let userId = userData.id;
let userName = userData.nome;

const searchButton = document.querySelector("#btn-search");

async function getEmpresas() {
    try{
        let response = await axios.get(`http://localhost:8080/usuarioEmpresa/usuario/${userId}`);
        let empresas = response.data;

        if(response.status === 200) {
            generateOptions(empresas)
        }else{
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
            <option class="option" onchange="" id="select${i}" value="${empresas[i].id}">${empresas[i].nome}</option>
        `
        select.insertAdjacentHTML("afterbegin", selectOptions);
    }
};

searchButton.addEventListener("click", function () {
    let selectValue = document.getElementById(`select-filter`).value;
    getMetadata(selectValue);
});

async function getMetadata(selectValue) {
    try{
        let response = await axios.get(`http://localhost:8080/metadatas/empresa/${selectValue}`);
        let metadatas = response.data;

        if(response.status === 200) {
            generateList(metadatas, selectValue);
        }else{
            alert("Um erro ocorreu no sistema, tente novamente mais tarde.")
    }

    }
    catch(error){
        console.error(error);
    }
};

function generateList(metadatas, selectValue) {
    let listMetadatas = document.getElementById("listMetadatas");

    listMetadatas.innerHTML = '';

    if (metadatas.length === 0){
        let metadatasList = `<h3>Não há metadatas disponíveis para essa empresa</h3>`
        listMetadatas.insertAdjacentHTML("afterbegin", metadatasList);
    }else{
        for(let x = 0; x < metadatas.length; x++){
            let metadatasList = `
                <div id="metadatas">
                    <div class="line">
                        <div class="base-name" id="name">Base: </div>
                        <div>${metadatas[x].nome}</div>
                    </div>
                    <div class="line">
                        <div class="base-name">Empresa: </div>
                        <div>${selectValue}</div>
                    </div>
                    <div class="viewMetadata">
                        <i class="fa-solid fa-eye" id="view_eye"></i>
                        <button class="cadastrarUsuario" id="view-metadata" onclick="viewMetadata(${metadatas[x].id})">VISUALIZAR</button>
                    </div>
                </div>
            `
            listMetadatas.insertAdjacentHTML("afterbegin", metadatasList);
        }
    }
}

function viewMetadata(metadata){
console.log(metadata)

localStorage.setItem("metadata", JSON.stringify(metadata));
window.location.href = "lz_resultado.html";
}

function updateNameUsuario(){
    document.getElementById("username").innerHTML = userName
}
