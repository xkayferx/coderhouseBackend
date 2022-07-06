const fs =require('fs')
const path = require('path')

const messages = []

const writeMessage = async()=>{
    try{
        await fs.promises.writeFile(path.join(__dirname,'../data/chatmessages.txt'), JSON.stringify(messages))
    }catch(err){
        console.log('no se pudo guardar el chat', err)
    }
}

const readMessages = async()=> {
    try {
        let message = await fs.promises.readFile(path.join(__dirname,'../data/chatmessages.txt'), 'utf-8')
        message = await JSON.parse(message)
        messages.push(message)
        return message        
    } catch {
        console.log('Error no se puede leer el archivo')
    }
}

module.exports = {
    writeMessage,
    readMessages,
    messages
}