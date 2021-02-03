export function mensaje(texto){
    let $div = document.createElement('div'); $div.classList.add('alert'); $div.classList.add('alert-danger');
    $div.textContent=texto;
    return $div;
}