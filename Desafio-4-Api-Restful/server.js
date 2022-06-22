const express = require('express')
const app = express()
const puerto = 8080
const router = require('./app/routes/index.js')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(`${__dirname}/public`))
app.use(router)


app.listen(puerto, err => {
	if (err) {
		console.log(`Se produjo el error ${err}`)
	} else {
		console.log(`El servidor esta escuchando el puerto ${puerto}`)
	}
})