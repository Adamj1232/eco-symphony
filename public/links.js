const addUrlAddress = document.getElementById('add-url-address')
const addUrlButton = document.getElementById('add-url-button')

let storedLinks = []

// links have format
// {url: '',
// name: '',
// folder: '',
// time_stamp: '',
// clicks: '',
// id: ''}

const loadLinks = () => {
  fetch('/api/v1/links').then(res => {
    res.json()
    .then(info => {
      parseInfo(info)
      storedLinks = info
      console.log(info);
      listLinks()
    })
  })
}

loadLinks()

function listLinks() {
  document.getElementById('links').innerHTML = ''
  storedLinks.forEach(link => {
    if(selectedFolder.innerText == link.folder) {
      renderLink(link, link.id)
    }
  })
}

function renderLink(link, id) {
  const newLink = link
  let newDiv = document.createElement('div')
  newDiv.setAttribute('class', 'link')
  newDiv.id = id

  let deleteBtn = document.createElement('button')
  deleteBtn.innerText = 'Delete'
  deleteBtn.setAttribute('class', 'folder-delete-button')
  //switch css class to link-delete-button
  deleteBtn.addEventListener('click', (e) => {
    deleteIdea(e, newDiv, 'url')
  })

  let clickTitle = document.createElement('h6')
  clickTitle.innerText = 'Times visited'

  let newUrlTitle = document.createElement('h5')
  let newUrl = document.createElement('a')
  newUrl.setAttribute('href', newLink.url)
  newUrlTitle.innerText = `${newLink.url}`
  newUrl.appendChild(newUrlTitle)

  let newShortUrl = document.createElement('a')
  newShortUrl.setAttribute('href', `${newLink.url}`)
  newShortUrl.setAttribute('class', 'short-link-clicks')
  newShortUrl.setAttribute('target', '_blank')
  newShortUrl.addEventListener('click', (e) => {
    incrementClickShortURL(newDiv.id)
  })
  newShortUrl.setAttribute('href', newLink.url)
  newShortUrl.innerText = `${newLink.name}`

  let newClicks = document.createElement('p')
  newClicks.innerText = `${newLink.clicks}`
  newClicks.setAttribute('class', 'link-clicks')

  newDiv.appendChild(newUrl)
  newDiv.appendChild(newShortUrl)
  newDiv.appendChild(clickTitle)
  newDiv.appendChild(newClicks)
  newDiv.appendChild(deleteBtn)
  document.getElementById('links').appendChild(newDiv)
}

addUrlButton.addEventListener('click', function() {
  const newUrl = {
                  url: addUrlAddress.value,
                  name: addUrlAddress.value,
                  folder: folderCheck(addFolderTitle.value),
                  clicks: 0
                }
                console.log(newUrl);
  saveNewLink(newUrl)
  addFolderTitle.value = ''
  addUrlAddress.value = ''
})

const saveNewLink = (newUrl) => {
  fetch('/api/v1/links', {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newUrl)
  })
  .then(res => {
    res.json()
    .then(newUrlId => {
      loadLinks()
    })
  })
}

const incrementClickShortURL = (id) => {
  fetch(`/api/v1/links/click/${id}`)
  .then((link) => {
    link.json()
    .then((cleanLink) => {
      loadLinks()
      window.open.href = `${cleanLink[0].url}`
    })
  })
}
