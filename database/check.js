import { connectDatabase } from './main.js'
import { msToTimeObject } from '../methods/conversor.js'
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
            return true
        }
        return { message: 'Algo deu errado' }
    } catch (e) {
        console.log(e)
    }
}

export async function relatorioDestaSemana(cpf) {
    try {
        const database = await connectDatabase()
        const user = await database.execute(
            'select * from users where CPF = ?',
            [cpf]
        )
        if (user[0].length == 0) {
            return { message: 'Usuário não encontrado!' }
        } else {
            let checks = await database.execute(
                'select * from checks where user_id = ? AND checked = TRUE AND check_in >= CURDATE() - INTERVAL (DAYOFWEEK(CURDATE()) - 1) DAY',
                [user[0][0].id]
            )
            if (checks[0].length == 0)
                return { message: 'Usuário sem nenhum registro!' }
            else {
                let soma = 0
                for (let i = 0; i < checks[0].length; i++) {
                    const checkIn = new Date(checks[0][i].check_in)
                    const checkOut = new Date(checks[0][i].check_out)
                    soma += checkOut.getTime() - checkIn.getTime()
                }
                return msToTimeObject(soma)
            }
        }
    } catch (e) {
        console.log(e)
    }
}

export async function relatorioGeral(cpf) {
    try {
        const database = await connectDatabase()
        const user = await database.execute(
            'select * from users where CPF = ?',
            [cpf]
        )
        if (user[0].length == 0) {
            return { message: 'Usuário não encontrado!' }
        } else {
            let checks = await database.execute(
                `SELECT              
    SUM(
        IF(
            check_in IS NOT NULL AND check_out IS NOT NULL, 
            TIMESTAMPDIFF(SECOND, check_in, check_out) * 1000, 
            0
        )
    ) AS total_milliseconds
FROM 
    checks
WHERE 
    check_out IS NOT NULL AND user_id = ?                     
GROUP BY 
    YEAR(check_in), WEEK(check_in, 1)
ORDER BY 
    YEAR(check_in), WEEK(check_in, 1);

`,
                [user[0][0].id]
            )
            return msToTimeObject(checks[0][0]['total_milliseconds'])
        }
    } catch (e) {
        console.log(e)
    }
}
