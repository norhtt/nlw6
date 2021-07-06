const Database = require("../db/config")
//necessario no processo de cadastro

module.exports = {
    async create(req,res) {
        const db = await Database()
        const pass = req.body.password  //faz com que seja possivel usado a barra de senha
        let roomId 
        let isRoom = true


        while(isRoom){ /*(while) serve para criar um loop e sempre que o isRoom fot true ele vai executar essa função*/
            /* Gera o numero da sala*/
            for(var i = 0; i < 6; i++){
            i == 0 ? roomId = Math.floor(Math.random() * 10).toString() :  //server para que o valor 0 do roomId seja conciderado na concatenação
            roomId += Math.floor(Math.random() * 10).toString()
            //Math.floor - serve para que os numeros jerados serem inteiros
            //Math.random - serve para prouzir numeros aleatorios
            // * 10 - para que os numeros gerados sejam de 0 a 9 
            //toString serve para transformar os numeros para texto para na haver a soma dos valores e sim uma concatenação 
            }
       
            /*verificar se esse numero ja existe*/
            const roomExistIds = await db.all(`SELECT id FROM rooms`)
            isRoom = roomExistIds.some(roomExistId => roomExistIds === roomId)    
            /*(some) serve para pegar o primeiro elemento que respeita o requisito e executa a função*/

            if(! isRoom){
                /* Inseri a sala no banco*/
                await db.run(`INSERT INTO rooms (
                    id,
                    pass
                ) VALUES (
                    ${parseInt(roomId)},
                    ${pass}
                )`)
            }
        }

        await db.close()
        //processo de cadastro da tabela no banco de dados

        res.redirect(`/room/${roomId}`)
    },

    async open(req,res){
        const db = await Database()
        const roomId = req.params.room
        const questions = await db.all(`SELECT * FROM questions WHERE room = ${roomId} and read = 0`)
        const questionsRead = await db.all(`SELECT * FROM questions WHERE room = ${roomId} and read = 1`)
        let isNoQuestions

        if(questions.length ==0){
            if(questionsRead.length == 0){
                isNoQuestions = true
            }
        }
        //metodo para validala apensa qando é false
        //se for verdeira vai fazer o include no isNoquestions
        res.render("room", {roomId: roomId, questions: questions, questionsRead: questionsRead, isNoQuestions: isNoQuestions})
    },
    //abrindo o open que foi pedido pelo route onde sera pego o id atraves do url pelo comando (req.params.room) e enviando para o roomId

    enter(req,res){
        const roomId = req.body.roomId

        res.redirect(`/room/${roomId}`)
    }   //serve para redirecionar para a sala qe esta sendo selecionada 
} 