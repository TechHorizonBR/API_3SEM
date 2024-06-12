window.onload = () => {
    opcoes_roles_metadata(roles,pagina_por_role,nome_por_role);
    getEmpresas();
    getMetadatas();
    getTiposDeDados(0);
    getStatusColuna(0);
    getStatusMetadata(0);
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

    opcoes_roles_acoes(userData);
    info_usuario(userData);
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
        else if(userData.roleUsuario[i] === "ROLE_SILVER"){
            var listar_metadata = `
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
        getMetadatas(selectValue)
    });
}

async function getMetadatas(idEmpresa) {
    try{
        let response = await api.get(`/metadatas/empresa/${idEmpresa}`);
        let metadatas = response.data;

        if(response.status === 200) {
            generateOptionsMetadatas(metadatas)
        }else{
            alert("Um erro ocorreu no sistema, tente novamente mais tarde.")
        }
    }
    catch(error){
        console.error(error);
    }
}

function generateOptionsMetadatas(metadatas){
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
        getTiposDeDados(selectValue);
    });
    select_.addEventListener("change", function () {
        let selectValue = select_.value;
        getStatusColuna(selectValue);
    });
}

async function getStatusMetadata(idEmpresa) {
    try{
        let body = [idEmpresa]

        let response = await api.get(`/dash/quantityByStage}`, body);
        let metadatas = response.data;

        if(response.status === 200) {
            console.log(metadatas)
            statusColuna(metadatas)
        }else{
            alert("Um erro ocorreu no sistema, tente novamente mais tarde.")
        }
    }
    catch(error){
        console.error(error);
    }
}

function statusMetadata(metadatas) {
    var xValues = ["Pendente", "Invalidado", "Validado"];
    var yValues = metadatas;
    var barColors = ["#2b5797", "#e8c3b9", "#1e7145"];

    new Chart("statusMetadata", {
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

async function getTiposDeDados(idEmpresa) {
    try{
        let body = [idEmpresa]

        let response = await api.get(`/metadatas/empresa/${idEmpresa}`, body);
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
    let xValues = ["Float", "String", "Integer", "Boolean", "Char", "Date"];
    let yValues = dadosEmpresa;
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

async function getStatusColuna(idEmpresa) {
    try{
        let response = await api.get(`/metadatas/empresa/${idEmpresa}`);
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

function statusColuna() {
    var xValues = ["Pendente", "Invalidado", "Validado"];
    var yValues = [25, 35, 40];
    var barColors = ["#b91d47", "#00aba9", "#2b5797"];

    new Chart("statusColuna", {
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
