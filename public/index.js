const whatYearIsIt = document.getElementById('what-year-is-it')

let filteredByDate = ''
let filteredByClicks = ''

const stylin = document.getElementById('stylin')

const filterByDate = document.getElementById('filter-by-date')
const filterByVisits = document.getElementById('filter-by-visits')

function deleteIdea(e, div, deleteType, folderName){
  const id = e.path[1].id
  deleteDiv = document.getElementById(div.id)
  let fetchUrl = ''

  if(deleteType == 'folder') {
    selectedFolder.innerText = 'none'
    const removeFolder = folderArray.indexOf(folderName)
    folderArray.splice(removeFolder, 1)
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

  filteredByDate === '' ?
    filteredByDate = 'clicked' && sortLinks('updated_at')
    :
    filteredByDate = 'un-clicked' && storedLinks.reverse()

  listLinks()
})



filterByVisits.addEventListener('click', function() {

  filteredByClicks === '' ?
    filteredByClicks = 'clicked' && sortLinks('clicks')
    :
    filteredByClicks = 'un-clicked' && storedLinks.reverse()

  listLinks()
})



whatYearIsIt.addEventListener('click', function() {
  if(stylin.getAttribute('href') === 'main.css') {
    stylin.setAttribute('href', 'real.css')
  } else if (stylin.getAttribute('href') === 'real.css') {
    stylin.setAttribute('href', 'main.css')
  }
})
