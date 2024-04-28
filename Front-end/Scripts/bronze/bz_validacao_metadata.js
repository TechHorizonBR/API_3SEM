bronzeData = "";

window.onload = () => {
    generateTable();
};

function generateTable() {
    let table = document.getElementById("body_dados");
    for (let x = 0; x < bronzeData.length; x++) {
        let dadosTable = `
        <tr>
            <td class="checkbox-container"><input type="checkbox" class="checkbox-custom" id="checkbox${x}"></td>
            <td class="val_data">${bronzeData[x].restricao == true ? "SIM" : "NAO"}</td>
            <td class="val_data">${bronzeData[x].nome}</td>
            <td class="val_data">${bronzeData[x].tipo}</td>
            <td class="val_data">${bronzeData[x].descricao}</td>
            <td class="checkbox-container"><input type="checkbox" class="checkbox-custom" id="checkbox${x}" style="pointer-events: none; cursor: not-allowed;" checked="${bronzeData[x].validado === "SIM" ? true : false}"></td>
            <td class="val_data"><textarea name="desc" id="desc${x}" class="desc_input"></textarea></td>
            <td class="btn_data"><button id="excluir"><i class="fa-solid fa-trash" style="color: #fa0000; font-size:1.5em;"></i></button></td>
        </tr>`;
        table.insertAdjacentHTML("afterbegin", dadosTable);
    }
}

// function validation() {
//     const regex = /^[a-zA-Z0-9_]*$/;
//     let errors = [];

//     for (let i = 0; i < dados.length; i++) {
//         inputsTextsValue = document.getElementById(`input-text${i}`).value;
//         if (!regex.test(inputsTextsValue)) {
//             errors.push(inputsTextsValue);
//         }
//     }

//     if (errors.length === 0) {
//         getData(dados);
//     } else {
//         newFailedPrompt(errors);
//     }
// }

async function getBronzeData() {
    try {
        const sendId = {
            id: metadata_id.id,
        };
        let response = await axios.post(
            "http://localhost:8080/colunas/metadata",
            sendId
        );
        bronzeData = response.data;
        popularTabela();
    } catch (error) {
        console.error(error);
    }
}

async function sendData(obj) {
    try {
        let response = await axios.post(
            "http://localhost:8080/colunas",
            newColuna
        );

        if (response.status === 201) {
            newSuccessPrompt();
        } else {
            alert("Um erro ocorreu no sistema, tente novamente mais tarde.");
        }
    } catch (error) {
        console.log(error);
    }
}

function newSuccessPrompt() {
    var back = `
    <div class="back_prompt" id="back_prompt">
    </div>
    `;

    var successPrompt = `
        <div class="prompt" id="prompt">
            <span class="prompt_text">Sucesso! Seu esquema foi criado.</span>
            <div class="btns">
                <button class="btn_p" id="btn_ok">OK</button>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML("beforeend", back);
    let var_back = document.getElementById("back_prompt");
    var_back.insertAdjacentHTML("beforeend", successPrompt);

    document.getElementById("btn_ok").addEventListener("click", () => {
        document.getElementById("prompt").remove();
        window.location.href = "homeUser.html";
    });
}

function newFailedPrompt(errors) {
    var back = `
    <div class="back_prompt" id="back_prompt">
    </div>
    `;

    var failedPrompt = `
        <div class="prompt" id="prompt">
            <span class="prompt_text" id="validate_identification">Valor inválido na(s) coluna(s): ${errors}</span>
            <div id="text_validation">O nome das colunas não podem conter espaços ou caracteres especiais, exceto o caractere de sublinhado (_).</div>
            <div class="btns">
                <button class="btn_p" id="btn_ok">OK</button>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML("beforeend", back);
    let var_back = document.getElementById("back_prompt");
    var_back.insertAdjacentHTML("beforeend", failedPrompt);

    document.getElementById("btn_ok").addEventListener("click", () => {
        document.getElementById("prompt").remove();
        document.getElementById("back_prompt").remove();
    });
}
