const whatYearIsIt = document.getElementById('what-year-is-it')
const stylin = document.getElementById('stylin')
const filterByDate = document.getElementById('filter-by-date')
const filterByVisits = document.getElementById('filter-by-visits')
const urlInput = document.getElementById('add-url-address')
const filterDateArrow = document.getElementById('date-arrow')
const filterClicksArrow = document.getElementById('clicks-arrow')
const selectedFolderTag = document.getElementById('selected-folder')

let filteredDate = false
let filteredClicks = false

function deleteIdea(e, div, deleteType, folderName){
  const id = e.path[1].id
  deleteDiv = document.getElementById(div.id)
  let fetchUrl = ''

  if(deleteType == 'folder') {
    const removeFolder = folderArray.indexOf(folderName)

    folderArray.splice(removeFolder, 1)

    selectedFolderTag.innerHTML = 'Please Add or Select a Folder to Create a Shortened Link Within'
    selectedFolderTitle.setAttribute('style', 'visibility: hidden')
  }

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

function sortLinks(sortType) {
  storedLinks.sort( (link1, link2) => {
    return link2[sortType] > link1[sortType]
  })
}

filterByDate.addEventListener('click', function() {
  if(selectedFolder.innerText !== "Please Add or Select a Folder to Create a Shortened Link Within"){
    if(filteredDate === false){
      filterDateArrow.setAttribute('class', 'fa fa-sort fa-sort-up'),
      filterClicksArrow.setAttribute('class', 'fa fa-sort'),
      filteredDate = true
      sortLinks('updated_at')
    } else {
      filteredDate = false
      storedLinks.reverse(),
      filterDateArrow.setAttribute('class', 'fa fa-sort fa-sort-down')
    }

    listLinks()
  }
})

// urlInput.addEventListener('focus', function(){
//   document.getElementById('add-url-address').value = 'http://'
// })

filterByVisits.addEventListener('click', function() {
  if(selectedFolder.innerText !== "Please Add or Select a Folder to Create a Shortened Link Within"){
    if(filteredClicks === false) {
      filterClicksArrow.setAttribute('class', 'fa fa-sort fa-sort-up'),
      filterDateArrow.setAttribute('class', 'fa fa-sort'),
      filteredClicks = true,
      sortLinks('clicks')
    } else {
      filterClicksArrow.setAttribute('class', 'fa fa-sort fa-sort-down'),
      filteredClicks = false,
      storedLinks.reverse()
    }
    listLinks()
  }
})


whatYearIsIt.addEventListener('click', function() {
  if(stylin.getAttribute('href') === 'main.css') {
    stylin.setAttribute('href', 'real.css')
  } else if (stylin.getAttribute('href') === 'real.css') {
    stylin.setAttribute('href', 'main.css')
  }
})
