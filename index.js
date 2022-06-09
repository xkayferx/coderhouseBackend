const fs = require('fs');
const express = require('express');
const app = express();
const puerto = 8080;

class Contenedor {

    constructor(fileName){
        this.fileName = fileName;
        fs.promises.writeFile(`./${fileName}`,'');
    }

    async getAll() {
        try{
            let data = await fs.promises.readFile(`./${this.fileName}`, 'utf-8')
            data = JSON.parse(data)
            console.log(data)
        }
        catch{
            console.log('Error no se puede leer el archivo')
        }
    }
	
	async getRandom() {
		try {
			let data = await fs.promises.readFile(`./${this.fileName}`, 'utf-8')
			data = JSON.parse(data)
			const randomP = data[Math.floor(Math.random() * data.length)]
			return randomP
		} catch {
			console.log('Error no se puede leer el archivo')
		}
	}
}

const productos = new Contenedor('productos.txt')

const productList = async (req, res) => {
	const respuesta = await productos.getAll()
	res.send(respuesta)
}

const randomProduct = async (req, res) => {
	const respuesta = await productos.getRandom()
	res.send(respuesta)
}

app.get('/productos', productList)
app.get('/productoRandom', randomProduct)

app.listen(puerto, () => {
	console.log(`Servidor escuchando en el puerto: ${puerto}`);
})