import express from 'express'
import {
    realizarCheck,
    relatorioDestaSemana,
    relatorioGeral,
    relatorio_Completo,
} from '../database/check.js'
import { objHaveNullValue } from '../middlewares/validateNotNull.js'

export const checkRoute = express.Router()

checkRoute.post('/check', objHaveNullValue(['cpf']), async (req, res) => {
    const result = await realizarCheck(req.body.cpf)
    res.json(result)
})

checkRoute.post(
    '/relatorio_semanal',
    objHaveNullValue(['cpf']),
    async (req, res) => {
        const result = await relatorioDestaSemana(req.body.cpf)
        res.json(result)
    }
)

checkRoute.post(
    '/relatorio_geral',
    objHaveNullValue(['cpf']),
    async (req, res) => {
        const result = await relatorioGeral(req.body.cpf)
        res.json(result)
    }
)

checkRoute.post(
    '/relatorio_completo',
    objHaveNullValue(['cpf']),
    async (req, res) => {
        const result = await relatorio_Completo()
        res.json(result)
    }
)
