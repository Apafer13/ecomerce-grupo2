let ProdID = localStorage.getItem("ProdID");
PRODUCTS_COMMENTS = `https://japceibal.github.io/emercado-api/products_comments/${ProdID}.json`;
let filledStar = `<i class="fas fa-star" style="color: #fff947;"></i>`
let emptyStar = `<i class="far fa-star" style="color: #000000;"></i>`
function hora(){

    const fechaHoraActual = new Date();

    const año = fechaHoraActual.getFullYear();
    const mes = String(fechaHoraActual.getMonth() + 1).padStart(2, '0');
    const dia = String(fechaHoraActual.getDate()).padStart(2, '0');
    const horas = String(fechaHoraActual.getHours()).padStart(2, '0');
    const minutos = String(fechaHoraActual.getMinutes()).padStart(2, '0');
    const segundos = String(fechaHoraActual.getSeconds()).padStart(2, '0');

    return fechaHoraFormateada = `${año}-${mes}-${dia} ${horas}:${minutos}:${segundos}`;
}
function addData(info){
    let htmlContentToAppend = "";
    let starsHtml = "";
    for (let i=1; i<=5; i++) {
        if (info.score >= i) {
            starsHtml += filledStar;
        } else {
            starsHtml += emptyStar;
        }
    }
    htmlContentToAppend += `
    <div class="list-group-item list-group-item-action cursor-active">
    <div class="row">
        <div class="col">
            <div class="d-flex w-100 justify-content-between">
                <h4 class="mb-1"> ${info.user} ${starsHtml}</h4>
                <small class="text-muted">${info.dateTime}</small>
            </div>
            <br>
            <p class="mb-1">${info.description}</p>
            </div>
            </div>
 </div>`
 contenedor.innerHTML += htmlContentToAppend;
}
function showComments(Array) {
    for (const comment of Array) {
        addData(comment)
    }
  
}
let btnSend = document.getElementById("btnSend");
btnSend.addEventListener("click", function(){
    let comment = document.getElementById("comment")
    let score = document.getElementById("rating")
    let user = JSON.parse(sessionStorage.getItem("sesion"));
    let now = hora();
    let info = {user: user.usuario, score: score.value, dateTime: now, description: comment.value}
    addData(info)
    comment.value = ""
    score.value = 1
   
})




document.addEventListener("DOMContentLoaded", function () {
    getJSONData(PRODUCTS_COMMENTS)
        .then(result => {
            if (result.status === "ok") {
                arreglo = result.data;
                showComments(arreglo);
            } else {
                console.error(result.data);
            }
        });
})