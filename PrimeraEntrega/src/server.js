import express from 'express'
import rutas from './routes/index.js'
import dotenv from 'dotenv'
dotenv.config()
const puerto = process.env.PUERTO
const app = express()


app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api', rutas)

app.listen(puerto, err => {
    if (err) {
        console.log(`hubo un error al inicar le servidor ${err}`)
    } else {
        console.log(`Servidor escuchando el puerto ${puerto}`)
    }

})