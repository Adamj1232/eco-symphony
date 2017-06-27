const addUrlAddress = document.getElementById('add-url-address')
const addUrlButton = document.getElementById('add-url-button')
const addFolderTitle = document.getElementById('add-folder-title')
const addFolderButton = document.getElementById('add-folder-button')
const whatYearIsIt = document.getElementById('what-year-is-it')

const stylin = document.getElementById('stylin')

const filterByDate = document.getElementById('filter-by-date')
const filterByVisits = document.getElementById('filter-by-visits')

const selectedFolder = 'all'
const folderArray = ['all']

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
  const newFolderName = addFolderTitle.value
  var newFolderTitle = document.createElement('h2')
  var newDiv = document.createElement('DIV')
  var deleteBtn = document.createElement('BUTTON')
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
  //check folder name vs existing folders and forward addFolderTitle to creating function
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
