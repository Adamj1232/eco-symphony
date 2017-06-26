const addUrlAddress = document.querySelector('#add-url-address').value
const addUrlButton = document.querySelector('#add-url-button')
const addFolderTitle = document.querySelector('#add-folder-title').value
const addFolderButton = document.querySelector('#add-folder-button')

const filterByDate = document.querySelector('#filter-by-date')
const filterByVisits = document.querySelector('#filter-by-visits')

addUrlButton.addEventListener('click', function() {
  //check url vs existing links and forward addUrlAddress to creating function
})

addFolderButton.addEventListener('click', function() {
  //check folder name vs existing folders and forward addFolderTitle to creating function
})

filterByDate.addEventListener('click', function() {
  //filter by most recent initially, but reverse if clicked again
})

filterByVisits.addEventListener('click', function() {
  //filter by most visits initially, but reverse if clicked again
})
