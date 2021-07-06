const express = require('express')
const route = require('./route')
const path = require('path')

const server = express() 
/*usado para abrir o express e gurar dentreo da const server*/


server.set('view engine', 'ejs')
/*definindo ejs como a view engine do servidor*/


server.use(express.static('public'))
/*atribuido a pagina public a função de express static*/


server.set('views', path.join(__dirname, 'views'))
/*server para atulizar o caminho da pasta selecionada, no caso pegando a variavel global __dirname que agora é src juntando com views apartir do path.join*/
/*agora a pasta atualizada é views/src/views*/


server.use(express.urlencoded({extended: true}))
//metado de intermedio usado para pegar o formulario decodificar e passar para o controle

server.use(route)
/*server para usar o que foi selecionado*/


server.listen(4000, () => console.log('RODANDO'))
/*usado para abrir uma porta e rodar um servidor no caso a porta 3000*/
/*funçar serve para mostrar para o servidor que queremos rodar algo*/           