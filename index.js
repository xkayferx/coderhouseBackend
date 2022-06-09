const fs = require('fs');
const express = require('express');
const app = express();
const puerto = 8080;

class Contenedor {

    constructor(fileName){
        this.fileName = fileName;
        fs.promises.writeFile(`./${fileName}`,'');
    }

    async save(object) {
		let data = await fs.promises.readFile(`./${this.fileName}`, 'utf-8')
		if (!data) {
			object.id = 1
			const item = [object]
			await fs.promises.writeFile(`./${this.fileName}`, JSON.stringify(item))
			return object.id
		} else {
			data = JSON.parse(data)
			object.id = data.length + 1
			data.push(object)
			await fs.promises.writeFile(`./${this.fileName}`, JSON.stringify(data))
			return object.id
		}
	}

	async getById(id) {
		try {
			let data = await fs.promises.readFile(`./${this.fileName}`, 'utf-8')
			data = JSON.parse(data)
			data = data.find(product => product.id === id)
			data ? console.log(data) : console.log(null)
            console.log(`se ha buscado el producto con el id = ${id}`)
		} catch {
			console.log('error, no se pudieron leer los productos')
		}
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

    async deleteById(id){
        try {
			let data = await fs.promises.readFile(`./${this.fileName}`, 'utf-8')
			data = JSON.parse(data)
			data = data.filter(product => product.id != id)
			console.log(data)
            console.log(`se ha eliminado el producto con el id = ${id}`)
		} catch {
			console.log('error, no se pudieron leer los productos')
		}	
    }

    async deleteAll() { 
        try {
            await fs.promises.writeFile(`./${this.fileName}`, '')
            console.log('Todos los productos fueron eliminados.')
        } catch (error) {
            console.log(`Error: ${error}`)
        }  
    }
}

app.get('/', (req, res) => {
	res.send('<p>Hola soy ruta Home</p>')
});

app.get('/publicaciones', (req, res) => {
	res.send('Hola soy ruta Publicaciones')
});

app.listen(puerto, () => {
	console.log(`Servidor escuchando en el puerto: ${puerto}`);
})