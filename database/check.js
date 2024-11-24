import { connectDatabase } from './main.js'

export async function realizarCheck(cpf) {
    try {
        const database = await connectDatabase()
        const actualDate = new Date()
        const user = await database.execute(
            'select * from users where CPF = ?',
            [cpf]
        )
        if (user[0].length == 0) {
            return { message: 'Usuário não encontrado!' }
        } else {
            let checks = await database.execute(
                'select * from checks where user_id = ? AND checked = FALSE',
                [user[0][0].id]
            )
            if (checks[0].length == 0) {
                checks = await database.execute(
                    'INSERT INTO checks (user_id, check_in) VALUES  (?, ?)',
                    [user[0][0].id, actualDate]
                )
            } else {
                checks = await database.execute(
                    'UPDATE checks SET check_out = ?, checked = TRUE WHERE id = ?',
                    [actualDate, checks[0][0].id]
                )
            }
            return checks
        }
        return { message: 'Algo deu errado' }
    } catch (e) {
        console.log(e)
    }
}
