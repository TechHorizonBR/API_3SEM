window.onload = () => {
  opcoes_roles_metadata(roles,pagina_por_role,nome_por_role)
  opcoes_roles_acoes(userData)
  info_usuario(userData)
  getEmpresas();
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

function info_usuario(userData){
  namespace = document.getElementById("user_name").textContent = userData.nome
}

function opcoes_roles_metadata(roles,pagina_por_role,nome_por_role) {
  let table = document.querySelector(".metadatas");

  for (let chave in roles) {
      enum_role = roles[chave]
      let rota = pagina_por_role[enum_role];
      let nome = nome_por_role[enum_role];
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
}

async function getEmpresas() {
  try{
      let response = await api.get(`/usuarioEmpresa/usuario/${userData.id}`);
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

  for(let i = 0; i < empresas.length; i++){
      let selectOptions = `
          <option class="option" onchange="" id="select${i}" value="${empresas[i].id}">${empresas[i].nome}</option>
      `
      select.insertAdjacentHTML("afterbegin", selectOptions);
  }

  select.addEventListener("change", function () {
      let selectValue = select.value;
      getMetadata(selectValue, empresas);
  });
}

async function getMetadata(selectValue, empresas) {
  try{
      let response = await api.get(`/metadatas/validado/empresa/${selectValue}`);
      let metadatas = response.data;

      if(response.status === 200) {
          generateList(metadatas, empresas, selectValue);
      }else{
          alert("Um erro ocorreu no sistema, tente novamente mais tarde.")
  }

  }
  catch(error){
      console.error(error);
  }
}

function generateList(metadatas, empresas, selectValue) {
  let listMetadatas = document.getElementById("listMetadatas");

  listMetadatas.innerHTML = '';

  if (metadatas.length === 0){
      let metadatasList = `<h3 id="messageMet">Não há metadatas disponíveis para essa empresa</h3>`
      listMetadatas.insertAdjacentHTML("afterbegin", metadatasList);
  }else{
      for(let x = 0; x < metadatas.length; x++){
          let selectedEmpresa = empresas.find(emp => emp.id == selectValue);

          let metadatasList = `
              <div id="metadatas">
                  <div class="line">
                      <div class="base-name" id="name">Base: </div>
                      <div>${metadatas[x].nome}</div>
                  </div>
                  <div class="line">
                      <div class="base-name">Empresa: </div>
                      <div>${selectedEmpresa ? selectedEmpresa.nome : 'Nome da empresa não encontrado'}</div>
                  </div>
                  <div class="viewMetadata">
                      <i class="fa-solid fa-book" id="book"></i>
                      <button id="view-metadata" onclick="viewMetadata(${metadatas[x].id}, '${metadatas[x].nome}')"v>SIGNIFICAR</button>
                  </div>
              </div>
          `
          listMetadatas.insertAdjacentHTML("afterbegin", metadatasList);
      }
  }
}

function viewMetadata(metadata_id, metadata_nome) {
  localStorage.setItem("metadata", JSON.stringify({ id: metadata_id, nome: metadata_nome }));
  window.location.href = "sv_significar.html";
}
