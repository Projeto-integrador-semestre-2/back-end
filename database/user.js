import { connectDatabase } from './main.js'

export async function login(cpf, password) {
    try {
        const database = await connectDatabase()
        const results = await database.execute(
            'select * from users where CPF = ? and password = ?',
            [cpf, password]
        )
        return { result: results[0].length > 0, userRole: results[0][0].Cargo }
    } catch (err) {
        console.log(err)
    }
}

export async function createUser(
    CPF,
    name,
    password,
    DataNasc,
    Cargo,
    Celular,
    Peso
) {
    try {
        const database = await connectDatabase()
        const result = await database.execute(
            'INSERT INTO users (CPF, name, password, DataNasc, Cargo, Celular, Peso) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [CPF, name, password, DataNasc, Cargo, Celular, Peso]
        )
        return result
    } catch (err) {
        return err
    }
}

export async function selectAll() {
    try {
        const database = await connectDatabase()
        const results = await database.execute('Select * from users')
        return results
    } catch (err) {
        return err
    }
}
