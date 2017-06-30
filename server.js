const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);
const host = process.env.DOMAIN_ENV || 'localhost:3000';

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const shortid = require('shortid');

app.set('port', process.env.PORT || 3000);
app.locals.title = 'Jet Fuel';

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static(`${__dirname}/public`))

app.locals.links = {}

app.get('/', (request, response) => {
  response.sendFile('index.html')
});

app.get('/:link', (req, res) => {
  const link = req.params.link
  database('links').where('name', link).select()
    .then((cleanLink) => {
      return database('links')
            .where('name', link)
            .select('url')
    .then((fullLink) => {
      if(fullLink[0]) {
        res.redirect(301, fullLink[0].url)
      } else {
        res.sendStatus(404).send({
          error: 'Doesn\'t seem to be anything here'
        })
      }
    })
  })
  .catch(() => {
    res.status(500).send({
      error: 'Something went horribly wrong.'
    })
  })
})

app.get('/api/v1/links', (req, res) => {
  database('links').select()
    .then((links) => {
      if(links.length) {
        res.status(200).json(links)
      } else {
        res.status(404).send({
          error: 'That doesn\'t seem to exist'
        })
      }
    })
    .catch(() => {
      res.status(500).send({
        error: 'Soooooomething went horribly wrong.'
      })
    })
})

app.post('/api/v1/links', (req, res) => {
  const link = req.body
  link.name = `${host}/${shortid.generate()}`

  if (!link.name) {
    return response.status(422).send({
      error: 'An error occurred generating a shortened url - please resubmit your link'
    })
  }

  for(let requiredParameter of ['url', 'folder']) {
    if(!link[requiredParameter]) {
      return res.status(422).send({
        error: `Yo, need a url and a folder name.
        You sent ${link}.`
      })
    }
  }

  database('links').insert(link, 'id')
    .then((newLink) => {
      res.status(201).json(newLink)
    })
    .catch(error => {
      res.status(500).send({ error: 'what the hell are you doing?'})
    })
})

app.get('/api/v1/links/click/:id', (req, res) => {
  const id = req.params.id
  database('links')
    .where('id', id)
    .increment('clicks', 1)
    .then(() => {
      return database('links')
            .where('id', id)
            .select('url')
    })
    .then((longLink) => {
      res.json(longLink)
    })
    .catch((error) => {
      res.sendStatus(500)
    })
})

app.delete('/api/v1/links/folder/:folder', (req, res) => {
  const { folder } = req.params
  database('links').where('folder', folder).del()
    .then(() => {
      res.sendStatus(200)
    })
    .catch(error => {
      res.sendStatus(500)
    })
})

app.delete('/api/v1/links/:id', (req, res) => {
  const { id } = req.params
  database('links').where('id', id).del()
    .then(() => {
      res.sendStatus(200)
    })
    .catch(error => {
      res.sendStatus(500)
    })
})

app.listen(app.get('port'), () => {  //GET request is sent to this root/location and defining the response sent
  console.log(`${app.locals.title} is running on ${app.get('port')}.`) //logging what port the app is running at with the name - 'app.locals.title'...logged in terminal
});

module.exports = app
