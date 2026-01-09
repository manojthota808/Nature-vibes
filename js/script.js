// Gallery Data
const IMAGES = {
    yeshu: Array.from({ length: 17 }, (_, i) => ({
        id: i + 1,
        src: `images/Yeshu/${i + 1}.jpg`,
        alt: `Baby Photo ${i + 1}`
    })),
    nature: [
        { id: 'n1', src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80', alt: 'Mountain Landscape' },
        { id: 'n2', src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80', alt: 'Forest Path' },
        { id: 'n3', src: 'https://images.unsplash.com/photo-1511497584788-876760111969?w=800&q=80', alt: 'Ocean Waves' },
        { id: 'n4', src: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80', alt: 'Sunset Mountains' },
        { id: 'n5', src: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800&q=80', alt: 'Waterfall' },
        { id: 'n6', src: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800&q=80', alt: 'Desert Landscape' },
        { id: 'n7', src: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&q=80', alt: 'Lake Reflection' },
        { id: 'n8', src: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&q=80', alt: 'Ocean Sunset' },
        { id: 'n9', src: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&q=80', alt: 'Mountain Peak' },
        { id: 'n10', src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80', alt: 'Forest Stream' },
        { id: 'n11', src: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&q=80', alt: 'Misty Forest' },
        { id: 'n12', src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80', alt: 'Mountain Range' },
        { id: 'n13', src: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&q=80', alt: 'Highland Cattle' },
        { id: 'n14', src: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80', alt: 'Field Sunset' },
        { id: 'n15', src: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=800&q=80', alt: 'Dark Forest' },
        { id: 'n16', src: 'https://images.unsplash.com/photo-1516216628859-9bccecab13ca?w=800&q=80', alt: 'Stone Texture' },
        { id: 'n17', src: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=800&q=80', alt: 'Bridge Nature' },
        { id: 'n18', src: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=800&q=80', alt: 'Tree Life' },
        { id: 'n19', src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80', alt: 'Forest Path Repeat' },
        { id: 'n20', src: 'https://images.unsplash.com/photo-1511497584788-876760111969?w=800&q=80', alt: 'Ocean Waves Repeat' },
        { id: 'n21', src: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80', alt: 'Sunset Mountains Repeat' },
        { id: 'n22', src: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800&q=80', alt: 'Waterfall Repeat' },
        { id: 'n23', src: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800&q=80', alt: 'Desert Landscape Repeat' },
        { id: 'n24', src: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&q=80', alt: 'Lake Reflection Repeat' },
        { id: 'n25', src: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&q=80', alt: 'Ocean Sunset Repeat' },
        { id: 'n26', src: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&q=80', alt: 'Mountain Peak Repeat' },
        { id: 'n27', src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80', alt: 'Forest Stream Repeat' },
        { id: 'n28', src: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&q=80', alt: 'Misty Forest Repeat' },
        { id: 'n29', src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80', alt: 'Mountain Range Repeat' },
        { id: 'n30', src: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&q=80', alt: 'Highland Cattle Repeat' }
    ]
};

// Application State
let currentImages = [];

// Initialize Content
function initGalleryContent() {
    // Get gallery type from hash (e.g. #yeshu or #nature) or default to yeshu
    // Remove the '#' character if present
    const hash = window.location.hash.replace('#', '');
    // Allow valid gallery types, fallback to 'yeshu'
    const galleryType = (['yeshu', 'nature'].includes(hash)) ? hash : 'yeshu';

    // Update Nav Links
    document.querySelectorAll('.gallery-nav-link').forEach(link => link.classList.remove('active'));
    const activeLink = document.getElementById(`link-${galleryType}`);
    if (activeLink) activeLink.classList.add('active');

    // Get Images
    currentImages = IMAGES[galleryType] || IMAGES.yeshu;

    // Update Gallery Title Color and Text
    const galleryTitle = document.querySelector('.gallery-title');
    if (galleryTitle) {
        if (galleryType === 'yeshu') {
            galleryTitle.textContent = 'Yeshu Gallery';
            galleryTitle.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
            galleryTitle.style.webkitBackgroundClip = 'text';
            galleryTitle.style.webkitTextFillColor = 'transparent';
            galleryTitle.style.backgroundClip = 'text';
        } else if (galleryType === 'nature') {
            galleryTitle.textContent = 'Nature Gallery';
            galleryTitle.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
            galleryTitle.style.webkitBackgroundClip = 'text';
            galleryTitle.style.webkitTextFillColor = 'transparent';
            galleryTitle.style.backgroundClip = 'text';
        } else {
            // Fallback or other future galleries
            galleryTitle.style.background = 'none';
            galleryTitle.style.webkitTextFillColor = 'white';
            galleryTitle.style.color = 'white';
        }
    }

    // Distribute Images
    let sliderImgs, featuredImgs, mainImgs;

    if (currentImages.length <= 5) {
        sliderImgs = currentImages;
        featuredImgs = [];
        mainImgs = [];
    } else if (galleryType === 'nature') {
        // Nature Distribution
        sliderImgs = currentImages.slice(0, 5);
        featuredImgs = currentImages.slice(5, 17);
        mainImgs = currentImages.slice(17);
    } else {
        // Default Distribution
        sliderImgs = currentImages.slice(0, 5);
        featuredImgs = currentImages.slice(5, 11);
        mainImgs = currentImages.slice(11);
    }

    // Populate Slider
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

    // Helper for gallery item
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

    // Populate Featured
    const featuredGrid = document.getElementById('featured-gallery-grid');
    if (featuredGrid) {
        featuredGrid.innerHTML = featuredImgs.map(createGalleryItem).join('');
        const section = featuredGrid.closest('.homepage-gallery');
        if (section) section.style.display = featuredImgs.length ? 'block' : 'none';
    }

    // Populate Main
    const mainGrid = document.getElementById('main-gallery-grid');
    if (mainGrid) {
        mainGrid.innerHTML = mainImgs.map(createGalleryItem).join('');
        const section = mainGrid.closest('.gallery-section');
        if (section) section.style.display = mainImgs.length ? 'block' : 'none';
    }
}

// Init
// Init call moved to DOMContentLoaded

// Classes

// Nature Slider
class NatureSlider {
    constructor() {
        this.slides = document.querySelectorAll('.slide');
        if (this.slides.length === 0) return; // Guard clause
        this.currentSlide = 0;
        this.totalSlides = this.slides.length;
        this.autoSlideInterval = null;
        this.init();
    }

    init() {
        this.createIndicators();
        this.setupNavigation();
        this.startAutoSlide();
        this.setupKeyboardNavigation();
    }

    createIndicators() {
        const indicatorsContainer = document.querySelector('.slider-indicators');
        if (!indicatorsContainer) return;
        indicatorsContainer.innerHTML = ''; // Clear existing
        this.slides.forEach((_, index) => {
            const indicator = document.createElement('div');
            indicator.className = `indicator ${index === 0 ? 'active' : ''}`;
            indicator.addEventListener('click', () => this.goToSlide(index));
            indicatorsContainer.appendChild(indicator);
        });
    }

    setupNavigation() {
        const prevBtn = document.querySelector('.slider-nav.prev');
        const nextBtn = document.querySelector('.slider-nav.next');

        if (prevBtn) prevBtn.addEventListener('click', () => this.prevSlide());
        if (nextBtn) nextBtn.addEventListener('click', () => this.nextSlide());
    }

    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prevSlide();
            if (e.key === 'ArrowRight') this.nextSlide();
        });
    }

    goToSlide(index) {
        if (!this.slides[this.currentSlide]) return;
        this.slides[this.currentSlide].classList.remove('active');

        const indicators = document.querySelectorAll('.slider-indicators .indicator');
        if (indicators[this.currentSlide]) indicators[this.currentSlide].classList.remove('active');

        this.currentSlide = index;
        if (this.slides[this.currentSlide]) this.slides[this.currentSlide].classList.add('active');
        if (indicators[this.currentSlide]) indicators[this.currentSlide].classList.add('active');

        this.resetAutoSlide();
    }

    nextSlide() {
        const next = (this.currentSlide + 1) % this.totalSlides;
        this.goToSlide(next);
    }

    prevSlide() {
        const prev = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.goToSlide(prev);
    }

    startAutoSlide() {
        this.autoSlideInterval = setInterval(() => {
            this.nextSlide();
        }, 5000);
    }

    resetAutoSlide() {
        clearInterval(this.autoSlideInterval);
        this.startAutoSlide();
    }
}

// Like functionality
class LikeManager {
    constructor() {
        this.likedItems = new Set(JSON.parse(localStorage.getItem('likedItems') || '[]'));
        this.apiBase = 'https://api.counterapi.dev/v1/naturestudios';
        this.init();
    }

    init() {
        this.setupLikeButtons();
        this.loadAllCounts();
    }

    setupLikeButtons() {
        // Initialize slider like buttons
        document.querySelectorAll('.like-btn').forEach(btn => {
            const id = btn.getAttribute('data-id');
            if (this.likedItems.has(id)) {
                btn.classList.add('liked');
            }
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.toggleLike(id, btn);
            });
        });

        // Initialize gallery like buttons
        document.querySelectorAll('.gallery-like-btn').forEach(btn => {
            const id = btn.getAttribute('data-id');
            if (this.likedItems.has(id)) {
                btn.classList.add('liked');
            }
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.toggleLike(id, btn);
            });
        });
    }

    async loadAllCounts() {
        // Collect all IDs
        const ids = new Set();
        document.querySelectorAll('[data-id]').forEach(el => {
            const id = el.getAttribute('data-id');
            if (id) ids.add(id);
        });

        // We have to fetch one by one as the API doesn't support bulk.
        // To avoid unresponsiveness, we'll fetch them lazily or in parallel batches.
        const idArray = Array.from(ids);

        // Simple parallel fetch
        idArray.forEach(id => {
            fetch(`${this.apiBase}/img_${id}/`)
                .then(res => res.json())
                .then(data => {
                    this.updateCountUI(id, data.count);
                })
                .catch(err => {
                    // console.error(err); // Silence errors
                });
        });
    }

    updateCountUI(id, count) {
        document.querySelectorAll(`[data-id="${id}"] .like-count`).forEach(el => {
            el.textContent = count > 0 ? count : '';
        });
    }

    async toggleLike(id, button) {
        const isLiked = this.likedItems.has(id);
        const action = isLiked ? 'down' : 'up';

        // Optimistic UI Update
        if (isLiked) {
            this.likedItems.delete(id);
            button.classList.remove('liked');
        } else {
            this.likedItems.add(id);
            button.classList.add('liked');
            this.triggerConfetti();
        }

        this.syncLikeState(id);
        localStorage.setItem('likedItems', JSON.stringify([...this.likedItems]));

        // API Call
        try {
            const res = await fetch(`${this.apiBase}/img_${id}/${action}`);
            const data = await res.json();
            this.updateCountUI(id, data.count);
        } catch (err) {
            console.error('Failed to update like count', err);
            // Revert on serious failure? For now, keep optimistic state to avoid flickering.
        }
    }

    syncLikeState(id) {
        // Update all like buttons with the same id (including modal)
        document.querySelectorAll(`[data-id="${id}"]`).forEach(btn => {
            if (this.likedItems.has(id)) {
                btn.classList.add('liked');
            } else {
                btn.classList.remove('liked');
            }
        });
    }

    triggerConfetti() {
        const canvas = document.getElementById('confetti-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const confettiCount = 300;
        const confetti = [];
        const colors = [
            '#25D366', // WhatsApp Light Green
            '#128C7E', // WhatsApp Teal
            '#34B7F1', // WhatsApp Blue
            '#FFC107', // Amber/Gold (common in emojis)
            '#FFFFFF'  // White
        ];

        // Create confetti particles
        for (let i = 0; i < confettiCount; i++) {
            confetti.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height - canvas.height,
                r: Math.random() * 8 + 4, // Larger particles
                d: Math.random() * confettiCount,
                color: colors[Math.floor(Math.random() * colors.length)],
                tilt: Math.floor(Math.random() * 10) - 10,
                tiltAngleIncrement: Math.random() * 0.15 + 0.08, // Faster rotation
                tiltAngle: 0,
                speed: Math.random() * 5 + 3 // Individual speed base
            });
        }

        let animationId;
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            confetti.forEach((c, i) => {
                ctx.beginPath();
                ctx.lineWidth = c.r; // Scale line width with radius
                ctx.strokeStyle = c.color;
                ctx.moveTo(c.x + c.tilt + c.r, c.y);
                ctx.lineTo(c.x + c.tilt, c.y + c.tilt + c.r * 1.5); // Longer strips
                ctx.stroke();
                ctx.closePath();

                c.tiltAngle += c.tiltAngleIncrement;
                // Faster gravity/fall speed
                c.y += (Math.cos(c.d) + c.speed + c.r / 2);
                // Swaying
                c.x += Math.sin(c.tiltAngle) * 2;

                // Respawn at top if still going
                if (c.y > canvas.height) {
                    // Only respawn if we haven't stopped yet (controlled by timeout)
                    if (!this.stopConfetti) {
                        confetti[i] = {
                            x: Math.random() * canvas.width,
                            y: -20,
                            r: c.r,
                            d: c.d,
                            color: c.color,
                            tilt: Math.floor(Math.random() * 10) - 10,
                            tiltAngleIncrement: c.tiltAngleIncrement,
                            tiltAngle: c.tiltAngle,
                            speed: c.speed
                        };
                    }
                }
            });

            animationId = requestAnimationFrame(animate);
        };

        this.stopConfetti = false;
        animate();

        // Stop respawning after 2 seconds
        setTimeout(() => {
            this.stopConfetti = true;
        }, 2000);

        // Fully clear after 4 seconds to ensure clean up
        setTimeout(() => {
            cancelAnimationFrame(animationId);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }, 4000);
    }
}

// Smooth Scroll
function smoothScrollTo(target, duration = 600) {
    const start = window.pageYOffset;
    const distance = target - start;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = easeInOutCubic(timeElapsed, start, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        } else {
            window.scrollTo(0, target);
        }
    }

    function easeInOutCubic(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t * t + b;
        t -= 2;
        return c / 2 * (t * t * t + 2) + b;
    }

    requestAnimationFrame(animation);
}

// Navigation Bar functionality
class NavigationBar {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.hamburger = document.querySelector('.hamburger');
        this.navMenu = document.querySelector('.nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.sections = document.querySelectorAll('section, #home');
        this.init();
    }

    init() {
        // Scroll Effect
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    if (window.scrollY > 50) {
                        this.navbar.classList.add('scrolled');
                    } else {
                        this.navbar.classList.remove('scrolled');
                    }
                    this.updateActiveSection();
                    ticking = false;
                });
                ticking = true;
            }
        });

        // Mobile menu toggle
        if (this.hamburger) {
            this.hamburger.addEventListener('click', () => {
                this.hamburger.classList.toggle('active');
                this.navMenu.classList.toggle('active');
            });
        }

        // Fast smooth scroll for navigation links
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);

                if (targetSection) {
                    const offsetTop = targetId === '#home' ? 0 : targetSection.offsetTop - 80;
                    smoothScrollTo(offsetTop, 500);
                }

                // Update active link
                this.navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');

                // Close mobile menu
                if (this.hamburger) this.hamburger.classList.remove('active');
                if (this.navMenu) this.navMenu.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (this.navbar && !this.navbar.contains(e.target) && this.navMenu.classList.contains('active')) {
                this.hamburger.classList.remove('active');
                this.navMenu.classList.remove('active');
            }
        });
    }

    updateActiveSection() {
        const scrollPos = window.scrollY + 100;

        this.sections.forEach(section => {
            const top = section.offsetTop;
            const bottom = top + section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos < bottom) {
                this.navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
}

// Modal Lightbox Slider
class ModalSlider {
    constructor() {
        this.modalOverlay = document.getElementById('modalOverlay');
        this.modalSlide = document.querySelector('.modal-slide');
        this.modalLikeBtn = document.querySelector('.modal-like-btn');
        this.currentModalIndex = 0;
        this.galleryItems = [];
        this.init();
    }

    init() {
        // Get Gallery Images
        const allItems = [
            ...document.querySelectorAll('.slide'),
            ...document.querySelectorAll('.gallery-item')
        ];

        const seenIds = new Set();

        allItems.forEach(item => {
            const id = item.getAttribute('data-id');
            if (seenIds.has(id)) return;
            seenIds.add(id);

            const img = item.querySelector('img');
            if (!img) return;

            // Get high resolution image
            let highResSrc = img.src;
            if (highResSrc.includes('w=800')) {
                highResSrc = highResSrc.replace('w=800', 'w=1920');
            } else if (highResSrc.includes('w=')) {
                highResSrc = highResSrc.replace(/w=\d+/, 'w=1920');
            }
            this.galleryItems.push({
                id: id,
                src: highResSrc,
                alt: img.alt
            });
        });

        // Setup modal navigation
        const modalPrev = document.querySelector('.modal-nav.prev');
        const modalNext = document.querySelector('.modal-nav.next');
        const modalClose = document.querySelector('.modal-close');

        if (modalPrev) modalPrev.addEventListener('click', () => this.prevSlide());
        if (modalNext) modalNext.addEventListener('click', () => this.nextSlide());
        if (modalClose) modalClose.addEventListener('click', () => this.closeModal());

        // Close on overlay click
        if (this.modalOverlay) {
            this.modalOverlay.addEventListener('click', (e) => {
                if (e.target === this.modalOverlay) {
                    this.closeModal();
                }
            });
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (this.modalOverlay && this.modalOverlay.classList.contains('active')) {
                if (e.key === 'Escape') this.closeModal();
                if (e.key === 'ArrowLeft') this.prevSlide();
                if (e.key === 'ArrowRight') this.nextSlide();
            }
        });

        // Create modal indicators
        this.createModalIndicators();

        // Setup modal like button
        if (this.modalLikeBtn) {
            this.modalLikeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const id = this.modalLikeBtn.getAttribute('data-id');
                if (window.likeManager) {
                    window.likeManager.toggleLike(id, this.modalLikeBtn);
                }
            });
        }
    }

    openModal(index) {
        this.currentModalIndex = index;
        this.updateModalSlide();
        this.modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        this.modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    updateModalSlide() {
        const item = this.galleryItems[this.currentModalIndex];
        if (!item) return;

        const img = this.modalSlide.querySelector('img');
        img.src = item.src;
        img.alt = item.alt;
        this.modalLikeBtn.setAttribute('data-id', item.id);

        // Update like button state
        if (window.likeManager && window.likeManager.likedItems.has(item.id)) {
            this.modalLikeBtn.classList.add('liked');
        } else {
            this.modalLikeBtn.classList.remove('liked');
        }

        // Update indicators
        document.querySelectorAll('.modal-indicators .indicator').forEach((ind, i) => {
            ind.classList.toggle('active', i === this.currentModalIndex);
        });
    }

    nextSlide() {
        this.currentModalIndex = (this.currentModalIndex + 1) % this.galleryItems.length;
        this.updateModalSlide();
    }

    prevSlide() {
        this.currentModalIndex = (this.currentModalIndex - 1 + this.galleryItems.length) % this.galleryItems.length;
        this.updateModalSlide();
    }

    createModalIndicators() {
        const indicatorsContainer = document.querySelector('.modal-indicators');
        if (!indicatorsContainer) return;
        indicatorsContainer.innerHTML = '';

        this.galleryItems.forEach((_, index) => {
            const indicator = document.createElement('div');
            indicator.className = `indicator ${index === 0 ? 'active' : ''}`;
            indicator.addEventListener('click', () => {
                this.currentModalIndex = index;
                this.updateModalSlide();
            });
            indicatorsContainer.appendChild(indicator);
        });
    }
}

// Gallery item click to open modal
function setupGalleryClicks() {
    document.querySelectorAll('.gallery-item').forEach((item) => {
        item.addEventListener('click', (e) => {
            if (!e.target.closest('.gallery-like-btn')) {
                if (window.modalSlider) {
                    const id = item.getAttribute('data-id');
                    // Find correct index based on data-id
                    const correctIndex = window.modalSlider.galleryItems.findIndex(gi => gi.id === id);
                    if (correctIndex !== -1) {
                        window.modalSlider.openModal(correctIndex);
                    }
                }
            }
        });
    });
}

// Gallery Pagination
class GalleryPagination {
    constructor(gallerySelector, paginationSelector, itemsPerPage = 6) {
        this.gallery = document.querySelector(gallerySelector);
        this.pagination = document.querySelector(paginationSelector);
        if (!this.gallery || !this.pagination) return;

        this.items = Array.from(this.gallery.querySelectorAll('.gallery-item'));
        this.itemsPerPage = itemsPerPage;
        this.currentPage = 1;
        this.totalPages = Math.ceil(this.items.length / this.itemsPerPage);
        this.init();
    }

    init() {
        this.renderPagination();
        this.showPage(1);
        this.setupEventListeners();
    }

    setupEventListeners() {
        const prevBtn = this.pagination.querySelector('.prev-page');
        const nextBtn = this.pagination.querySelector('.next-page');

        if (prevBtn) prevBtn.addEventListener('click', () => this.prevPage());
        if (nextBtn) nextBtn.addEventListener('click', () => this.nextPage());
    }

    showPage(page) {
        this.currentPage = Math.max(1, Math.min(page, this.totalPages));

        this.items.forEach((item, index) => {
            const pageStart = (this.currentPage - 1) * this.itemsPerPage;
            const pageEnd = pageStart + this.itemsPerPage;

            if (index >= pageStart && index < pageEnd) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        });

        this.updatePaginationButtons();
        this.renderPagination();
    }

    prevPage() {
        if (this.currentPage > 1) {
            this.showPage(this.currentPage - 1);
        }
    }

    nextPage() {
        if (this.currentPage < this.totalPages) {
            this.showPage(this.currentPage + 1);
        }
    }

    updatePaginationButtons() {
        const prevBtn = this.pagination.querySelector('.prev-page');
        const nextBtn = this.pagination.querySelector('.next-page');

        if (prevBtn) prevBtn.disabled = this.currentPage === 1;
        if (nextBtn) nextBtn.disabled = this.currentPage === this.totalPages;
    }

    renderPagination() {
        const numbersContainer = this.pagination.querySelector('.pagination-numbers');
        if (!numbersContainer) return;
        numbersContainer.innerHTML = '';

        if (this.totalPages <= 1) {
            return;
        }

        const maxVisible = 5;
        let startPage = Math.max(1, this.currentPage - Math.floor(maxVisible / 2));
        let endPage = Math.min(this.totalPages, startPage + maxVisible - 1);

        if (endPage - startPage < maxVisible - 1) {
            startPage = Math.max(1, endPage - maxVisible + 1);
        }

        // First page
        if (startPage > 1) {
            this.createPageNumber(numbersContainer, 1);
            if (startPage > 2) {
                this.createEllipsis(numbersContainer);
            }
        }

        // Page numbers
        for (let i = startPage; i <= endPage; i++) {
            this.createPageNumber(numbersContainer, i);
        }

        // Last page
        if (endPage < this.totalPages) {
            if (endPage < this.totalPages - 1) {
                this.createEllipsis(numbersContainer);
            }
            this.createPageNumber(numbersContainer, this.totalPages);
        }
    }

    createPageNumber(container, pageNum) {
        const number = document.createElement('button');
        number.className = `pagination-number ${pageNum === this.currentPage ? 'active' : ''}`;
        number.textContent = pageNum;
        number.addEventListener('click', () => this.showPage(pageNum));
        container.appendChild(number);
    }

    createEllipsis(container) {
        const ellipsis = document.createElement('span');
        ellipsis.className = 'pagination-ellipsis';
        ellipsis.textContent = '...';
        container.appendChild(ellipsis);
    }
}

// Handle hash changes for gallery switching
window.addEventListener('hashchange', () => {
    // Re-initialize content when hash changes (e.g. clicking links or back button)
    initGalleryContent();
    // Scroll to top or specific section if needed
    // window.scrollTo(0, 0); 
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Check for legacy query params and migrate
    const params = new URLSearchParams(window.location.search);
    if (params.has('gallery')) {
        const gallery = params.get('gallery');
        // Clear query params and set hash
        // Use replaceState to clear the query string from the URL bar without reloading
        const newUrl = `${window.location.pathname}#${gallery}`;
        window.history.replaceState({}, '', newUrl);
    }

    // Initialize gallery content
    initGalleryContent();
    window.natureSlider = new NatureSlider();
    window.likeManager = new LikeManager();
    window.navigationBar = new NavigationBar();
    window.modalSlider = new ModalSlider();

    // Setup gallery clicks after modal slider is initialized
    setupGalleryClicks();

    // Initialize pagination for both galleries
    // We check if grids have items first
    if (document.querySelector('.homepage-gallery .gallery-grid')) {
        window.featuredGalleryPagination = new GalleryPagination('.homepage-gallery .gallery-grid', '.homepage-gallery .pagination', 6);
    }
    if (document.querySelector('.gallery-section .gallery-grid')) {
        window.natureGalleryPagination = new GalleryPagination('.gallery-section .gallery-grid', '.gallery-section .pagination', 6);
    }

    // Update LikeManager to handle modal like buttons
    const originalSyncLikeState = window.likeManager.syncLikeState.bind(window.likeManager);
    window.likeManager.syncLikeState = function (id) {
        originalSyncLikeState(id);
        // Also update modal like button if modal is open
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

    // Handle window resize for confetti canvas
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            const canvas = document.getElementById('confetti-canvas');
            if (canvas) {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            }
        }, 100);
    });
});

// Register Service Worker for Image Caching
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(registration => {
                console.log('ServiceWorker registration successful with scope: ', registration.scope);
            })
            .catch(error => {
                console.log('ServiceWorker registration failed: ', error);
            });
    });
}
