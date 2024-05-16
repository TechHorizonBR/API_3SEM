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

function opcoes_roles_acoes(userData) {
    let table = document.querySelector(".upload");
    for (let i in userData.roleUsuario) {
        if (userData.roleUsuario[i] === "ROLE_LZ") {
            var listar_metadata = `
            <li><a href="../landing_zone/lz_upload.html">Upload CSV</a></li>
        `;
            console.log(userData.roleUsuario);
            table.insertAdjacentHTML("beforeend", listar_metadata);
        } else if (userData.roleUsuario[i] === "ROLE_SILVER") {
            var listar_metadata = `
            <li><a href="#">Relacionamentos</a></li>
        `;
            console.log(userData.roleUsuario);
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
        console.log("CHAVE:", pagina_por_role[1]);

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
        let silverData = response.data;
        console.log(silverData);
        // for (let coluna of bronzeData) {
        //     columnsIds.push(coluna.id);
        // }
        generateList(silverData);
    } catch (error) {
        console.error(error);
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
                        <button class="cadastrarUsuario" id="view-metadata" onclick="viewMetadata()"v>VISUALIZAR</button>
                    </div>
                </div>
            `;
            listMetadatas.insertAdjacentHTML("afterbegin", metadatasList);
        }
    }
}

function viewMetadata() {
    var back = `
    <div class="back_prompt" id="back_prompt">
    </div>
    `;

    var popup_sig = `
    <div class="back_prompt" id="back_prompt">
                <div class="prompt" id="prompt">
                    <span class="exit_btn" id="exit_btn">X</span>
                    <span style="font-size: 25px; margin: 40px 0 0 60px"
                    >Informações</span>
                    <div class="contSig">
                        <div class="l1">
                            <span class="meta_row">
                                <p>Nome Coluna:</p>
                                <p class="meta_text">TESTE</p>
                            </span>
                            <span class="meta_row">
                                <p>Tipo:</p>
                                <p class="meta_text">Texto</p>
                            </span>
                            <span class="meta_row">
                                <p>Chave:</p>
                                <p class="meta_text">SIM</p>
                            </span>
                            <span class="meta_row">
                                <p>Obrigatorio:</p>
                                <p class="meta_text">SIM</p>
                            </span>
                        </div>
                        <div class="l2">
                            <p>Descricao:</p>
                            <p class="meta_text">
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Donec fermentum semper ligula.
                            </p>
                        </div>
                    </div>
                    <span style="font-size: 25px; margin: 40px 0 10px 60px"
                        >Criar De/Para</span
                    >
                    <div class="create_sig">
                        Se <b>Teste</b> for
                        <span class="sig_inputs">
                            <select>
                                <option>verdadeiro</option>
                                <option>falso</option>
                                <option>maior que</option>
                                <option>menor que</option>
                                <option>igual a</option>
                                <option>diferente de</option>
                            </select>
                        </span>
                        <input class="input_sig" id="inp_sig" />
                        ENTÃO
                        <input class="input_sig" type="text" id="inp_res" />
                        <button class="new_sig">
                            <p>CRIAR</p>
                            <span class="btn_circle_create">
                                <i
                                    class="fa-solid fa-plus"
                                    style="font-size: 1.2em; color: #fff"
                                ></i>
                            </span>
                        </button>
                    </div>
                    <div class="all_sig">
                        <div class="res_sig" id="sig1">
                            <div class="posicao_sig">1º</div>
                            <div class="text_sig">
                                Se <b>Coluna1</b> for <b>maior que</b> <b>4</b>,
                                então <b>esta muito bom</b>
                            </div>
                            <button class="remove_sig">
                                <p>REMOVER</p>
                                <span class="btn_circle_remove">
                                    <i
                                        class="fa-solid fa-plus"
                                        style="font-size: 1.2em; color: #fff"
                                    ></i>
                                </span>
                            </button>
                        </div>
                        <div class="res_sig" id="sig2">
                            <div class="posicao_sig">2º</div>
                            <div class="text_sig">
                                Se <b>Coluna1</b> for <b>igual a</b> <b>3</b>,
                                então <b>esta aceitável</b>
                            </div>
                            <button class="remove_sig">
                                <p>REMOVER</p>
                                <span class="btn_circle_remove">
                                    <i
                                        class="fa-solid fa-plus"
                                        style="font-size: 1.2em; color: #fff"
                                    ></i>
                                </span>
                            </button>
                        </div>
                        <div class="res_sig" id="sig3">
                            <div class="posicao_sig">3º</div>
                            <div class="text_sig">
                                Se <b>Coluna1</b> for <b>menor que</b> <b>3</b>,
                                então <b>esta ruim</b>
                            </div>
                            <button class="remove_sig">
                                <p>REMOVER</p>
                                <span class="btn_circle_remove">
                                    <i
                                        class="fa-solid fa-plus"
                                        style="font-size: 1.2em; color: #fff"
                                    ></i>
                                </span>
                            </button>
                        </div>
                        <div class="res_sig" id="sig4">
                            <div class="posicao_sig">4º</div>
                            <div class="text_sig">
                                Se <b>Coluna1</b> for <b>menor que</b> <b>2</b>,
                                então <b>esta péssimo</b>
                            </div>
                            <button class="remove_sig">
                                <p>REMOVER</p>
                                <span class="btn_circle_remove">
                                    <i
                                        class="fa-solid fa-plus"
                                        style="font-size: 1.2em; color: #fff"
                                    ></i>
                                </span>
                            </button>
                        </div>
                        <div class="res_sig" id="sig5">
                            <div class="posicao_sig">5º</div>
                            <div class="text_sig">
                                Se <b>Coluna1</b> for <b>igual a</b> <b>5</b>,
                                então <b>esta maravilhoso</b>
                            </div>
                            <button class="remove_sig">
                                <p>REMOVER</p>
                                <span class="btn_circle_remove">
                                    <i
                                        class="fa-solid fa-plus"
                                        style="font-size: 1.2em; color: #fff"
                                    ></i>
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
    `;

    document.body.insertAdjacentHTML("beforeend", back);
    let var_back = document.getElementById("back_prompt");
    var_back.insertAdjacentHTML("beforeend", popup_sig);

    document.getElementById("exit_btn").addEventListener("click", () => {
        document.getElementById("prompt").remove();
        document.getElementById("back_prompt").remove();
    });
}
