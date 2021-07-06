const Database = require('../db/config')

module.exports = {
    async index(req,res) {
        const db = await Database()
        const roomId = req.params.room
        const questionId = req.params.question
        const action = req.params.action
        const password = req.body.password
        //usado para receber os parametros dos formularios
        
        /* Verificar se a senha está correta*/
        const  verifyRoom = await db.get(`SELECT * FROM rooms WHERE id = ${ roomId}`)
        if(verifyRoom.pass == password){
            if(action == "delete"){ 

                await db.run(`DELETE FROM questions WHERE id = ${questionId}`)
            
            }else if(action == "check"){

                await db.run(`UPDATE questions SET read = 1 WHERE id = ${questionId}`)
            }
            //serve para que as caixas de senha seja necessario para completar e executar as açoes no caso excluir e marcar como lida
            res.redirect(`/room/${roomId}`)
            //caso a senha esta correta vai ser direcionada para o room
        } else {
            res.render('passincorrect', {roomId: roomId})
            //caso a senha esteja incorreta
            //serve para renderizar o informçao contida no passincorrect.ejs
        }

    },

    async create(req, res){
        const db = await Database()
        const question = req.body.question
        const roomId = req.params.room

        await db.run(`INSERT INTO questions(
            title,
            room,
            read
        )VALUES(
            "${question}",
            ${roomId},
            0
        )`) 

        res.redirect(`/room/${roomId}`)
    }
}