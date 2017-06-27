const md5 = require ('md5')

const express = require('express'); //import express
const bodyParser = require('body-parser')
const app = express(); //assign app

app.set('port', process.env.PORT || 3000); //address to host if not launched localhost 3000 or a defined port 'process.env.PORT' which is what heroku looks for**
app.locals.title = 'Jet Fuel'; //name for server that only lasts the duration of the session

app.use(bodyParser.json()) //parses json to be readable in body or encoded as defined below
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static(`${__dirname}/public`))  //looks for public folder to send, HTML
// app.use(favicon(path.join(__dirname, './', 'public', 'images', 'favicon.ico')));

app.locals.links = {}


app.get('/', (request, response) => {
  response.sendFile('index.html') //GET request is sent to this root/location and defining the response sent
});

app.post('/api/links', (request, response) => {
  const { url, name, folder, time_stamp, clicks } = request.body
  const body = request.body
  const id = md5(url)

  if (!url) {
    return response.status(422).send({
      error: 'No URL property provided'
    })
  }

  app.locals.links[id] = body

  response.status(201).json({ id, body }) //defines status that dev wants to send if successful, 201 = Created
})

app.get('/api/links/:id', (request, response) => {
  const { id } = request.params //destructure params
  const message = app.locals.secrets[id] //recieve message from address

  if (!message) { return response.sendStatus(404)  } //sends status 'not found' as defined by 404

  response.json({ id, message }) //set response
})

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

app.listen(app.get('port'), () => {  //GET request is sent to this root/location and defining the response sent
  console.log(`${app.locals.title} is running on ${app.get('port')}.`) //logging what port the app is running at with the name - 'app.locals.title'...logged in terminal
});
