export default function Modal() {
    
    const wrapper = document.querySelector('.modal-wrapper')
    const cancelButton = document.querySelector(".button.cancel")

    cancelButton.addEventListener('click', close)
    /*colocou o botão cancel dentro da const cancelButtone atribui ela a função de executar uma fução ao click
    que no caso é executar a close*/

    function open(){
        wrapper.classList.add('active')
        /*ao abrir o modal com a função da main aqui ele acrecenta uma classe active para a modal*/
    }

    function close(){
        wrapper.classList.remove('active')
        /*ação de retirar o active do modal*/
    }

    return {
        open,
        close
    }
}
