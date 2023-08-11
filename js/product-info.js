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