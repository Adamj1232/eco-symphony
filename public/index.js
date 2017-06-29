const addUrlAddress = document.getElementById('add-url-address')
const addUrlButton = document.getElementById('add-url-button')
const addFolderTitle = document.getElementById('add-folder-title')
const addFolderButton = document.getElementById('add-folder-button')
const whatYearIsIt = document.getElementById('what-year-is-it')
const selectedFolder = document.getElementById('selected-folder')
const selectedFolderListener = document.getElementsByClassName('new-folder')

let idCounter = 0

const stylin = document.getElementById('stylin')

const filterByDate = document.getElementById('filter-by-date')
const filterByVisits = document.getElementById('filter-by-visits')

const folderArray = []
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
    })
  })
}

loadLinks()

function parseInfo(storedLinks) {
  if(storedLinks.length) {
    storedLinks.forEach(link => {
      if(folderArray.indexOf(link.folder) === -1){
        folderArray.push(link.folder)
        createFolder(link.folder)
      }
    })
  }
}

function listLinks() {
  document.getElementById('links').innerHTML = ''
  storedLinks.forEach(link => {
    if(selectedFolder.innerText == link.folder) {
      renderLink(link)
    }
  })
}

function renderLink(link) {
  const newLink = link
  let newDiv = document.createElement('div')
  newDiv.setAttribute('class', 'link')
  newDiv.id = Date.now()

  let deleteBtn = document.createElement('button')
  deleteBtn.innerText = 'Delete'
  deleteBtn.setAttribute('class', 'folder-delete-button')
  //switch css class to link-delete-button
  deleteBtn.addEventListener('click', () => {
    deleteIdea(newDiv)
  })

  let newUrlTitle = document.createElement('h5')
  let newUrl = document.createElement('a')
  newUrl.setAttribute('href', newLink.url)
  newUrlTitle.innerText = `${newLink.url}`
  newUrl.appendChild(newUrlTitle)

  let newName = document.createElement('a')
  newName.setAttribute('href', newLink.url)
  newName.innerText = `${newLink.name}`

  let newClicks = document.createElement('p')
  newClicks.innerText = `${newLink.clicks}`
  newClicks.setAttribute('class', 'link-clicks')

  newDiv.appendChild(newUrl)
  newDiv.appendChild(newName)
  newDiv.appendChild(newClicks)
  newDiv.appendChild(deleteBtn)
  document.getElementById('links').appendChild(newDiv)
}

function createFolder(title) {
  const newFolderName = title
  let newDiv = document.createElement('div')
  newDiv.setAttribute('class', 'new-folder')
  newDiv.addEventListener('click', () => {
    selectExistingFolder(newDiv)
  })

  newDiv.id = idCounter
  idCounter++

  let deleteBtn = document.createElement('button')
  deleteBtn.innerText = 'Delete'
  deleteBtn.setAttribute('class', 'folder-delete-button')

  let newFolderTitle = document.createElement('h2')
  newFolderTitle.innerText = newFolderName
  newFolderTitle.contentEditable = true

  deleteBtn.addEventListener('click', () => {
    deleteIdea(newDiv)
  })

  newDiv.appendChild(newFolderTitle)
  newDiv.appendChild(deleteBtn)
  document.getElementById('folders').appendChild(newDiv)
}

addUrlButton.addEventListener('click', function() {
  const newUrl = {
                  url: addUrlAddress.value,
                  name: addUrlAddress.value,
                  folder: folderCheck(),
                  time_stamp: Date.now(),
                  clicks: 0
                }
  addFolderTitle.value = ''
  console.log(newUrl)
  saveNewLink(newUrl)
  //check url vs existing links and forward addUrlAddress to creating function
})

const saveNewLink = (newUrl) => {
  console.log('SAVELINK URL', JSON.stringify(newUrl));
  fetch('/api/v1/links', {method: "POST",
                          body: JSON.stringify(newUrl)})
    .then(res => {
    res.json()
    .then(info => {
      parseInfo(info)
      storedLinks = info
    })
  })
}

function folderCheck() {
  if(!addFolderTitle.value) {
    return selectedFolder.innerText
  } else {
    return addFolderTitle.value
  }
}

//need an alternative ID to date.now since multiple folders are created in the same milisecond

function selectExistingFolder(location) {
    console.log('LOCATIONARY', location);
    const nameOfSelectedFolder = location.firstChild
    console.log(nameOfSelectedFolder);
    console.log(selectedFolder);
    selectedFolder.innerText = nameOfSelectedFolder.innerText
    listLinks()
}

function deleteIdea(div){
  deleteDiv = document.getElementById(div.id)
  console.log('delete text', selectedFolder.innerText);
  selectedFolder.innerText = 'none'
  div.parentNode.removeChild(deleteDiv)
}

addFolderButton.addEventListener('click', function() {
  if(addFolderTitle.value) {
    createFolder(addFolderTitle.value)
    selectedFolder.innerText = addFolderTitle.value
  }
})

filterByDate.addEventListener('click', function() {

  //filter by most recent initially, but reverse if clicked again
})



filterByVisits.addEventListener('click', function() {
  //filter by most visits initially, but reverse if clicked again
})



whatYearIsIt.addEventListener('click', function() {
  if(stylin.getAttribute('href') === 'main.css') {
    stylin.setAttribute('href', 'real.css')
  } else if (stylin.getAttribute('href') === 'real.css') {
    stylin.setAttribute('href', 'main.css')
  }
})
