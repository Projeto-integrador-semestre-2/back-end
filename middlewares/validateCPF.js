export function validarCPF() {
    return (req, res, next) => {
        if (!req.body.CPF) return res.json({ message: 'CPF invalido!' })
        let cpf = req.body.CPF.replace(/[^\d]+/g, '')

        if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
            return res.json({ message: 'CPF invalido!' })
        }

        let soma1 = 0
        for (let i = 0; i < 9; i++) {
            soma1 += parseInt(cpf.charAt(i)) * (10 - i)
        }
        let digito1 = (soma1 * 10) % 11
        if (digito1 === 10) digito1 = 0

        let soma2 = 0
        for (let i = 0; i < 10; i++) {
            soma2 += parseInt(cpf.charAt(i)) * (11 - i)
        }
        let digito2 = (soma2 * 10) % 11
        if (digito2 === 10) digito2 = 0

        if (
            digito1 === parseInt(cpf.charAt(9)) &&
            digito2 === parseInt(cpf.charAt(10))
        )
            next()
        else return res.json({ message: 'CPF Invalido' })
    }
}
