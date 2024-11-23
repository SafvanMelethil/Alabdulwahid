const grid = document.getElementById('image-grid');
const loadMoreBtn = document.getElementById('load-more');
const uploadBtn = document.getElementById('upload-btn');
const imageUploadInput = document.getElementById('image-upload');

// Initial Images (example; replace this with the images you want to show initially)
const initialImages = [
    '',
    '',
    '',
];

// Load images from localStorage
const getSavedImages = () => {
    const savedImages = localStorage.getItem('uploadedImages');
    return savedImages ? JSON.parse(savedImages) : [];
};

// Save images to localStorage
const saveImages = (images) => {
    localStorage.setItem('uploadedImages', JSON.stringify(images));
};

// Render images into the grid
const renderImages = (images) => {
    images.forEach((src) => {
        const img = document.createElement('img');
        img.src = src;
        grid.appendChild(img);
    });
};

// Combine initial and saved images
let allImages = [...initialImages, ...getSavedImages()];

// State for tracking displayed images
let displayedCount = 3; // Initially display 3 images

// Load initial images and saved images from localStorage
renderImages(allImages.slice(0, displayedCount)); // Show first 3 images

// Load more images when Load More button is clicked
loadMoreBtn.addEventListener('click', () => {
    const nextImages = allImages.slice(displayedCount, displayedCount + 3); // Load next 3 images
    renderImages(nextImages);
    displayedCount += nextImages.length;

    // Hide "Load More" button if all images are loaded
    if (displayedCount >= allImages.length) {
        loadMoreBtn.style.display = 'none';
    }
});

// Trigger file input when Add Image button is clicked
uploadBtn.addEventListener('click', () => {
    imageUploadInput.click();
});

// Add uploaded image to the grid and save it
imageUploadInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            const img = document.createElement('img');
            img.src = reader.result;
            grid.appendChild(img);

            // Save the new image in localStorage
            const savedImages = getSavedImages();
            savedImages.push(reader.result);
            saveImages(savedImages);

            // Update allImages array and render the newly uploaded image
            allImages.push(reader.result);
        };
        reader.readAsDataURL(file);
    }
});
