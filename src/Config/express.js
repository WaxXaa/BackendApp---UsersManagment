import express, { json } from 'express'
import userRouter from '../routes/user.routes.js'
const app = express()
app.use(json())
app.use('/user', userRouter)
export default app
