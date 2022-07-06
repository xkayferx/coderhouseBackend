const express = require('express')
const app = express()
require('dotenv').config()
const port = process.env.PORT
const path = require('path')
const { Server: IOServer } = require('socket.io') 

const expressServer = app.listen(port, err => {
    if(err) {
        console.lo(`Error al escuchar el puerto${port}`)
    } else{
        console.log(`Escuchando puerto ${port}`)
    }
})

const io = new IOServer(expressServer)
const { messages, writeMessage, readMessages } = require('./helpers/messages')



const products = []

app.use(express.static(path.join(__dirname, '../public')))

io.on('connection', async socket => {
console.log('Se conecto un usuario nuevo')
    
    socket.emit('server:products', products)
    socket.on('client:enterProduct', async product => {
        products.push(product)
        io.emit('server:products', products)
    })

    io.emit('serverSend:message', messages) 

    socket.on('client:message', messageInfo=>{
        messages.push(messageInfo) 
        writeMessage()
        io.emit('serverSend:message', messages)
    })
})