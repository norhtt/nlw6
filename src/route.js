const express = require('express')
const QuestionController = require('./controllers/QuestionController')
const RoomController = require('./controllers/RoomController')

const route = express.Router()
/*server para guardar todas as funcionalidades de rotas do express na const route*/


route.get('/', (req, res) => res.render("index", {page: 'enter-room'}))
/*('/') server para mostrar um caminho*/
route.get('/create-pass', (req, res) => res.render("index", {page: 'create-pass'}))
//metodo utilizado para selecionar uma variavel

route.post('/create-room', RoomController.create)
route.get('/room/:room', RoomController.open)    /*serve para a resnderização desse componente ser feito pelos controllers*/
route.post('/enterroom', RoomController.enter)

route.post('/question/create/:room', QuestionController.create)
route.post('/question/:room/:question/:action', QuestionController.index) //com esse metado fica subtendido que já esta utilizando (req,res)

module.exports = route
/*server para exportar a const route*/


//route serve apra que os clicks sejam direcionados para lugares onde funçoes seram executadas