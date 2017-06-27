const express = require('express'); //import express
const bodyParser = require('body-parser')
const app = express(); //assign app

app.set('port', process.env.PORT || 3000); //address to host if not launched localhost 3000 or a defined port 'process.env.PORT' which is what heroku looks for**
app.locals.title = 'Jet Fuel'; //name for server that only lasts the duration of the session

app.use(bodyParser.json()) //parses json to be readable in body or encoded as defined below
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static(`${__dirname}/public`))  //looks for public folder to send, HTML

app.get('/', (request, response) => {
  response.sendFile('index.html') //GET request is sent to this root/location and defining the response sent
});

// app.get('/api/secrets/:id', (request, response) => {
//   const { id } = request.params //destructure params
//   const message = app.locals.secrets[id] //recieve message from address
//
//   if (!message) { return response.sendStatus(404)  } //sends status 'not found' as defined by 404
//
//   response.json({ id, message }) //set response
// })
//
// app.put('/api/secrets/:id', (request, response) => {
//   const { id } = request.params //destructure params
//   const { message } = request.body
//
//   // let message = app.locals.secrets[id] //recieve message from address
//
//   // message = newMessage
//   app.locals.secrets[id] = message
//
//   if (!message) { return response.sendStatus(422)  } //sends status 'request missing something' as defined by 422
//
//   response.json({ id, message }) //set response
// })
//
// app.post('/api/secrets', (request, response) => {
//   const { message } = request.body
//   const id = Date.now()   // orrrr use const id = md5(message)***
//
//   if (!message) {
//     return response.status(422).send({
//       error: 'No message property provided'
//     })
//   }
//
//   app.locals.secrets[id] = message
//
//   response.status(201).json({ id, message }) //defines status that dev wants to send if successful, 201 = Created
// })

app.listen(app.get('port'), () => {  //GET request is sent to this root/location and defining the response sent
  console.log(`${app.locals.title} is running on ${app.get('port')}.`) //logging what port the app is running at with the name - 'app.locals.title'...logged in terminal
});
