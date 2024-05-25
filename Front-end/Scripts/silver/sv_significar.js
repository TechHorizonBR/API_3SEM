window.onload = () => {
    opcoes_roles_metadata(roles, pagina_por_role, nome_por_role);
    opcoes_roles_acoes(userData);
    info_usuario(userData);
    showMetadata(metadataName);
    getSilverData();
};

let roles = JSON.parse(localStorage.getItem("roles"));
let userData = JSON.parse(localStorage.getItem("usuario"));
let metadata = JSON.parse(localStorage.getItem("metadata"));

let metadataId = metadata.id;
let metadataName = metadata.nome;
let indice;
let silverData;

function opcoes_roles_acoes(userData) {
    let table = document.querySelector(".upload");
    for (let i in userData.roleUsuario) {
        if (userData.roleUsuario[i] === "ROLE_LZ") {
            var listar_metadata = `
            <li><a href="../landing_zone/lz_upload.html">Upload CSV</a></li>
        `;
            table.insertAdjacentHTML("beforeend", listar_metadata);
        } else if (userData.roleUsuario[i] === "ROLE_SILVER") {
            var listar_metadata = `
            <li><a href="#">Relacionamentos</a></li>
        `;
            table.insertAdjacentHTML("beforeend", listar_metadata);
        }
    }
}

function showMetadata(name) {
    document.getElementById("title").innerText = `Significar Metadata ${name}`;
}

let pagina_por_role = {
    0: "../admin/homeAdmin.html",
    1: "../landing_zone/homeUser.html",
    2: "../bronze/bz_visualizar_metadata.html",
    3: "../silver/",
};
let nome_por_role = {
    0: "Adminstrador",
    1: "Landing Zone",
    2: "Bronze",
    3: "Silver",
};
function info_usuario(userData) {
    namespace = document.getElementById("user_name").textContent =
        userData.nome;
}
function opcoes_roles_metadata(roles, pagina_por_role, nome_por_role) {
    let table = document.querySelector(".metadatas");

    for (let chave in roles) {
        enum_role = roles[chave];
        let rota = pagina_por_role[enum_role];
        let nome = nome_por_role[enum_role];

        if (roles[chave] == "ROLE_LZ") {
            var listar_metadata = `
            <li><a href="${pagina_por_role[1]}">${nome_por_role[1]}</a></li>
        `;
            table.insertAdjacentHTML("beforeend", listar_metadata);
        } else if (roles[chave] == "ROLE_BRONZE") {
            var listar_metadata = `
            <li><a href="${pagina_por_role[2]}">${nome_por_role[2]}</a></li>
        `;
            table.insertAdjacentHTML("beforeend", listar_metadata);
        } else if (roles[chave] == "ROLE_SILVER") {
            var listar_metadata = `
            <li><a href="${pagina_por_role[3]}">${nome_por_role[3]}</a></li>
        `;
            table.insertAdjacentHTML("beforeend", listar_metadata);
        }
    }
}

async function getSilverData() {
    try {
        let response = await axios.get(
            `http://localhost:8080/colunas/metadata/${metadataId}`
        );
        silverData = response.data;
        generateList(silverData);
    } catch (error) {
        console.error(error);
    }
}

async function sendDePara(significado, data) {
    try {
        let res = await axios.post(`http://localhost:8080/dePara`, significado);
        // viewMetadata(JSON.stringify(silverData[indice]));
        let updateSigValues = await getDePara(data.id);
        updateAllSig(updateSigValues, data);
    } catch (err) {
        console.error(err);
    }
}

async function getDePara(id) {
    try {
        let res = await axios.get(`http://localhost:8080/dePara/coluna/${id}`);
        return res.data;
    } catch (err) {
        console.error(err);
    }
}

async function deleteDePara(id, data){
    try{
        let res = await axios.delete(`http://localhost:8080/dePara/${id}`);
        let updateSigValues = await getDePara(data.id);
        updateAllSig(updateSigValues, data);
    }catch(err){
        console.error(err);
    }
}

