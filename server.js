const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.set('port', process.env.PORT || 3000);
app.locals.title = 'Jet Fuel';

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static(`${__dirname}/public`))

app.locals.links = {}

app.get('/', (request, response) => {
  response.sendFile('index.html') //GET request is sent to this root/location and defining the response sent
});

// app.get('/api/v1/folders', (req, res) => {
//   database('folders').select()
//     .then((folders) => {
//       if(folders.length) {
//         res.status(200).json(folders)
//       } else {
//         res.status(404).json({
//           error: 'folder shit\'s not here bro'
//         })
//       }
//     })
//     .catch(() => {
//       res.status(500).json({
//         error: 'your guess is as good as ours'
//       })
//     })
// })

app.get('/api/v1/links', (req, res) => {
  database('links').select()
    .then((links) => {
      if(links.length) {
        res.status(200).json(links)
      } else {
        res.status(404).json({
          error: 'link shit\'s not here bro'
        })
      }
    })
    .catch(() => {
      res.status(500).json({
        error: 'totally out of line man'
      })
    })
})

app.post('/api/v1/links', (req, res) => {
  const link = req.body

  for(let requiredParameter of ['url', 'folder']) {
    if(!link[requiredParameter]) {
      return res.status(422).json({
        error: `yo bro, need a url and a folder name.
        you only sent ${link}. nice job`
      })
    }
  }

  database('links').insert(link, 'id')
    .then((link) => {
      res.status(201).json(link)
    })
    .catch(error => {
      res.status(500).json({ error: 'what the hell are you doing?'})
    })
})

app.listen(app.get('port'), () => {  //GET request is sent to this root/location and defining the response sent
  console.log(`${app.locals.title} is running on ${app.get('port')}.`) //logging what port the app is running at with the name - 'app.locals.title'...logged in terminal
});
