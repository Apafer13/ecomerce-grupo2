let form = document.getElementById("form");
let email = document.getElementById("Email");
let nombre = document.getElementById("primerNombre");
let segNombre = document.getElementById("segundoNombre");
let apellido = document.getElementById("primerApellido");
let segApellido = document.getElementById("segundoApellido");
let telefono = document.getElementById("telefono");
let usuario = JSON.parse(sessionStorage.getItem("sesion"));
let datosUsuario = JSON.parse(localStorage.getItem("datosUsuario"));
let imagen = document.getElementById("imagenPerfil");
let inputImagen = document.getElementById("imagen");


document.addEventListener("DOMContentLoaded", function () {
    if (!usuario) {
        form.classList.add('d-none')
    }
    email.value = usuario.usuario

    if (datosUsuario) {
        nombre.value = datosUsuario.nombre1
        segNombre.value = datosUsuario.nombre2
        apellido.value = datosUsuario.apellido
        segApellido.value = datosUsuario.apellido2
        email.value = datosUsuario.email
        telefono.value = datosUsuario.telefono
        if (datosUsuario.imagen) {
            imagen.setAttribute("src", datosUsuario.imagen)
        }
    }

})




inputImagen.addEventListener("change", function () {
    if (inputImagen.files && inputImagen.files[0]) {
        const leer = new FileReader();

        leer.onload = function(e) {
            imagen.src = e.target.result;

            const base64 = e.target.result
            localStorage.setItem("perfil", base64);
        };

        leer.onerror = function(e) {
            console.error("Error al leer el archivo:", e.target.error);
        };

        leer.readAsDataURL(inputImagen.files[0]);
    }
});

form.addEventListener('submit', event => {
    if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
    }

    form.classList.add('was-validated')


    let perfil = localStorage.getItem("perfil");
    let datos = { nombre1: nombre.value, nombre2: segNombre.value, apellido: apellido.value, apellido2: segApellido.value, email: email.value, telefono: telefono.value, imagen: perfil }
    localStorage.setItem("datosUsuario", JSON.stringify(datos));

}, false)