function updateAllSig(sigValues, data) {
    let allSigElement = document.getElementById("all_sig");
    if (allSigElement) {
        allSigElement.innerHTML = generateAllSigHTML(sigValues, data);
        refreshDeleteButtons(sigValues, data);
    }
}

function generateList(metadatas) {
    let listMetadatas = document.getElementById("listMetadatas");

    listMetadatas.innerHTML = "";

    if (metadatas.length === 0) {
        let metadatasList = `<h3 id="messageMet">Não há metadatas disponíveis para essa empresa</h3>`;
        listMetadatas.insertAdjacentHTML("afterbegin", metadatasList);
    } else {
        for (let x = 0; x < metadatas.length; x++) {
            let descricao = metadatas[x].descricao;
            if (descricao.length > 20) {
                descricao = descricao.substring(0, 30) + "...";
            }
            let metadatasList = `
                <div id="metadatas">
                    <div class="line">
                        <div class="base-name" id="name">Nome: </div>
                        <div>${metadatas[x].nome}</div>
                    </div>
                    <div class="line" style="width:400px">
                        <div class="base-name">Descrição: </div>
                        <div>${descricao}</div>
                    </div>
                    <div class="viewMetadata">
                        <i class="fa-solid fa-eye" id="view_eye"></i>
                        <button class="cadastrarUsuario" id="view-metadata">VISUALIZAR</button>
                    </div>
                </div>
            `;
            listMetadatas.insertAdjacentHTML("afterbegin", metadatasList);

            document.getElementById("view-metadata").addEventListener("click",()=>{
                indice = x;
                viewMetadata(JSON.stringify(metadatas[x]));
            })
        }
    }
}

function generateAllSigHTML(sigValues, data) {

    let resultHTML = "";
    let index = 0;
    if (sigValues.length === 0) {
        resultHTML = "<h2>Esta coluna não possui De/Para</h2>"
    } else {
        for (let key in sigValues) {
            let sig = sigValues[index];
            let sinal;
            switch (sig.sinal) {
                case ">":
                    sinal = "maior que";
                    break;
                case "<":
                    sinal = "menor que";
                    break;
                case "==":
                    sinal = "igual a";
                    break;
                case "!=":
                    sinal = "diferente de";
                    break;
                case "true":
                    sinal = "verdade";
                    break;
                case "false":
                    sinal = "falso";
                    break;
                default:
                    alert("Sinal errado")
                    continue;
            }
            resultHTML += `
                <div class="res_sig" id="sig${index + 1}">
                    <div class="posicao_sig">${index + 1}º</div>
                    <div class="text_sig">Se <b>${data.nome}</b> for ${sinal} <b>${sig.valorPadrao}</b>, então <b>${sig.valorResultado}</b></div>
                    <button class="remove_sig" id="btn_remove_sig${index}">
                        <p>REMOVER</p>
                        <span class="btn_circle_remove">
                            <i class="fa-solid fa-plus" style="font-size: 1.2em; color: #fff"></i>
                        </span>
                    </button>
                </div>`;
            index++;
        }
    }
    return resultHTML;
}

function refreshDeleteButtons(sigValues, data){
    for(let y = 0; y < sigValues.length; y++){
        console.log(`Y: ${y}`);
        document.getElementById(`btn_remove_sig${y}`).addEventListener("click", async()=>{
            await deleteDePara(sigValues[y].id, data);
        })
    }
}

