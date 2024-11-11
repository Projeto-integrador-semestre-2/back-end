import mysql from 'mysql2/promise'
import dotenv from 'dotenv'

dotenv.config()

export async function connectDatabase() {
    const database = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'projetointegrador',
        port: 3306,
    })
    database.connect(function (err) {
        if (err) throw err
        database.query(
            'SELECT * FROM connectiontest;',
            function (err, result, fields) {
                if (err) throw err
                console.log('Conexão estabelecida com sucesso!')
            }
        )
    })
    return database
}
