document.addEventListener("DOMContentLoaded", function() {
    let usuarioCargado = localStorage.getItem("sesion");    
    if (!usuarioCargado) {     
        Swal.fire({
            title: 'No has Iniciado Sesion',
            text: "Es mejor que inicies sesion para continuar",
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Iniciar sesion',
            cancelButtonText: 'Continuar offline'
          }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = "login.html"; 
            }
          })
    }
});
document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
});
