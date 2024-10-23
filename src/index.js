const baseUrl = "http://localhost:3000"

// DOM selectors
const menu = document.querySelector('#ramen-menu')
const detail = document.querySelector('#ramen-detail')
const rating = document.querySelector('#rating-display')
const comment = document.querySelector('#comment-display')
const newRamenForm = document.querySelector('#new-ramen')

// Listeners
newRamenForm.addEventListener('submit', handleAddRamen)

// Fetchers
function getAllRamens(){
    // fetch(baseUrl + `/ramens`)  
    //     .then(res => res.json())
        // .then((arrOfRamen) => {  gets the data from res.json(), calls it arrOfRamen and passes it to cb function
            //     arrOfRamen.forEach(ramenObj => { // iterates over the array and passes each ramenObj into another anonymous callback function
                //         // your logic for taking a ramenObj and using that 
                //         // data to render the menu items into the DOM
                //     })
                // })

    // the way below does the same as above, but abstracts some of the logic into a standalone, named function
    // so we just receive the array of data from res.json() and then call the renderAllRamens function, passing it the array of ramens

    // fetch(baseUrl + `/ramens`)
    //     .then(res => res.json())
        // .then((arrRamenObj) => renderAllRamens(arrRamenObj)) 
        

    // the way below does the same as above; if we just pass a reference to a function to .then(), it will
    // implicitly call renderAllRamen and pass it whatever was returned by the previous Promise (in this case, 
    // the array of Ramen Object we fetched from the server)
    
    fetch(baseUrl + `/ramens`)
        .then(res => res.json())
        .then(renderAllRamens)
}

// Render functions
function renderAllRamens(ramensArr){  // a single-responsibility function; the job is just to receive an array, iterate over it, and pass each element to a callback function
    // ramensArr.forEach(ramenObj => renderOneMenu(ramenObj))  the long-form way
    ramensArr.forEach(renderOneMenu)  // shorthand for the above
}

function renderOneMenu(ramenObj){
    // creating all the elements we need
    const div = document.createElement("div")
    const img = document.createElement("img")
    const btn = document.createElement('button')
    
    // assigning attributes to the elements
    img.src = ramenObj.image
    btn.textContent = 'X'
    btn.style.backgroundColor = 'red'
    btn.style.color = 'white'

    div.append(img, btn) // glues them together into one group

    // adding event listeners
    img.addEventListener('click', () => renderDetail(ramenObj))
    btn.addEventListener('click', () => {
            div.remove()
            detail.innerHTML = `
                <img class="detail-image" src="./assets/image-placeholder.jpg" alt="Insert Name Here" />
                <h2 class="name">Insert Name Here</h2>
                <h3 class="restaurant">Insert Restaurant Here</h3>
            `
        }
    )
    // appending into the DOM
    menu.appendChild(div)
}

function renderDetail(ramenObj){
    detail.innerHTML = `
        <img class="detail-image" src="${ramenObj.image}" alt="${ramenObj.name}" />
        <h2 class="name">${ramenObj.name}</h2>
        <h3 class="restaurant">${ramenObj.restaurant}</h3>
    `
    rating.innerText = ramenObj.rating
    comment.innerText = ramenObj.comment
}

// Event handlers

function handleAddRamen(e){
    e.preventDefault()
    console.dir(e.target)
    const name = e.target.name.value
    const restaurant = e.target.restaurant.value
    const image = e.target.image.value
    const rating = e.target.rating.value
    const comment = e.target["new-comment"].value
    const newRamen = { // ES6 for the below
        name,
        restaurant,
        image,
        rating,
        comment
    }
    // const newRamen = {
    //     name: name,
    //     restaurant: restaurant,
    //     image: image,
    //     rating: rating,
    //     comment: comment
    // }
    renderOneMenu(newRamen)
}

// Initializers
getAllRamens()