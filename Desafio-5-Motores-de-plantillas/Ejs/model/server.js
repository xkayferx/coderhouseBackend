const express = require('express')

const path = require('path')




class Server {
	constructor() {
		this.app = express()
		this.puerto = 8080
		this.middleware()
		this.routers()
	}

	routers() {
		this.app.set('view engine', 'pug')
		this.app.set('views', path.join(__dirname, '../views'))
		this.app.use('/', require('../app/routes/index'))
	}

	middleware() {
		this.app.use(express.json())
		this.app.use(express.urlencoded({ extended: true }))
		this.app.use(express.static('public'))
		
	}

	listen() {
		this.app.listen(this.puerto, err => {
			if (err) {
				console.log(`Se produjo un error al iniciar el servidor ${this.puerto}`)
			} else {
				console.log(`El servidor esta escuchando el puerto ${this.puerto}`)
			}
		})
	}
}

module.exports = Server