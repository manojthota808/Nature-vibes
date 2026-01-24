// Yeshu Gallery Logic

// Data
const IMAGES = {
    yeshu: [
        // Slider Images
        ...Array.from({ length: 10 }, (_, i) => ({
            id: i + 1,
            src: `images/Yeshu/${i + 1}.jpg`,
            alt: `Baby Photo ${i + 1}`
        })),
        // Featured Images
        ...Array.from({ length: 10 }, (_, i) => ({
            id: 200 + i,
            src: `images/Yeshu/${200 + i}.jpg`,
            alt: `Baby Photo ${200 + i}`
        })),
        // Main Gallery Images
        ...Array.from({ length: 18 }, (_, i) => ({
            id: 300 + i,
            src: `images/Yeshu/${300 + i}.jpg`,
            alt: `Baby Photo ${300 + i}`
        }))
    ]
};

// Initialization
function initGalleryContent() {
    // Setup images
    const currentImages = IMAGES.yeshu;

    // Title setup
    const galleryTitle = document.querySelector('.gallery-title');
    if (galleryTitle) {
        galleryTitle.textContent = 'Yeshu Gallery';
        galleryTitle.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        galleryTitle.style.webkitBackgroundClip = 'text';
        galleryTitle.style.webkitTextFillColor = 'transparent';
        galleryTitle.style.backgroundClip = 'text';
    }

    // Distribute
    const sliderImgs = currentImages.slice(0, 10);
    const featuredImgs = currentImages.slice(10, 20);
    const mainImgs = currentImages.slice(20);

    // Render Slider
    const sliderWrapper = document.getElementById('slider-wrapper');
    if (sliderWrapper) {
        sliderWrapper.innerHTML = sliderImgs.map((img, index) => `
            <div class="slide ${index === 0 ? 'active' : ''}" data-id="${img.id}">
                <img src="${img.src}" alt="${img.alt}" ${index === 0 ? 'loading="eager"' : 'loading="lazy"'}>
                <div class="slide-content">
                    <div class="like-btn" data-id="${img.id}">
                        <span class="like-count"></span>
                        <svg class="heart-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Item Template
    const createGalleryItem = (img) => `
        <div class="gallery-item" data-id="${img.id}">
            <img src="${img.src}" alt="${img.alt}" loading="lazy">
            <div class="gallery-like-btn" data-id="${img.id}">
                <span class="like-count"></span>
                <svg class="heart-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
            </div>
        </div>
    `;

    // Render Featured
    const featuredGrid = document.getElementById('featured-gallery-grid');
    if (featuredGrid) {
        featuredGrid.innerHTML = featuredImgs.map(createGalleryItem).join('');
        const section = featuredGrid.closest('.homepage-gallery');
        if (section) section.style.display = featuredImgs.length ? 'block' : 'none';
    }

    // Render Main
    const mainGrid = document.getElementById('main-gallery-grid');
    if (mainGrid) {
        mainGrid.innerHTML = mainImgs.map(createGalleryItem).join('');
        const section = mainGrid.closest('.gallery-section');
        if (section) section.style.display = mainImgs.length ? 'block' : 'none';
    }
}

// Startup
document.addEventListener('DOMContentLoaded', () => {
    // Initialization
    initGalleryContent();
    window.natureSlider = new NatureSlider();
    window.likeManager = new LikeManager();
    window.navigationBar = new NavigationBar();
    window.modalSlider = new ModalSlider();

    // Event setup
    setupGalleryClicks();

    // Pagination setup
    if (document.querySelector('.homepage-gallery .gallery-grid')) {
        window.featuredGalleryPagination = new GalleryPagination('.homepage-gallery .gallery-grid', '.homepage-gallery .pagination', 9);
    }
    if (document.querySelector('.gallery-section .gallery-grid')) {
        window.natureGalleryPagination = new GalleryPagination('.gallery-section .gallery-grid', '.gallery-section .pagination', 9);
    }

    // Like sync
    const originalSyncLikeState = window.likeManager.syncLikeState.bind(window.likeManager);
    window.likeManager.syncLikeState = function (id) {
        originalSyncLikeState(id);
        if (window.modalSlider && window.modalSlider.modalOverlay && window.modalSlider.modalOverlay.classList.contains('active')) {
            const modalBtn = window.modalSlider.modalLikeBtn;
            if (modalBtn && modalBtn.getAttribute('data-id') === id) {
                if (this.likedItems.has(id)) {
                    modalBtn.classList.add('liked');
                } else {
                    modalBtn.classList.remove('liked');
                }
            }
        }
    };
});
