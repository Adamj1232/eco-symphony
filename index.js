const addUrlAddress = document.getElementById('add-url-address')
const addUrlButton = document.getElementById('add-url-button')
const addFolderTitle = document.getElementById('add-folder-title')
const addFolderButton = document.getElementById('add-folder-button')

const filterByDate = document.getElementById('filter-by-date')
const filterByVisits = document.getElementById('filter-by-visits')

addUrlButton.addEventListener('click', function() {
  console.log(addUrlAddress.value)
  //check url vs existing links and forward addUrlAddress to creating function
})

addFolderButton.addEventListener('click', function() {
  console.log(addFolderTitle.value)
  //check folder name vs existing folders and forward addFolderTitle to creating function
})

filterByDate.addEventListener('click', function() {
  //filter by most recent initially, but reverse if clicked again
})

filterByVisits.addEventListener('click', function() {
  //filter by most visits initially, but reverse if clicked again
})
