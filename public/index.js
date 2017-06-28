const addUrlAddress = document.getElementById('add-url-address')
const addUrlButton = document.getElementById('add-url-button')
const addFolderTitle = document.getElementById('add-folder-title')
const addFolderButton = document.getElementById('add-folder-button')
const whatYearIsIt = document.getElementById('what-year-is-it')

const stylin = document.getElementById('stylin')

const filterByDate = document.getElementById('filter-by-date')
const filterByVisits = document.getElementById('filter-by-visits')

const selectedFolder = ''
const folderArray = []
const storedLinks = stubData

// links have format
// {url: '',
// name: '',
// folder: '',
// time_stamp: '',
// clicks: '',
// id: ''}

window.onload = function() {
  //fetch to grab objects
  parseInfo()
  createFolders()
}

function parseInfo() {
  if(storedLinks.length) {
    storedLinks.forEach(link => {
      console.log(link.folder);
      let found = folderArray.find(link.folder) || undefined
      if(found !== undefined) {
        folderArray.push[link.folder]
    }
    })
  }
}

function createFolders(){
  folderArray.forEach(title => {
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
  })
}

addUrlButton.addEventListener('click', function() {
  const newUrl = {url: addUrlAddress.value,
                  name: addUrlAddress.value,
                  folder: selectedFolder,
                  time_stamp: Date.now(),
                  clicks: 0}

  console.log(newUrl)
  //check url vs existing links and forward addUrlAddress to creating function
})

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
