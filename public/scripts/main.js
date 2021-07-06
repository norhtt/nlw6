import  Modal  from './modal.js'
const modal = Modal()


const modalTitle = document.querySelector(".modal h2")
const modalDescription = document.querySelector(".modal p")
const modalButton = document.querySelector(".modal button")
/*usado para trazer os elementos do HTML pro JS*/


const checkButtons = document.querySelectorAll(".actions a.check")  
/*usado para pegar todos os botoes check e armazenar dentro da const checkButtons*/

checkButtons.forEach(button => {
    button.addEventListener("click", handleClick)
    /*atribuido ao arquivo selecionado no caso button uma função de ao click do butão vai executar uma função
    apartir do comando eventlistener*/
})


const deleteButton = document.querySelectorAll(".actions a.delete")

deleteButton.forEach(button => {
    button.addEventListener("click", (event) => handleClick(event, false))
    /*(event) => handleClick(event, false) - necessario para se usar o (event) onde se apresenta o elemento que possui o false*/
    })

    
function handleClick (event, check = true){  /*check = true - utilizado para deixar um modo padrão para que os butões n fiquem com a mesma mensagem*/
    //usado para n fazer os links agirem
    event.preventDefault()
    const text = check ? "Marcar como lida" : "Excluir"
    const slug = check ? "check" : "delete"
    const roomId = document.querySelector("#room-id").dataset.id
    const questionId =  event.target.dataset.id

    const form = document.querySelector('.modal form')
    form.setAttribute("action", `/question/${roomId}/${questionId}/${slug}`)
    //metodo utilizado para montar a url para onde e oq esta sendo feito com o formulario


    modalTitle.innerHTML = `${text} esta pergunta`
    modalDescription.innerHTML = `Tem certeza que deseja ${text.toLowerCase()} esta pergunta?`
    modalButton.innerHTML = `Sim, ${text.toLowerCase()}`
    check ? modalButton.classList.remove("red") : modalButton.classList.add("red")
    /*usado para alterar a cor do butão dependendo do que for clicado*/ 


    modal.open()    
    /*metodo utilizado para dependendo do botao que for clicado aprentar na pagina uma mensagem diferente, isso afeta
    diretamento o HTML*/
    }
    