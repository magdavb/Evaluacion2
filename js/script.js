const hobbies = [];

const regionesYComunas = {

    "Arica y Parinacota": [
        "Arica",
        "Camarones",
        "Putre"
    ],

    "Tarapacá": [
        "Iquique",
        "Alto Hospicio",
        "Pozo Almonte"
    ],

    "Antofagasta": [
        "Antofagasta",
        "Calama",
        "Mejillones"
    ],

    "Atacama": [
        "Copiapó",
        "Vallenar",
        "Caldera"
    ],

    "Coquimbo": [
        "La Serena",
        "Coquimbo",
        "Ovalle"
    ],

    "Valparaíso": [
        "Valparaíso",
        "Viña del Mar",
        "Quilpué"
    ],

    "Metropolitana": [
        "Santiago",
        "Puente Alto",
        "Maipú"
    ],

    "OHiggins": [
        "Rancagua",
        "San Fernando",
        "Pichilemu"
    ],

    "Maule": [
        "Talca",
        "Curicó",
        "Linares"
    ],

    "Ñuble": [
        "Chillán",
        "San Carlos",
        "Bulnes"
    ],

    "Biobío": [
        "Concepción",
        "Los Ángeles",
        "Talcahuano"
    ],

    "La Araucanía": [
        "Temuco",
        "Villarrica",
        "Pucón"
    ],

    "Los Ríos": [
        "Valdivia",
        "La Unión",
        "Los Lagos",
        "Paillaco",
        "Panguipulli",
        "Futrono",
        "Corral"
    ],

    "Los Lagos": [
        "Puerto Montt",
        "Puerto Varas",
        "Osorno",
        "Castro"
    ],

    "Aysén": [
        "Coyhaique",
        "Puerto Aysén",
        "Chile Chico"
    ],

    "Magallanes": [
        "Punta Arenas",
        "Puerto Natales",
        "Porvenir"
    ]
};

function agregarhobby() {
    const input = document.getElementById("hobby");
    const hobby = input.value.trim();
    if (hobby != "") {
        hobbies.push(hobby);
        actualizarLista();
        input.value = "";
    }
}

function actualizarLista() {
    const lista = document.getElementById("hobby-list");
    lista.innerHTML = "";
    for (let i = 0; i < hobbies.length; i++) {
        const li = document.createElement("li");
        li.innerText = hobbies[i];
        li.className = "list-group-item";
        lista.appendChild(li);
    }
}

function cargarComunas() {
    const region = document.getElementById("region").value;
    console.log(regionesYComunas[region]);
    const selectComuna = document.getElementById("comuna");
    selectComuna.innerHTML =
        '<option value="">Seleccione una comuna</option>';
    if (region == "") {
        return;
    }
    const comunas = regionesYComunas[region];
    for (let i = 0; i < comunas.length; i++) {
        const option = document.createElement("option");
        option.value = comunas[i];
        option.innerText = comunas[i];
        selectComuna.appendChild(option);
    }
}


function limpiarMensajes() {
    const mensajes = document.getElementsByClassName("error");
    for (let i = 0; i < mensajes.length; i++) {
        mensajes[i].innerText = "";
    }
}

function validarFormulario() {
    limpiarMensajes();
    let valido = true;

    if (!validarUsername()) {
        valido = false;
    }

    if (!validarPassword()) {
        valido = false;
    }

    if (!validarConfirmacion()) {
        valido = false;
    }

    if (!validarCalle()) {
    valido = false;
    }

    if (!validarNumero()) {
        valido = false;
    }

       if (!validarRegion()) {
    valido = false;
    }

    if (!validarComuna()) {
        valido = false;
    }

    if (!validarTelefono()) {
        valido = false;
    }

    if (!validarWeb()) {
        valido = false;
    }

    if (!validarHobbies()) {
        valido = false;
    }
    return valido;
}

function validarUsername() {
    const input = document.getElementById("username");
    const div = document.getElementById("username-msg");
    const username = input.value.trim();

    if (username == "") {
        div.innerText = "El nombre de usuario es obligatorio";
        return false;
    }

    if (username.length < 5 || username.length > 10) {
        div.innerText = "Debe tener entre 5 y 10 caracteres";
        return false;
    }

    let primerCaracter = username.charAt(0);
    if (!esLetra(primerCaracter)) {
        div.innerText = "Debe comenzar con una letra";
        return false;
    }

    let numerosEncontrados = false;
    for (let i = 0; i < username.length; i++) {
        let caracter = username.charAt(i);
        if (esNumero(caracter)) {
            numerosEncontrados = true;
        } else if (esLetra(caracter)) {
            if (numerosEncontrados) {
                div.innerText = "Los números solo pueden ir al final";
                return false;
            }

        } else {
            div.innerText = "No puede contener símbolos ni acentos";
            return false;
        }
    }
    return true;
}

