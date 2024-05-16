window.onload = () => {
  info_usuario();
  gerar_botao_por_role();
};

function info_usuario() {
  let userData = JSON.parse(localStorage.getItem("usuario"));
  document.getElementById("user_name").textContent = userData.nome;
}

function gerar_botao_por_role() {
  let userData = JSON.parse(localStorage.getItem("usuario"));
  let table = document.querySelector("#buttons");

  userData.roleUsuario.forEach(role => {
    let buttonId, buttonText;

    switch (role) {
      case "ROLE_LZ":
        buttonId = "landingZone-btn";
        buttonText = "LandingZone";
        break;
      case "ROLE_BRONZE":
        buttonId = "bronze-btn";
        buttonText = "Bronze";
        break;
      case "ROLE_SILVER":
        buttonId = "silver-btn";
        buttonText = "Silver";
        break;
      default:
        return
    }

    let buttonHTML = `<button id="${buttonId}" class="roles_btn">${buttonText}</button>`;
    table.insertAdjacentHTML("beforeend", buttonHTML);
  });

  if (table.children.length === 0) {
    let errorMessage = `<h3 class="error-message">Não há permissões para esse usuário. Contate o administrador.</h3>`;
    table.insertAdjacentHTML("beforeend", errorMessage);
  }

  pagina_por_role();
}

function pagina_por_role() {
  let pagina_por_role = {
    0: "../admin/homeAdmin.html",
    1: "../landing_zone/homeUser.html",
    2: "../bronze/bz_visualizar_metadata.html",
    3: "../silver/sv_visualizacao_metadata.html",
  };

  document.getElementById("landingZone-btn").addEventListener("click", () => {
    window.location.href = pagina_por_role[1];
  });

  document.getElementById("bronze-btn").addEventListener("click", () => {
    window.location.href = pagina_por_role[2];
  });

  document.getElementById("silver-btn").addEventListener("click", () => {
    window.location.href = pagina_por_role[3];
  });
}
