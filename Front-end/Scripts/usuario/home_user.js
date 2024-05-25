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

  let pagina_por_role = {
    "ADMIN": "../admin/homeAdmin.html",
    "ROLE_LZ": "../landing_zone/homeUser.html",
    "ROLE_BRONZE": "../bronze/bz_visualizar_metadata.html",
    "ROLE_SILVER": "../silver/sv_visualizacao_metadata.html",
  };

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

    document.getElementById(buttonId).addEventListener("click", () => {
      window.location.href = pagina_por_role[role];
    });
  });

  if (table.children.length === "ADMIN") {
    let errorMessage = `<h3 class="error-message">Não há permissões para esse usuário. Contate o administrador.</h3>`;
    table.insertAdjacentHTML("beforeend", errorMessage);
  }
}

