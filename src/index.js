const ramenMenu = document.querySelector('div#ramen-menu');
const newRamenForm = document.querySelector('#new-ramen');

// Function to fetch ramen data and display images
const fetchRamens = () => {
    fetch('http://localhost:3000/ramens')
        .then(response => response.json())
        .then(ramenArr => {
            ramenArr.forEach(ramenObject => {
                renderRamenImg(ramenObject);
            });
        })
        .catch(error => console.error('Error fetching ramens:', error));
};

// Event listener for the new ramen form
newRamenForm.addEventListener('submit', event => {
    event.preventDefault();

    const nameInput = event.target.name.value;
    const restaurantInput = event.target.restaurant.value;
    const imageInput = event.target.image.value;
    const ratingInput = event.target.rating.value;
    const commentInput = event.target['new-comment'].value;

    const newRamen = {
        name: nameInput,
        restaurant: restaurantInput,
        image: imageInput,
        rating: ratingInput,
        comment: commentInput,
    };

    renderRamenImg(newRamen);
    event.target.reset(); // Reset the form fields
});

// Function to render ramen image and add event listener
function renderRamenImg(ramenObject) {
    const imgTag = document.createElement('img');
    imgTag.src = ramenObject.image;
    imgTag.alt = ramenObject.name; // Optional: add alt text for accessibility
    ramenMenu.appendChild(imgTag); // Append the image to the ramen menu

    imgTag.addEventListener('click', () => {
        const ramenDetailDiv = document.querySelector('div#ramen-detail');

        const detailImg = ramenDetailDiv.querySelector('img.detail-image');
        detailImg.src = ramenObject.image;

        const nameH2 = ramenDetailDiv.querySelector('.name');
        nameH2.textContent = ramenObject.name;

        const restaurantH3 = ramenDetailDiv.querySelector('h3.restaurant');
        restaurantH3.textContent = ramenObject.restaurant;

        const ratingSpan = document.querySelector('#rating-display');
        ratingSpan.textContent = ramenObject.rating;

        const commentPtag = document.querySelector('#comment-display');
        commentPtag.textContent = ramenObject.comment;
    });
}

// Invoke the fetchRamens function to load the initial data
fetchRamens();
