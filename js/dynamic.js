export function crearTabla(data, extras){
    //dom globales
    let final = [];
    
    data.forEach(element => { //¿se puede automatizar mas?
        extras.editar = element.id;
        extras.eliminar = element.id;
        let obj = Object.assign(element, extras);
        final.push(obj);
    });

    //console.log(final);
    let $table = document.createElement('table'); $table.classList.add('table'); $table.classList.add('table-striped');
    let $thead = document.createElement('thead'); let $tbody = document.createElement('tbody');
    let $trh = document.createElement('tr');

    //asignaciones
    $thead.appendChild($trh);
    
    let thead = Object.keys(final[0]).map(th=>{return th.toUpperCase()});
    let extras_length = Object.keys(extras).length;

    for(let i = 0; i < thead.length ; i++){//cabecera
        let $th = document.createElement('th');
        $th.innerText = thead[i];
        $trh.appendChild($th);
    }

    final.forEach(td => {//cuerpo
        let $tr = document.createElement('tr');
        let cont = 0;
        let secure = false;

        for (const property in td) {
            if(cont >= (thead.length - extras_length)){//como esta seccion se ejecuta una unica vez, podemos hacer un objeto modelo, eliminar, editar, data-delete, data-edit y asi iterar sobre el mismo creando varios botones
                if(!secure){
                    $tr.innerHTML += `<td><button class="eliminar btn btn-sm" data-eliminar="${td[property]}">🗑️</button></td>
                                    <td><button class="editar btn btn-sm" data-editar="${td[property]}">✏️</button></td>`;
                }
                secure = true;
            }else{
                let texto = td[property];
                
                $tr.innerHTML += `<td>${texto}</td>`;

                /*if(td[property].includes('https://')){
                    $tr.innerHTML += `<td><a href="${td[property]}" target="_blank" rel="noopener">${td[property]}</a></td>`;
                }else{
                    $tr.innerHTML += `<td>${td[property]}</td>`;
                }*/
            }            
            cont++;
        }
        $tbody.appendChild($tr);
    });

    //agregando eventos (puede variar segun proposito ver si es exportable / importable, en caso de hacer fetchs que eliminen dicho registro)
    $tbody.querySelectorAll('.eliminar').forEach(e => {
        e.addEventListener('click', ()=>{
            alert(e.dataset.eliminar);
        })
    })

    $tbody.querySelectorAll('.editar').forEach(e => {
        e.addEventListener('click', ()=>{
            alert(e.dataset.editar);
        })
    })



    //asignaciones finales
    $thead.appendChild($trh);
    $table.appendChild($thead);
    $table.appendChild($tbody);
    return $table;
}