function validarPassword() {
    const password = document.getElementById("password").value;
    const username = document.getElementById("username").value;
    const div = document.getElementById("password-msg");

    if (password == "") {
        div.innerText = "La contraseña es obligatoria";
        return false;
    }

    if (password.length < 3 || password.length > 6) {
        div.innerText = "Debe tener entre 3 y 6 caracteres";
        return false;
    }

    let tieneLetra = false;
    let tieneNumero = false;

    for (let i = 0; i < password.length; i++) {
        let caracter = password.charAt(i);
        if (esLetra(caracter)) {
            tieneLetra = true;
        }
        if (esNumero(caracter)) {
            tieneNumero = true;
        }
    }
    if (!tieneLetra || !tieneNumero) {
        div.innerText = "Debe contener letras y números";
        return false;
    }
    if (password.includes(username) && username != "") {
        div.innerText = "No puede contener el nombre de usuario";
        return false;
    }
    return true;
}

function validarConfirmacion() {
    const password = document.getElementById("password").value;
    const confirmacion = document.getElementById("confirm-password").value;
    const div = document.getElementById("confirm-password-msg");
    if (password != confirmacion) {
        div.innerText = "Las contraseñas no coinciden";
        return false;
    }
    return true;
}

function validarCalle() {
    const calle = document.getElementById("calle").value.trim();
    const div = document.getElementById("calle-msg");
    if (calle == "") {
        div.innerText = "La calle es obligatoria";
        return false;
    }
    return true;
}

function validarNumero() {
    const numero = document.getElementById("numero").value.trim();
    const div = document.getElementById("numero-msg");
    if (numero == "") {
        div.innerText = "El número es obligatorio";
        return false;
    }
    for (let i = 0; i < numero.length; i++) {
        if (!esNumero(numero.charAt(i))) {
            div.innerText = "El número solo debe contener dígitos";
            return false;
        }
    }
    return true;
}

function validarRegion() {
    const region = document.getElementById("region").value;
    const div = document.getElementById("region-msg");
    if (region == "") {
        div.innerText = "Debe seleccionar una región";
        return false;
    }

    return true;
}

function validarComuna() {
    const comuna = document.getElementById("comuna").value;
    const div = document.getElementById("comuna-msg");
    if (comuna == "") {
        div.innerText = "Debe seleccionar una comuna";
        return false;
    }
    return true;
}

function validarTelefono() {
    const telefono = document.getElementById("telefono").value.trim();
    const div = document.getElementById("telefono-msg");

    if (telefono == "") {
        div.innerText = "El teléfono es obligatorio";
        return false;
    }

    // Permitir "+" al inicio
    let numero = telefono;

    if (telefono.startsWith("+")) {
        numero = telefono.substring(1); // quitar el +
    }

    // Validar longitud (solo números)
    if (numero.length != 11) {
        div.innerText = "Debe tener 11 dígitos";
        return false;
    }

    // Validar que el resto sean números
    for (let i = 0; i < numero.length; i++) {
        if (!esNumero(numero.charAt(i))) {
            div.innerText = "Solo debe contener números";
            return false;
        }
    }

    return true;
}

function validarWeb() {
    const web = document.getElementById("web").value.trim();
    const div = document.getElementById("web-msg");
    if (web == "") {
        return true;
    }
    if (!web.startsWith("http://") && !web.startsWith("https://")) {

        div.innerText = "La URL debe comenzar con http:// o https://";
        return false;
    }
    if (!web.includes(".")) {

        div.innerText = "La URL no es válida";
        return false;
    }
    return true;
}

function validarHobbies() {
    const div = document.getElementById("hobby-msg");
    if (hobbies.length < 2) {
        div.innerText =
            "Debe ingresar al menos 2 aficiones";
        return false;
    }
    return true;
}

function esLetra(caracter) {
    let codigo = caracter.toLowerCase().charCodeAt(0);
    return codigo >= 97 && codigo <= 122;
}

function esNumero(caracter) {
    let codigo = caracter.charCodeAt(0);
    return codigo >= 48 && codigo <= 57;
}
