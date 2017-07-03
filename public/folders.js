const addFolderTitle = document.getElementById('add-folder-title')
const addFolderButton = document.getElementById('add-folder-button')
const selectedFolder = document.getElementById('selected-folder')
const selectedFolderListener = document.getElementsByClassName('new-folder')
const selectedFolderTitle = document.getElementById('selected-folder-title')

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
  let newContainerDiv = document.createElement('div')
  let newImgDiv = document.createElement('div')
  newImgDiv.setAttribute('class', 'folder-img-div')
  newContainerDiv.setAttribute('class', 'folder-container-div')
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
  newFolderTitle.setAttribute('class', 'folder-name')
  newFolderTitle.innerText = newFolderName

  deleteBtn.addEventListener('click', (e) => {
    deleteIdea(e, newDiv, 'folder', newFolderName)
    console.log(e.target);
    selectedFolder.innerHTML = 'none'
    console.log(selectedFolder.innerHTML);
  })

  newContainerDiv.appendChild(newFolderTitle)
  newContainerDiv.appendChild(deleteBtn)
  newDiv.appendChild(newContainerDiv)
  newDiv.appendChild(newImgDiv)
  document.getElementById('folders').appendChild(newDiv)
  filteredByDate = ''
  selectedFolderTitle.setAttribute('style', 'visibility: visible')
}

function selectExistingFolder(location) {

  const nameOfSelectedFolder = location.children[0].firstChild
  const folderElements = document.getElementsByClassName('folder-name')

  selectedFolderTitle.setAttribute('style', 'visibility: visible')
  selectedFolder.innerText = nameOfSelectedFolder.innerText

  for (var i = 0; i < folderElements.length; i++) {

    let matchCount = 0
    if( folderElements[i].innerText === nameOfSelectedFolder.innerText ){
      folderElements[i].parentNode.parentNode.setAttribute('class', 'selected new-folder')
      matchCount++
    } else {
      folderElements[i].parentNode.parentNode.setAttribute('class', 'new-folder')
    }
    if (matchCount === 0){
      selectedFolder.innerText = 'Please Add or Select a Folder to Create a Shortened Link Within'
    }
  }

  listLinks()
  filteredByDate = ''
}
