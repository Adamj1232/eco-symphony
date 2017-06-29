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
      listLinks()
    })
  })
}

loadLinks()

function parseInfo(storedLinks) {
  if(storedLinks.length) {
    storedLinks.forEach(link => {
      if(folderArray.indexOf(link.folder) === -1){
        createFolder(link.folder)
      }
    })
  }
}

function listLinks() {
  document.getElementById('links').innerHTML = ''
  storedLinks.forEach(link => {
    if(selectedFolder.innerText == link.folder) {
      renderLink(link, link.id)
    }
  })
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
  //check url vs existing links and forward addUrlAddress to creating function
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

addFolderButton.addEventListener('click', function() {
  evaluateFolder()
})

function evaluateFolder() {
  if(addFolderTitle.value &&
    folderArray.indexOf(addFolderTitle.value) === -1) {
    console.log('evaluate folder', addFolderTitle.value);
    createFolder(addFolderTitle.value)
    selectedFolder.innerText = addFolderTitle.value
    addFolderTitle.value = ''
  }
}

function folderCheck(folderTitle) {
  if(!folderTitle) {
    return selectedFolder.innerText
  } else{
    evaluateFolder()
    return folderTitle
  }
}

function createFolder(title) {
  const newFolderName = title
  let newDiv = document.createElement('div')
  newDiv.setAttribute('class', 'new-folder')
  newDiv.addEventListener('click', () => {
    selectExistingFolder(newDiv)
  })

  folderArray.push(newFolderName)

  newDiv.id = idCounter
  idCounter++

  let deleteBtn = document.createElement('button')
  deleteBtn.innerText = 'Delete'
  deleteBtn.setAttribute('class', 'folder-delete-button')

  let newFolderTitle = document.createElement('h2')
  newFolderTitle.innerText = newFolderName
  newFolderTitle.contentEditable = true

  deleteBtn.addEventListener('click', (e) => {
    deleteIdea(e, newDiv, 'folder', newFolderName)
  })

  newDiv.appendChild(newFolderTitle)
  newDiv.appendChild(deleteBtn)
  document.getElementById('folders').appendChild(newDiv)
}

function selectExistingFolder(location) {
    const nameOfSelectedFolder = location.firstChild
    selectedFolder.innerText = nameOfSelectedFolder.innerText
    listLinks()
}


function deleteIdea(e, div, deleteType, folderName){
  const id = e.path[1].id
  deleteDiv = document.getElementById(div.id)
  let fetchUrl = ''

  if(deleteType == 'folder') {
    selectedFolder.innerText = 'none'
    const removeFolder = folderArray.indexOf(folderName)
    folderArray.splice(removeFolder, 1)
  }

  console.log('e', e);
  console.log('div', div.id);
  console.log('deleteType', deleteType);
  console.log('folderName', folderName);

  deleteType === 'url' ?
    fetchUrl = `/api/v1/links/${id}`
    :
    fetchUrl = `/api/v1/links/folder/${folderName}`

  fetch(fetchUrl, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  })
  .then(res => {
    loadLinks()
  })
  div.parentNode.removeChild(deleteDiv)
}

filterByDate.addEventListener('click', function() {
  console.log(storedLinks);

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
