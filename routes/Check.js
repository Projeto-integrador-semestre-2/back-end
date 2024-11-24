import express from 'express'
import { realizarCheck } from '../database/check.js'
import { objHaveNullValue } from '../middlewares/validateNotNull.js'

export const checkRoute = express.Router()

checkRoute.post('/check', objHaveNullValue(['cpf']), async (req, res) => {
    const result = await realizarCheck(req.body.cpf)
    res.json(result)
})
