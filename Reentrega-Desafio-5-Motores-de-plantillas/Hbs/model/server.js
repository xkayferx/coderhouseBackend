const express = require('express')
const { engine } = require('express-handlebars')
const path = require('path')

class Server {
	constructor() {
		this.app = express()
		this.puerto = 8080
		this.middleware()
		this.routers()
	}

	routers() {
		this.app.engine('hbs', engine({
			extname: '.hbs',
			defaultLayout: path.join(__dirname, '../views/layouts/main.hbs'),
			layoutsDir: path.join(__dirname, '../views/layouts'),
			partialsDir: path.join(__dirname, '../views/partials')
			
		}))
		this.app.set('views', path.join(__dirname, '../views'))
		this.app.set('views engine', )
		this.app.use('/', require('../app/routes/productos'))
	}

	middleware() {
		this.app.use(express.json())
		this.app.use(express.urlencoded({ extended: true }))
		this.app.use(express.static('public'))
		this.app.set('view engine', 'hbs')
	}

	listen() {
		this.app.listen(this.puerto, err => {
			if (err) {
				console.log(`Se produjo el error${err}`)
			} else {
				console.log(`El servidor esta escuchando el puerto ${this.puerto}`)
			}
		})
	}
}

module.exports = Server