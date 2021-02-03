export function timer(elem, time){
    setTimeout(() => {
        elem.innerHTML = '';    
    }, time);    
}