document.addEventListener("DOMContentLoaded", ()=>{
    const url = "https://japceibal.github.io/emercado-api/user_cart/25801.json"
    getJSONData(url)
    .then(result => {
        if (result.status === "ok") {
            ShowCartData(result.data.articles[0]);
            
        } else {
            console.error(result.data);
        }
   
    const paymentTypeDisplay = document.getElementById("payment-type-display");
    const selectPaymentButton = document.getElementById("select-payment-button");
    const paymentSelection = document.getElementById("payment-selection");
    const paymentModal = document.getElementById("payment-modal");
    const closeModal = document.getElementById("close-modal");
    const savePayment = document.getElementById("save-payment");
    const paymentOptions = document.getElementsByName("payment-option");
    const creditCardFields = document.getElementById("credit-card-fields");
    const bankTransferFields = document.getElementById("bank-transfer-fields");


//Muestra la ventana Modal cuando se hace click en "seleccionar"
    selectPaymentButton.addEventListener("click", () => {
        paymentModal.style.display = "block";
    });

    // Para cerrar el modal haciendo click en "X"
    closeModal.addEventListener("click", () => {
        paymentModal.style.display = "none";
    });

// Guardar la forma de pago
    savePayment.addEventListener("click", () => {
        let selectedPayment = "No ha seleccionado";
        

      paymentOptions.forEach((option) => {
            if (option.checked) {
                selectedPayment = option.value;
            }
     });
    
    paymentModal.style.display = "none";
    
 });

    paymentOptions.forEach((option) => {
        option.addEventListener("change", () => {
            if (option.value === "credit-card") {
                creditCardFields.querySelectorAll("input, select").forEach((element) => {
                    element.disabled = false;
                });
                bankTransferFields.querySelectorAll("input, select").forEach((element) => {
                    element.disabled = true;
                });
            } else if (option.value === "bank-transfer") {
                creditCardFields.querySelectorAll("input, select").forEach((element) => {
                    element.disabled = true;
                });
                bankTransferFields.querySelectorAll("input, select").forEach((element) => {
                    element.disabled = false;
                });
            }
        });
    });
   
    
});

    function confirmShipping() {
        const selectedShippingType = shippingTypeSelect.value;
        const selectedStreet = streetInput.value;
        const selectedNumber = numberInput.value;
        const selectedCorner = cornerInput.value;
    
    }
    
    function ShowCartData(data){
        let cart = document.getElementById('infoCart')
        let htmlContentToAppend = ""
        htmlContentToAppend+= `
            <table class="table" id="tableCart">
                <thead>
                    <tr>
                        <th scope="col" class="col-sm-1"></th>
                        <th scope="col" class="col-sm-1">Nombre</th>
                        <th scope="col" class="col-sm-1">Costo</th>
                        <th scope="col" class="col-sm-1">Cantidad</th>
                        <th scope="col" class="col-sm-1">Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><img class="img-fluid" src="${data.image}" alt=""></td>
                        <td class="align-middle">${data.name}</td>
                        <td class="align-middle">${data.currency} ${data.unitCost}</td>
                        <td class="align-middle"><input type="number" value="${data.count}" class="w-25 text-center"></td>
                        <td class="align-middle"><b>${data.unitCost}</b></td>
                    </tr>
                </tbody>
            </table>`;
            cart.innerHTML = htmlContentToAppend
    
            let shippingHtml = `
            <label for="shippingType">Tipo de Envío:</label>
            <select id="shippingType" name="shippingType">
              <option value="premium">Premium 2 a 5 días (15%)</option>
              <option value="express">Express 5 a 8 días (7%)</option>
              <option value="standard">Standard 12 a 15 días (5%)</option>
            </select>
         
            <label for="street">Calle:</label>
            <input type="text" id="street" name="street" required>
         
            <label for="number">Número:</label>
            <input type="text" id="number" name="number" required>
         
            <label for="corner">Esquina:</label>
            <input type="text" id="corner" name="corner">
         
            <button id="confirmButton">Confirmar Envío</button>`;
    
            cart.innerHTML += shippingHtml;
    }

});