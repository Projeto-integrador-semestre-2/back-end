import express from 'express'
import { createUser, login, selectAll } from '../database/user.js'
import { objHaveNullValue } from '../middlewares/validateNotNull.js'
import { validarCPF } from '../middlewares/validateCPF.js'

export const userRoute = express.Router()

// Criação de usuário
userRoute.post(
    '/',
    objHaveNullValue([
        'CPF',
        'name',
        'password',
        'DataNasc',
        'Cargo',
        'Celular',
        'Peso',
    ]),
    validarCPF(),
    async (req, res) => {
        try {
            if (req.body.Celular.length < 11)
                return res.json({ message: 'Celular inválido' })
            const user = await createUser(
                req.body.CPF,
                req.body.name,
                req.body.password,
                req.body.DataNasc,
                req.body.Cargo,
                req.body.Celular,
                req.body.Peso
            )
            res.json(user)
        } catch (err) {
            res.json({ message: err })
        }
    }
)

// Realizar login
userRoute.post(
    '/login',
    objHaveNullValue(['cpf', 'password']),
    async (req, res) => {
        const result = await login(req.body.cpf, req.body.password)
        res.json(result)
    }
)

// listar usuários
userRoute.get('/all', async (req, res) => {
    const result = await selectAll()
    res.json(result)
})
