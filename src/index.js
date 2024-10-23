const ramenMenu = document.querySelector('div#ramen-menu')
const newRamenForm = document.querySelector('#new-ramen')


fetch('http://localhost:3000/ramens')
    .then(response => response.json())
    .then(ramenArr => {
        // const ramenMenu = document.querySelector('div#ramen-menu')

        ramenArr.forEach(ramenObject => {
            renderRamenImg(ramenObject)
        })
    })

// fetch('http://localhost:3000/ramens')
//     .then(function (response) {
//         return response.json()
//     })
//     .then(function (data) {
//         console.log(data)
//     })


newRamenForm.addEventListener('submit', event => {
    event.preventDefault()

    const nameInput = event.target.name.value
    const restaurantInput = event.target.restaurant.value
    const imageInput = event.target.image.value
    const ratingInput = event.target.rating.value
    const commentInput = event.target['new-comment'].value

    const newRamen = {
        name: nameInput,
        restaurant: restaurantInput,
        image: imageInput,
        rating: ratingInput,
        comment: commentInput
    }

    // const ramenMenu = document.querySelector('div#ramen-menu')
    renderRamenImg(newRamen)
    event.target.reset()
})


function renderRamenImg(ramenObject) {

    const imgTag = document.createElement('img')
    imgTag.src = ramenObject.image
    ramenMenu.append(imgTag)


    imgTag.addEventListener('click', event => {
        const ramenDetailDiv = document.querySelector('div#ramen-detail')

        const detailImg = ramenDetailDiv.querySelector('img.detail-image')
        detailImg.src = ramenObject.image

        const nameH2 = ramenDetailDiv.querySelector('.name')
        nameH2.textContent = ramenObject.name

        const restaurantH3 = ramenDetailDiv.querySelector('h3.restaurant')
        restaurantH3.textContent = ramenObject.restaurant

        const ratingSpan = document.querySelector('#rating-display')
        ratingSpan.textContent = ramenObject.rating

        const commentPtag = document.querySelector('#comment-display')
        commentPtag.textContent = ramenObject.comment
    })
}