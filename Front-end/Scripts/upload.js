async function sendCSV(file){
    try{
        const formData = new FormData();
        formData.append('file',file);
        formData.append('header', true);
        const res = await axios.post("http://localhost:8080/api/upload",formData,{
            headers:{
                "Content-Type":"multipart/form-data"
            }
        });

        console.log(res.data);
    }catch(err){
        console.error(err);
    }
}

let arquivo = document.getElementById("arquivo");
arquivo.onchange = () =>{
    const arquivoSelec = arquivo.files[0];
    console.log(arquivoSelec);
    sendCSV(arquivoSelec);
}