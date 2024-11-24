import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { userRoute } from './routes/User.js'
import { checkRoute } from './routes/Check.js'

const app = express()

app.use(cors())
app.use(express.json())
dotenv.config()

app.use('/user', userRoute)

app.use('/check', checkRoute)

app.listen(3000)
