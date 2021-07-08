let enviar = document.getElementById('enviar');

if (enviar) {
    const mostrar = () => {
        console.log(document.getElementsByName('username')[0].value);
        console.log(document.getElementsByName('password')[0].value);
    }

    enviar.onclick = mostrar;
}


let guardar = document.getElementById('guardar');
let form_artista = document.getElementById('form-artista');

if (guardar && form_artista) {
    const datos = () => {
        let formulario = new FormData(form_artista);

        for (let value of formulario.values()) {
            console.log(value);
        }
    }

    guardar.onclick = datos;
}

let crearCancion = document.getElementById('crearCancion');
let espacioCanciones = document.getElementById('espacioCanciones');

if(crearCancion && espacioCanciones) {
    const agregarCancion = () => {
        let input = document.createElement('input');
        input.type = 'text';
        input.name = 'titlesong';
        input.placeholder = "Titulo de la cancion";

        espacioCanciones.appendChild(input);
    }

    crearCancion.onclick = agregarCancion;
}