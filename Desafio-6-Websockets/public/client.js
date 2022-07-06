const socket = io()

const inpTitle = document.querySelector('#title')
const inpPrice = document.querySelector('#price')
const inpThumbnail = document.querySelector('#thumbnail')
const userMail = document.querySelector('#userMail')
const userMessage = document.querySelector('#userMessage')
const btnSend = document.querySelector('#btnSend')
const noProducts = document.querySelector('#noProducts')
const btnSendChat = document.querySelector('#btnSendChat')

const tiempoTranscurrido = Date.now()
const hoy = new Date(tiempoTranscurrido)
const fecha= hoy.toLocaleDateString()
const tiempo = new Date()
const argHora=tiempo.toLocaleTimeString('it-IT')

const sendProduct = async() => {
        try{
                socket.emit('client:enterProduct', { title: inpTitle.value, price: inpPrice.value, thumbnail: inpThumbnail.value }) 
                console.log('Se envió el producto')
        }catch(error){
                console.log(`Se produjo el error: ${error}`)
        }
}

btnSend.addEventListener('click', (event) => {
        event.preventDefault()  
        sendProduct()
        inpTitle.value = ''
        inpPrice.value = ''
        inpThumbnail.value = ''
})

const renderProduct = async(products)=> { 
    try{                
        if(products.length > 0){
            const response = await fetch('./plantilla.hbs')
            const plantilla = await response.text()
            document.querySelector('#noProducts').innerHTML=""  
            document.querySelector('#products').innerHTML = ""
            products.forEach(product => {
                const template = Handlebars.compile(plantilla)
                const html = template(product)
                document.querySelector('#products').innerHTML += html
            });
        }else{
            document.querySelector('#noProducts').innerHTML = ("<h4>No hay ningun producto :(</h4>")
            console.log('no hay productos')
        }
        }catch(error){
            console.log(`Se produjo el error: ${error}`)
        }
        
}

socket.on('server:products', products => {
    renderProduct(products)
    console.log('Se recibieron los productos')
})

socket.on('serverSend:message', messages => {
    renderMessage(messages)
})

const sendMessage = async() => {
    try{    
        const timeChat = `${fecha}, ${argHora}`
        socket.emit('client:message', { userMail: userMail.value, timeChat, userMessage: userMessage.value })
    }catch(error){
        console.log(`Se produjo el error: ${error}`)
    }
}

btnSendChat.addEventListener('click', (event) => {
    event.preventDefault()
    sendMessage()
    userMessage.value = ''
})

const renderMessage = async(messages) => {
    try{
        if(messages.length > 0){
            const response = await fetch('./chat.hbs')
            const plantilla = await response.text()
            document.querySelector('#chat').innerHTML = ""
            messages.forEach(message => {
                const template = Handlebars.compile(plantilla)
                const html = template(message)
                document.querySelector('#chat').innerHTML += html
            })
        }else{
            document.querySelector('#chat').innerHTML = ("<h4>No se ah iniciado ninguna conversación :(</h4>")
        }
    }catch(error){
        console.log(`Se produjo el error: ${error}`)
    }
}