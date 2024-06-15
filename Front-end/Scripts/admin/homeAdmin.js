window.onload = () => {
    opcoes_roles_metadata(roles,pagina_por_role,nome_por_role);
    getEmpresas();
    getTiposDeDados(0, 0);
    getStatusColuna(0, 0);
    getestagioMetadatas(0);
    countEmpresas();
    countUsuarios(0);

    listColunas(0);
    getQuantityMetadatas(0);
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

function opcoes_roles_metadata(roles,pagina_por_role,nome_por_role) {
    let table = document.querySelector(".metadatas");

    for (let chave in roles) {
        enum_role = roles[chave]

        if(roles[chave] == "ROLE_LZ"){
            let listar_metadata = `
            <li><a href="${pagina_por_role[1]}">${nome_por_role[1]}</a></li>
        `;
            table.insertAdjacentHTML("beforeend", listar_metadata);
        }else if(roles[chave] == "ROLE_BRONZE"){
            let listar_metadata = `
            <li><a href="${pagina_por_role[2]}">${nome_por_role[2]}</a></li>
        `;
            table.insertAdjacentHTML("beforeend", listar_metadata);
        }else if(roles[chave] == "ROLE_SILVER"){
            let listar_metadata = `
            <li><a href="${pagina_por_role[3]}">${nome_por_role[3]}</a></li>
        `;
            table.insertAdjacentHTML("beforeend", listar_metadata);
        }
    }

    opcoes_roles_acoes(userData);
    info_usuario(userData);
}

function opcoes_roles_acoes(userData){
    let table = document.querySelector(".upload");
    for (let i in userData.roleUsuario){
        if (userData.roleUsuario[i] === "ROLE_LZ"){
            let listar_metadata = `
            <li><a href="../landing_zone/lz_upload.html">Upload CSV</a></li>
        `;
        table.insertAdjacentHTML("beforeend", listar_metadata);
        }
    }
}

function info_usuario(userData){
    namespace = document.getElementById("user_name").textContent = userData.nome
}

async function getEmpresas() {
    try{
        let response = await api.get(`/empresas`);
        let empresas = response.data;
        if(response.status === 200) {
            generateOptions(empresas)
        }else{
            let message = "Alguma coisa deu errado. Tente novamente mais tarde.";
            let path = '/Front-end/media/images/error-img.gif'
            prompt_function(message, path)
        }
    }
    catch(error){
        let message = "Alguma coisa deu errado. Tente novamente mais tarde.";
        let path = '/Front-end/media/images/error-img.gif'
        prompt_function(message, path)
    }
}

function generateOptions(empresas){
    let select = document.getElementById("select-filter");

    let selectOptions = `
        <option class="option" id="all" value="0">Todos</option>
    `
    select.insertAdjacentHTML("afterbegin", selectOptions);

    for(let i = 0; i < empresas.length; i++){
        let selectOptions = `
            <option class="option" id="select${i}" value="${empresas[i].id}">${empresas[i].nome}</option>
        `

        select.insertAdjacentHTML("afterbegin", selectOptions);
    }

    select.addEventListener("change", function () {
        let selectValue = select.value;
        if(selectValue != 0){
            getMetadatas(selectValue);
        }
        getTiposDeDados(0, selectValue);
        getestagioMetadatas(selectValue);
        getStatusColuna(0, selectValue);
        countUsuarios(selectValue);
        generateTable(selectValue, 0);
        getQuantityMetadatas(selectValue);
    });
}

async function getMetadatas(idEmpresa) {
    try{
        let response = await api.get(`/metadatas/empresa/${idEmpresa}`);
        let metadatas = response.data;

        if(response.status === 200) {
            generateOptionsMetadatas(metadatas, idEmpresa)
        }else{
            let message = "Alguma coisa deu errado. Tente novamente mais tarde.";
            let path = '/Front-end/media/images/error-img.gif'
            prompt_function(message, path)
        }
    }
    catch(error){
        let message = "Alguma coisa deu errado. Tente novamente mais tarde.";
        let path = '/Front-end/media/images/error-img.gif'
        prompt_function(message, path)
    }
}

function generateOptionsMetadatas(metadatas, idEmpresa){
    let select = document.getElementById("select-filter-metadata");
    let select_ = document.getElementById("filter-metadata");

    select.innerHTML = "";
    select_.innerHTML = "";

    let selectOptions = `<option class="option" id="all" value="0">Todos</option>`;
    select.insertAdjacentHTML("afterbegin", selectOptions);
    select_.insertAdjacentHTML("afterbegin", selectOptions);

    for(let i = 0; i < metadatas.length; i++){
        let selectOptions = `
            <option class="option" id="select${i}" value="${metadatas[i].id}">${metadatas[i].nome}</option>
        `

        select.insertAdjacentHTML("afterbegin", selectOptions);
        select_.insertAdjacentHTML("afterbegin", selectOptions);
    }

    select.addEventListener("change", function () {
        let selectValue = select.value;
        getTiposDeDados(selectValue, idEmpresa);
    });
    select_.addEventListener("change", function () {
        let selectValue = select_.value;
        getStatusColuna(selectValue, idEmpresa);
    });
}

async function getestagioMetadatas(idEmpresa) {
    try{
        let body = [idEmpresa]

        let response = await api.post(`/dash/quantityByStage`, body);
        let metadatas = response.data;

        if(response.status === 200) {
            estagioMetadatas(metadatas)
        }else{
            let message = "Alguma coisa deu errado. Tente novamente mais tarde.";
            let path = '/Front-end/media/images/error-img.gif'
            prompt_function(message, path)
        }
    }
    catch(error){
        let message = "Alguma coisa deu errado. Tente novamente mais tarde.";
        let path = '/Front-end/media/images/error-img.gif'
        prompt_function(message, path)
    }
}

function estagioMetadatas(metadatas) {
    const idCanva = Chart.getChart("estagioMetadatas")

    if (idCanva) {
        idCanva.destroy();
    }

    let xValues = ["LandingZone", "Bronze", "Silver"];
    let yValues = [metadatas.LZ, metadatas.BRONZE, metadatas.SILVER];
    let barColors = ["#2b5797", "#e8c3b9", "#1e7145"];

    new Chart("estagioMetadatas", {
        type: "doughnut",
        data: {
            labels: xValues,
            datasets: [{
                backgroundColor: barColors,
                data: yValues
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'right'
                },
                title: {
                    display: false,
                    text: "STATUS DE METADATA"
                }
            }
        }
    });
}

async function getTiposDeDados(idMetadata, idEmpresa) {
    try{
        let body = [idEmpresa]

        let response = await api.post(`/dash/quantityTypeData/${idMetadata}`, body);
        let dadosEmpresa = response.data;

        if(response.status === 200) {
            tipos_de_dados(dadosEmpresa)
        }else{
            let message = "Alguma coisa deu errado. Tente novamente mais tarde.";
            let path = '/Front-end/media/images/error-img.gif'
            prompt_function(message, path)
        }
    }
    catch(error){
        let message = "Alguma coisa deu errado. Tente novamente mais tarde.";
        let path = '/Front-end/media/images/error-img.gif'
        prompt_function(message, path)
    }
}

function tipos_de_dados(dadosEmpresa) {
    const idCanva = Chart.getChart("myChart")

    if (idCanva) {
        idCanva.destroy();
    }

    let xValues = ["Float", "String", "Integer", "Boolean", "Char", "Date"];
    let yValues = [dadosEmpresa.Float, dadosEmpresa.String, dadosEmpresa.Integer, dadosEmpresa.Boolean, dadosEmpresa.Char, dadosEmpresa.Date]
    let barColors = ["#94C2FF", "#67FECB", "#8FE3FD", "#FECD00", "#A273FF", "#0299FE"];

    new Chart("myChart", {
    type: "bar",
    data: {
        labels: xValues,
        datasets: [{
        backgroundColor: barColors,
        data: yValues
        }]
    },
    options: {
        legend: {display: false},
        title: {
            display: false,
            text: "TIPOS DE DADO POR METADATA"
        }
    }
    });
}

async function getStatusColuna(idMetadata, idEmpresa) {
    try{
        let body = [
            idEmpresa
        ]

        let response = await api.post(`/dash/quantityStatus/${idMetadata}`, body);
        let metadatas = response.data;

        if(response.status === 200) {
            statusColuna(metadatas)
        }else{
            let message = "Alguma coisa deu errado. Tente novamente mais tarde.";
            let path = '/Front-end/media/images/error-img.gif'
            prompt_function(message, path)
        }
    }
    catch(error){
        let message = "Alguma coisa deu errado. Tente novamente mais tarde.";
        let path = '/Front-end/media/images/error-img.gif'
        prompt_function(message, path)
    }
}

function statusColuna(metadatas) {
    const idCanva = Chart.getChart("statusColuna")

    if (idCanva) {
        idCanva.destroy();
    }

    let xValues = ["Pendente", "Invalidado", "Validado"];
    let yValues = [metadatas.PENDENTE, metadatas.INVALIDADO, metadatas.VALIDADO];
    let barColors = ["#b91d47", "#00aba9", "#2b5797"];

    let canva = document.getElementById("statusColuna").getContext("2d")

    const myChart = new Chart(canva, {
    type: "doughnut",
    data: {
        labels: xValues,
        datasets: [{
        backgroundColor: barColors,
        data: yValues
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'right'
            },
            title: {
                display: false,
                text: "STATUS DE COLUNAS POR METADATA"
            }
        }
    }
    });
}

async function countUsuarios(idEmpresa){
    try{
        let body = [idEmpresa]
        let response = await api.post(`/dash/quantityUsers`, body)
        let numUsuarios = document.getElementById("numUsuarios")
        numUsuarios.textContent = response.data;
    }
    catch(error) {
        let message = "Alguma coisa deu errado. Tente novamente mais tarde.";
        let path = '/Front-end/media/images/error-img.gif'
        prompt_function(message, path)
    }
}

async function countEmpresas(){
    try {
        let response = await api.post(`/dash/quantityEmpresas`)
        let numEmpresas = document.getElementById("numEmpresas")
        numEmpresas.textContent = response.data;
    }
    catch(error) {
        let message = "Alguma coisa deu errado. Tente novamente mais tarde.";
        let path = '/Front-end/media/images/error-img.gif'
        prompt_function(message, path)
    }
} 

async function listColunas(idEmpresa){
    try{
        let body = [idEmpresa]
        let response = await api.post(`/dash/quantityColunas`, body)
        generateTable(response.data)
    }
    catch(error){
        let message = "Alguma coisa deu errado. Tente novamente mais tarde.";
        let path = '/Front-end/media/images/error-img.gif'
        prompt_function(message, path)
    }
}

function generateTable(valores){
    let tabela = document.getElementById("valuesTable")
    tabela.innerHTML = ''
    let chaves = Object.keys(valores);
    for (let chave of chaves){
        let celula = `
            <tr>
                <td>${chave}</td>
                <td>${valores[chave]}</td>
            </tr>
        `
        tabela.insertAdjacentHTML("afterend", celula)
    }
}

async function getQuantityMetadatas(idEmpresa){
    try{
        let body = [idEmpresa]
        let response = await api.post("/dash/quantityMetadatas", body)
        setQuantityMetadatas(response.data)

    }catch(error){
        let message = "Alguma coisa deu errado. Tente novamente mais tarde.";
        let path = '/Front-end/media/images/error-img.gif'
        prompt_function(message, path)
    }
}

function setQuantityMetadatas(value){
    let box = document.getElementById("numMetadatas")
    box.innerHTML = value;
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

