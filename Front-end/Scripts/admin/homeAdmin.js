window.onload = () => {
    opcoes_roles_metadata(roles,pagina_por_role,nome_por_role);
    getEmpresas();
    getMetadatas();
    getTiposDeDados(0, 0);
    getStatusColuna(0, 0);
    getestagioMetadatas(0);
    countEmpresas();
    countUsuarios(0);
    countMetadatas(0);
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
        console.log("CHAVE:",pagina_por_role[1])

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
        console.log(userData.roleUsuario)
        table.insertAdjacentHTML("beforeend", listar_metadata);
        }
        else if(userData.roleUsuario[i] === "ROLE_SILVER"){
            let listar_metadata = `
            <li><a href="#">Relacionamentos</a></li>
        `;
        console.log(userData.roleUsuario)
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
            alert("Um erro ocorreu no sistema, tente novamente mais tarde.")
        }
    }
    catch(error){
        console.error(error);
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
        getMetadatas(selectValue);
        getTiposDeDados(0, selectValue);
        getestagioMetadatas(selectValue);
        getStatusColuna(0, selectValue);
        countUsuarios(selectValue);
        countMetadatas(selectValue);
    });
}

async function getMetadatas(idEmpresa) {
    try{
        let response = await api.get(`/metadatas/empresa/${idEmpresa}`);
        let metadatas = response.data;

        if(response.status === 200) {
            generateOptionsMetadatas(metadatas, idEmpresa)
        }else{
            alert("Um erro ocorreu no sistema, tente novamente mais tarde.")
        }
    }
    catch(error){
        console.error(error);
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
            alert("Um erro ocorreu no sistema, tente novamente mais tarde.")
        }
    }
    catch(error){
        console.error(error);
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
            alert("Um erro ocorreu no sistema, tente novamente mais tarde.")
        }
    }
    catch(error){
        console.error(error);
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
            alert("Um erro ocorreu no sistema, tente novamente mais tarde.")
        }
    }
    catch(error){
        console.error(error);
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

async function countMetadatas(idMetadata){
    try {
        let body = [idMetadata]
        let response = await api.post(`/dash/quantityTypeData/{idMetadata}`, body)
        let numMetadatas = document.getElementById("numMetadatas")
        numMetadatas.textContent = response.data;
    }
    catch(error) {
        console.log(error)
    }
} 

async function countUsuarios(idEmpresa){
    try{
        let body = [idEmpresa]
        let response = await api.post(`/dash/quantityUsers`, body)
        let numUsuarios = document.getElementById("numUsuarios")
        numUsuarios.textContent = response.data;
    }
    catch(error) {
        console.log(error)
    }
}

async function countEmpresas(){
    try {
        let response = await api.post(`/dash/quantityEmpresas`)
        let numEmpresas = document.getElementById("numEmpresas")
        numEmpresas.textContent = response.data;
    }
    catch(error) {
        console.log(error)
    }
} 

async function listColunas(){
    try{
        let response = await api.post(`/dash/quantityColunas`, [0])
        console.log(response)
    }
    catch(error){
        console.error(error)
    }
}