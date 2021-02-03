import {crearTabla} from './dynamic.js';
import {mensaje} from './popups.js';
import {timer} from './timer.js';
document.addEventListener('DOMContentLoaded', (dom)=>{
    
    const $dinamic = document.getElementById('dinamic');
    const $result = document.getElementById('result');
    const $formError = document.getElementById('form-error');
    const extras = {
        editar:null,
        eliminar:null
    }

    //rutas
    let ruta = '';
    document.querySelectorAll('.nav-link').forEach(e=>{
        e.addEventListener('click', (path)=>{
            if(path.target.hash == '#funcionamiento'){
                ruta = 'funcionamiento.html';
            }else if(path.target.hash == '#contacto'){
                ruta = 'contacto.html';
            }else if(path.target.hash == '#informacion'){
                ruta = 'informacion.html';
            }


            renderizar('https://cristian021195.github.io/tabla-dinamica/html/'+ruta);
            //$result.innerHTML 
        })
    })

    function renderizar(ruta){
        fetch(ruta)
        .then(res => {return res.text()})
        .then(info => {$result.innerHTML = info})
        .catch(error => console.log(error))
    }

    $dinamic.addEventListener('submit', (e)=>{
        $result.innerHTML = '';
        e.preventDefault();

        let datos = new FormData($dinamic);

        if(datos.get('url') != ''){
            fetch(datos.get('url'))
            .then(data => {return data.json()})
            .then(data => {

                if(Array.isArray(data)){
                    $result.appendChild(crearTabla(data, extras));
                }else{
                    for(const arr in data){
                        if(Array.isArray(data[arr])){
                            $result.appendChild(crearTabla(data[arr], extras));
                        }
                    }
                }
                //document.getElementById('result').appendChild(crearTabla(data));//aqui en data tiene que ir un arreglo de objetos
            })
            .catch(error =>{
                console.log(error);
                $formError.appendChild(mensaje(`¡Error!, ${error}, verifica que la url sea valida, o corresponda a una API que retorne JSON`));
                timer($formError, 3000);
            })
        }else{
            $formError.appendChild(mensaje('¡Error!, debes introducir una url'));
            timer($formError, 3000);
        }
    })
})
