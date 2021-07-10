let buscarCanciones = document.getElementById('buscarCanciones');

let buttonclose = document.getElementById('close');

if(buttonclose && buscarCanciones) {
    const cerrar = () => {
        buscarCanciones.style.display = "none";
    }

    buttonclose.onclick = cerrar;
}

if(buscarCanciones) {

    let h3 = document.getElementsByTagName('td');

    for(let i = 0; i < h3.length; i++){
        h3[i].onclick = (e) => {

            let p = document.getElementsByTagName('p');

            if(p) {
                while(p.length){
                    p[0].parentNode.removeChild(p[0]);
                }
            }

            buscarCanciones.style.display = 'flex';

            let cancionID = e.target.id;
            console.log(e.target.id);

            fetch('/playlist/cancion', {
                method: 'GET'
            }).then(response => {
                return response.json();
            }).then(playlists => {
                console.table(playlists);

                for(let j = 0; j < playlists.length; j++) {
                    let h2 = document.createElement('p');
                    h2.innerText = playlists[j].title;
                    h2.id = playlists[j]._id;

                    let playlistID = h2.id

                    buscarCanciones.appendChild(h2);

                    let data = { cancionID, playlistID };
                    h2.onclick = () => {
                        console.log(data.cancionID);
                        console.log(data.playlistID);

                        fetch('/playlist/cancion', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(data)
                        }).then(respuesta => {
                            return respuesta.json();
                        }).then(response => {
                            console.log(response);
                        })
                        alert('Cancion Aniadida');
                    }
                }
                
            })
        }
    }


    let button = document.getElementsByTagName('input');

    for(let i = 0; i < button.length; i++){
        button[i].onclick = (e) => {
            console.log(e.target.name);

            let cancionID = e.target.name;

            fetch(`/favoritas/${cancionID}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => {
                return response.json();
            }).then(respuesta => {
                console.log(respuesta);
                window.alert('Cancion Aniadida a Canciones Favoritas');
            })
        }
    }
}