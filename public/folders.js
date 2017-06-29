const addFolderTitle = document.getElementById('add-folder-title')
const addFolderButton = document.getElementById('add-folder-button')
const selectedFolder = document.getElementById('selected-folder')
const selectedFolderListener = document.getElementsByClassName('new-folder')

const folderArray = []
let idCounter = 0

addFolderButton.addEventListener('click', function() {
  evaluateFolder()
})

function evaluateFolder() {
  if(addFolderTitle.value &&
    folderArray.indexOf(addFolderTitle.value) === -1) {

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

function parseInfo(storedLinks) {
  if(storedLinks.length) {
    storedLinks.forEach(link => {
      if(folderArray.indexOf(link.folder) === -1){
        createFolder(link.folder)
      }
    })
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

  deleteBtn.addEventListener('click', (e) => {
    deleteIdea(e, newDiv, 'folder', newFolderName)
  })

  newDiv.appendChild(newFolderTitle)
  newDiv.appendChild(deleteBtn)
  document.getElementById('folders').appendChild(newDiv)
  filteredByDate = ''

}

function selectExistingFolder(location) {
  const nameOfSelectedFolder = location.firstChild
  selectedFolder.innerText = nameOfSelectedFolder.innerText
  listLinks()
  filteredByDate = ''
}
