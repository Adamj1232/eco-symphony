const addUrlAddress = document.getElementById('add-url-address')
const addUrlButton = document.getElementById('add-url-button')
const addFolderTitle = document.getElementById('add-folder-title')
const addFolderButton = document.getElementById('add-folder-button')
const whatYearIsIt = document.getElementById('what-year-is-it')
const selectedFolder = document.getElementById('selected-folder')

const stylin = document.getElementById('stylin')

const filterByDate = document.getElementById('filter-by-date')
const filterByVisits = document.getElementById('filter-by-visits')

// let selectedFolder = ''
const folderArray = []
// let storedLinks = []

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
      // storedLinks.push([...info])
      parseInfo(info)
    })
  })
}


window.onload = function() {
  loadLinks()
}

function parseInfo(storedLinks) {
  if(storedLinks.length) {
    storedLinks.forEach(link => {
      console.log(link.folder);
      if(folderArray.indexOf(link.folder) === -1){
        folderArray.push(link.folder)
        createFolder(link.folder)
      }
    })
  }
}

function createFolder(title) {
  const newFolderName = title
  let newFolderTitle = document.createElement('h2')
  let newDiv = document.createElement('DIV')
  let deleteBtn = document.createElement('BUTTON')

  newDiv.id = Date.now()
  newDiv.setAttribute('class', 'new-folder')

  deleteBtn.innerHTML = 'Delete'
  newFolderTitle.innerHTML = newFolderName
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
  //check url vs existing links and forward addUrlAddress to creating function
})

function folderCheck() {
  if(!addFolderTitle.value) {
    return selectedFolder.innerText
  } else {
    return addFolderTitle.value
  }
}

function deleteIdea(div){
  deleteDiv = document.getElementById(div.id)
  div.parentNode.removeChild(deleteDiv)
}

addFolderButton.addEventListener('click', function() {
  if(addFolderTitle.value) {
    const newFolderName = addFolderTitle.value
    let newFolderTitle = document.createElement('h2')
    let newDiv = document.createElement('DIV')
    let deleteBtn = document.createElement('BUTTON')

    newDiv.id = Date.now()
    newDiv.setAttribute('class', 'new-folder')

    deleteBtn.innerHTML = 'Delete'
    newFolderTitle.innerHTML = newFolderName
    newFolderTitle.contentEditable = true

    deleteBtn.addEventListener('click', () => {
      deleteIdea(newDiv)
    })

    newDiv.appendChild(newFolderTitle)
    newDiv.appendChild(deleteBtn)
    document.getElementById('folders').appendChild(newDiv)
    addFolderTitle.value = ''
    document.getElementById('selected-folder').innerText = `${newFolderName}`
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
