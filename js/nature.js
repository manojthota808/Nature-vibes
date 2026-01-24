// Nature Gallery Logic

// Data
// Data
const IMAGES = {
    nature: [
        // Slider Images (1-10)
        ...Array.from({ length: 10 }, (_, i) => ({
            id: `n${i + 1}`,
            src: `images/Nature/${i + 1}.jpg`,
            alt: `Nature Photo ${i + 1}`
        })),
        // Featured Gallery (200-209, skipping 203)
        { id: 'n200', src: 'images/Nature/200.jpg', alt: 'Featured Nature 200' },
        { id: 'n201', src: 'images/Nature/201.jpg', alt: 'Featured Nature 201' },
        { id: 'n202', src: 'images/Nature/202.jpg', alt: 'Featured Nature 202' },
        { id: 'n204', src: 'images/Nature/204.jpg', alt: 'Featured Nature 204' },
        { id: 'n205', src: 'images/Nature/205.jpg', alt: 'Featured Nature 205' },
        { id: 'n206', src: 'images/Nature/206.jpg', alt: 'Featured Nature 206' },
        { id: 'n207', src: 'images/Nature/207.jpg', alt: 'Featured Nature 207' },
        { id: 'n208', src: 'images/Nature/208.jpg', alt: 'Featured Nature 208' },
        { id: 'n209', src: 'images/Nature/209.jpg', alt: 'Featured Nature 209' },
        // Nature Gallery (300-308)
        { id: 'n300', src: 'images/Nature/300.jpg', alt: 'Nature Gallery 300' },
        { id: 'n301', src: 'images/Nature/301.jpg', alt: 'Nature Gallery 301' },
        { id: 'n302', src: 'images/Nature/302.jpg', alt: 'Nature Gallery 302' },
        { id: 'n303', src: 'images/Nature/303.jpg', alt: 'Nature Gallery 303' },
        { id: 'n304', src: 'images/Nature/304.jpg', alt: 'Nature Gallery 304' },
        { id: 'n305', src: 'images/Nature/305.jpg', alt: 'Nature Gallery 305' },
        { id: 'n306', src: 'images/Nature/306.jpg', alt: 'Nature Gallery 306' },
        { id: 'n307', src: 'images/Nature/307.jpg', alt: 'Nature Gallery 307' },
        { id: 'n308', src: 'images/Nature/308.jpg', alt: 'Nature Gallery 308' }
    ]
};

// Initialization
function initGalleryContent() {
    // Setup images
    const currentImages = IMAGES.nature;

    // Title setup
    const galleryTitle = document.querySelector('.gallery-title');
    if (galleryTitle) {
        galleryTitle.textContent = 'Nature Gallery';
        galleryTitle.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        galleryTitle.style.webkitBackgroundClip = 'text';
        galleryTitle.style.webkitTextFillColor = 'transparent';
        galleryTitle.style.backgroundClip = 'text';
    }

    // Distribute
    const sliderImgs = currentImages.slice(0, 10);
    const featuredImgs = currentImages.slice(10, 19);
    const mainImgs = currentImages.slice(19);

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
