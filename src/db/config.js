const sqlite3 = require("sqlite3")
const { open } = require("sqlite")
//usado para selicionar apenas uma funcção do arquivo selecionado no caso o opend o sqlite


module.exports = () => 
    open({
        filename: './src/db/rocketq.sqlite',    //dando o direcionametno de onde sera criado o banco de dados
        driver: sqlite3.Database,    //quem comando o banco de dados
    })
