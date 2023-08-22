const URLS = ["https://japceibal.github.io/emercado-api/cats_products/101.json", 
"https://japceibal.github.io/emercado-api/cats_products/102.json",
"https://japceibal.github.io/emercado-api/cats_products/103.json",
"https://japceibal.github.io/emercado-api/cats_products/104.json",
"https://japceibal.github.io/emercado-api/cats_products/105.json",
"https://japceibal.github.io/emercado-api/cats_products/106.json",
"https://japceibal.github.io/emercado-api/cats_products/107.json",
"https://japceibal.github.io/emercado-api/cats_products/108.json",
"https://japceibal.github.io/emercado-api/cats_products/109.json"];

function showData(dataArray) {
    let auto = document.getElementById("cat-list-container");
    let htmlContentToAppend = "";
    let idCat = localStorage.getItem("catID")
    for(i=0; i<dataArray.length;i++){    
        if (idCat == dataArray[i].catID){
            for (const item of dataArray[i].products) {
                htmlContentToAppend += `
                
                <div class="list-group-item list-group-item-action cursor-active">
                    <div class="row">
                        <div class="col-3">
                            <img src="${item.image}" class="img-thumbnail">
                        </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${item.name}</h4>
                            <small class="text-muted">${item.soldCount} vendidos</small>
                        </div>
                        <p class="mb-1">${item.description}</p>
                        </div>
                    </div>
                </div>`
            auto.innerHTML = htmlContentToAppend;
            
        }
    }}
    if (idCat == data.catID){
    for (const item of dataArray) {
        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action cursor-active">
            <div class="row">
                <div class="col-3">
                    <img src="${item.image}" class="img-thumbnail">
                </div>
            <div class="col">
                <div class="d-flex w-100 justify-content-between">
                    <h4 class="mb-1">${item.name}</h4>
                    <small class="text-muted">${item.soldCount} vendidos</small>
                </div>
                <p class="mb-1">${item.description}</p>
                </div>
            </div>
         </div>`
        auto.innerHTML = htmlContentToAppend;
    }
}
}
const fetchPromises = URLS.map(url => fetch(url));
Promise.all(fetchPromises)
  .then(responses => Promise.all(responses.map(response => response.json())))
  .then(dataArray => {
    showData(dataArray)
  })