async function viewMetadata(data) {
    data = JSON.parse(data);
    let sigValues = await getDePara(data.id);

    var back = `
    <div class="back_prompt" id="back_prompt">
    </div>
    `;

    let tipo = "";
    if (data.tipo === "boolean") {
        tipo = "Verdadeiro/Falso";
    } else if (data.tipo === "string") {
        tipo = "Texto";
    } else if (data.tipo === "int") {
        tipo = "Número Inteiro";
    } else if (data.tipo === "float") {
        tipo = "Número Decimal";
    } else if (data.tipo === "char"){
        tipo = "Caracter Único";
    }else{
        tipo = "Data";
    }

    var popup_sig = `
    <div class="back_prompt" id="back_prompt">
                <div class="prompt" id="prompt">
                    <span class="exit_btn" id="exit_btn">X</span>
                    <span style="font-size: 25px; margin: 0 0 0 60px"
                    >Informações</span>
                    <div class="contSig">
                        <div class="l1">
                            <span class="meta_row">
                                <p>Nome Coluna:</p>
                                <p class="meta_text">${data.nome}</p>
                            </span>
                            <span class="meta_row">
                                <p>Tipo:</p>
                                <p class="meta_text">${tipo}</p>
                            </span>
                            <span class="meta_row">
                                <p>Chave:</p>
                                <p class="meta_text">${data.chavePrimaria === false ? "NÃO" : "SIM"}</p>
                            </span>
                            <span class="meta_row">
                                <p>Obrigatório:</p>
                                <p class="meta_text">${data.restricao === false ? "NÃO" : "SIM"}</p>
                            </span>
                        </div>
                        <div class="l2">
                            <p>Descricao:</p>
                            <p class="meta_text">
                                ${data.descricao}
                            </p>
                        </div>
                    </div>
                    <span style="font-size: 25px; margin: 40px 0 0 60px"
                        >Criar De/Para</span
                    >
                    <div class="create_sig">
                        Se <b>${data.nome}</b> for
                        <span class="sig_inputs">
                            <select id="sig_select">
                            ${data.tipo !== "boolean"
                            ? data.tipo === "string" || data.tipo === "char"
                                ? `<option value="==">igual a</option>
                                    <option value="!=">diferente de</option>`
                                : `<option value="<">maior que</option>
                                    <option value=">">menor que</option>
                                    <option value="==">igual a</option>
                                    <option value="!=">diferente de</option>`
                            : `
                                <option value="true">verdadeiro</option>
                                <option value="false">falso</option>`
                        }
                            </select>
                        </span>
                        ${data.tipo !== "boolean" && {
                            string: `<input class="input_sig" id="inp_sig" type="text" />`,
                            int: `<input class="input_sig" id="inp_sig" type="number" step="1" />`,
                            float: `<input class="input_sig" id="inp_sig" type="number" step="any" />`,
                            char: `<input class="input_sig" id="inp_sig" type="text" maxlength="1" />`,
                            date: `<input class="input_sig" id="inp_sig" type="date" />`
                        }[data.tipo] || ''}                     
                        ENTÃO
                        <input class="input_sig" type="text" id="inp_res" />
                        <button class="new_sig" id="btn_create_sig">
                            <p>CRIAR</p>
                            <span class="btn_circle_create">
                                <i
                                    class="fa-solid fa-plus"
                                    style="font-size: 1.2em; color: #fff"
                                ></i>
                            </span>
                        </button>
                    </div>
                    <div class="all_sig" id="all_sig">
                        ${generateAllSigHTML(sigValues, data)}
                    </div>
                </div>
            </div>
    `;

    document.body.insertAdjacentHTML("beforeend", back);
    let var_back = document.getElementById("back_prompt");
    var_back.insertAdjacentHTML("beforeend", popup_sig);

    console.log(sigValues);
    console.log(data);

    refreshDeleteButtons(sigValues, data);

    document.getElementById("btn_create_sig").addEventListener("click", async() => {
        let inp_sig;
        if (document.getElementById("inp_sig")) {
            inp_sig = document.getElementById("inp_sig").value;
        } else {
            inp_sig = "";
        }

        let significado = {
            coluna: {
                id: data.id,
            },
            sinal: document.getElementById("sig_select").value,
            valorPadrao: inp_sig,
            valorResultado: document.getElementById("inp_res").value,
        };

        if(document.getElementById("inp_sig")){
            document.getElementById("inp_sig").value = "";
        }

        if(document.getElementById("inp_res")){
            document.getElementById("inp_res").value = "";
        }

        await sendDePara(significado, data);
    });

    document.getElementById("exit_btn").addEventListener("click", () => {
        document.getElementById("prompt").remove();
        document.getElementById("back_prompt").remove();
    });
}
