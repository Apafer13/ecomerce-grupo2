let ProdID = localStorage.getItem("ProdID");
PRODUCTS_COMMENTS = `https://japceibal.github.io/emercado-api/products_comments/${ProdID}.json`;
let filledStar = `<i class="fa-solid fa-star" style="color: #fff947;"></i>`
let emptyStar = `<i class="fa-regular fa-star" style="color: #000000;"></i>`

function showComments(Array) {
    let htmlContentToAppend = "";
    for (const comment of Array) {
        let starsHtml = "";
        for (let i=1; i<=5; i++) {
            if (comment.score >= i) {
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
                    <h4 class="mb-1"> ${comment.user} ${starsHtml}</h4>
                    <small class="text-muted">${comment.dateTime}</small>
                </div>
                <br>
                <p class="mb-1">${comment.description}</p>
                </div>
                </div>
     </div>`
    }
    contenedor.innerHTML = htmlContentToAppend;
}


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