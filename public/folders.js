const addFolderTitle = document.getElementById('add-folder-title')
const addFolderButton = document.getElementById('add-folder-button')
const selectedFolder = document.getElementById('selected-folder')
const selectedFolderListener = document.getElementsByClassName('new-folder')
const selectedFolderTitle = document.getElementById('selected-folder-title')

const folderArray = []
let idCounter = 0

addFolderButton.addEventListener('click', () => {
  evaluateFolder()
})

function evaluateFolder() {
  if(addFolderTitle.value &&
    folderArray.indexOf(addFolderTitle.value) === -1) {

    createFolder(addFolderTitle.value, 'new')
    selectedFolder.innerText = addFolderTitle.value
    addFolderTitle.value = ''
    selectedFolderTitle.setAttribute('style', 'visibility: visible')
  } else {
    selectedFolder.innerText = 'Folder Already Exists'
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
        createFolder(link.folder, 'existing')
      }
    })
  }
}

function createFolder(title, type) {
  const newFolderName = title
  let newDiv = document.createElement('div')
  let newContainerDiv = document.createElement('div')
  let newImgDiv = document.createElement('div')
  newImgDiv.setAttribute('class', 'folder-img-div')
  newContainerDiv.setAttribute('class', 'folder-container-div')

  type === 'new' ?
    newDiv.setAttribute('class', 'new-folder selected')
  :
    newDiv.setAttribute('class', 'new-folder');

  newDiv.addEventListener('click', () => {
    selectExistingFolder(newDiv, 'existing')
  })

  folderArray.unshift(newFolderName)

  newDiv.id = idCounter
  idCounter++

  let deleteBtn = document.createElement('button')
  deleteBtn.innerText = 'Delete'
  deleteBtn.setAttribute('class', 'folder-delete-button')

  let newFolderTitle = document.createElement('h2')
  newFolderTitle.setAttribute('class', 'folder-name')
  newFolderTitle.innerText = newFolderName

  deleteBtn.addEventListener('click', (e) => {
    deleteIdea(e, newDiv, 'folder', newFolderName)
    e.stopPropagation();
  })

  newContainerDiv.appendChild(newFolderTitle)
  newContainerDiv.appendChild(deleteBtn)
  newDiv.appendChild(newContainerDiv)
  newDiv.appendChild(newImgDiv)
  document.getElementById('folders').prepend(newDiv)
  filteredByDate = ''

  const foldersToStyle = document.getElementsByClassName('folder-name')
  for (var i = 1; i < foldersToStyle.length; i++) {
    foldersToStyle[i].parentNode.parentNode.setAttribute('class', 'new-folder')
  }
}

function selectedFolderStyle(nameOfSelectedFolder){
  const folderElements = document.getElementsByClassName('folder-name')
  for (var i = 0; i < folderElements.length; i++) {
    if( folderElements[i].innerText === nameOfSelectedFolder.innerText ){
      folderElements[i].parentNode.parentNode.setAttribute('class', 'selected new-folder')
    } else {
      folderElements[i].parentNode.parentNode.setAttribute('class', 'new-folder')
    }
  }
}

function selectExistingFolder(location, folderType) {

  let nameOfSelectedFolder
  if(folderType === 'newFolder'){
    nameOfSelectedFolder = location
  } else  {
    nameOfSelectedFolder = location.children[0].firstChild
  }

  selectedFolderTitle.setAttribute('style', 'visibility: visible')
  selectedFolder.innerText = nameOfSelectedFolder.innerText

  selectedFolderStyle(nameOfSelectedFolder)
  listLinks()
  filteredByDate = ''
}
