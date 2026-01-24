// Common Utilities and Classes
// Shared functionality

// Main Slider Class
class NatureSlider {
    constructor() {
        this.slides = document.querySelectorAll('.slide');
        if (this.slides.length === 0) return; // Check for slides
        this.currentSlide = 0;
        this.totalSlides = this.slides.length;
        this.autoSlideInterval = null;
        this.init();
    }

    // Initialize
    init() {
        this.createIndicators();
        this.setupNavigation();
        this.startAutoSlide();
        this.setupKeyboardNavigation();
    }

    // Create indicators
    createIndicators() {
        const indicatorsContainer = document.querySelector('.slider-indicators');
        if (!indicatorsContainer) return;
        indicatorsContainer.innerHTML = ''; // Reset content
        this.slides.forEach((_, index) => {
            const indicator = document.createElement('div');
            indicator.className = `indicator ${index === 0 ? 'active' : ''}`;
            indicator.addEventListener('click', () => this.goToSlide(index));
            indicatorsContainer.appendChild(indicator);
        });
    }

    // Navigation setup
    setupNavigation() {
        const prevBtn = document.querySelector('.slider-nav.prev');
        const nextBtn = document.querySelector('.slider-nav.next');

        if (prevBtn) prevBtn.addEventListener('click', () => this.prevSlide());
        if (nextBtn) nextBtn.addEventListener('click', () => this.nextSlide());
    }

    // Keyboard events
    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prevSlide();
            if (e.key === 'ArrowRight') this.nextSlide();
        });
    }

    // Go to slide
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

    // Next slide
    nextSlide() {
        const next = (this.currentSlide + 1) % this.totalSlides;
        this.goToSlide(next);
    }

    // Previous slide
    prevSlide() {
        const prev = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.goToSlide(prev);
    }

    // Auto slide
    startAutoSlide() {
        this.autoSlideInterval = setInterval(() => {
            this.nextSlide();
        }, 5000);
    }

    // Reset timer
    resetAutoSlide() {
        clearInterval(this.autoSlideInterval);
        this.startAutoSlide();
    }
}

// Like System
class LikeManager {
    constructor() {
        this.likedItems = new Set(JSON.parse(localStorage.getItem('likedItems') || '[]'));
        this.apiBase = 'https://api.counterapi.dev/v1/naturestudios';
        this.init();
    }

    // Initialize
    init() {
        this.setupLikeButtons();
        this.loadAllCounts();
    }

    // Setup buttons
    setupLikeButtons() {
        // Slider buttons
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

        // Gallery buttons
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

    // Load counts
    async loadAllCounts() {
        // Gather IDs
        const ids = new Set();
        document.querySelectorAll('[data-id]').forEach(el => {
            const id = el.getAttribute('data-id');
            if (id) ids.add(id);
        });

        // Fetch likes
        const idArray = Array.from(ids);

        // Parallel fetch
        idArray.forEach(id => {
            fetch(`${this.apiBase}/img_${id}/`)
                .then(res => res.json())
                .then(data => {
                    this.updateCountUI(id, data.count);
                })
                .catch(err => {
                    // Error handling
                });
        });
    }

    // Update UI
    updateCountUI(id, count) {
        document.querySelectorAll(`[data-id="${id}"] .like-count`).forEach(el => {
            const displayCount = (count || 0) + 400;
            el.textContent = displayCount > 0 ? displayCount : '';
        });
    }

    // Toggle like
    async toggleLike(id, button) {
        const isLiked = this.likedItems.has(id);
        const action = isLiked ? 'down' : 'up';

        // UI Update
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
        }
    }

    // Sync state
    syncLikeState(id) {
        // Update all buttons
        document.querySelectorAll(`[data-id="${id}"]`).forEach(btn => {
            if (this.likedItems.has(id)) {
                btn.classList.add('liked');
            } else {
                btn.classList.remove('liked');
            }
        });
    }

    // Trigger confetti
    triggerConfetti() {
        const canvas = document.getElementById('confetti-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const confettiCount = 300;
        const confetti = [];
        const colors = [
            '#25D366',
            '#128C7E',
            '#34B7F1',
            '#FFC107',
            '#FFFFFF'
        ];

        // Initialize particles
        for (let i = 0; i < confettiCount; i++) {
            confetti.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height - canvas.height,
                r: Math.random() * 8 + 4,
                d: Math.random() * confettiCount,
                color: colors[Math.floor(Math.random() * colors.length)],
                tilt: Math.floor(Math.random() * 10) - 10,
                tiltAngleIncrement: Math.random() * 0.15 + 0.08,
                tiltAngle: 0,
                speed: Math.random() * 5 + 3
            });
        }

        let animationId;
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            confetti.forEach((c, i) => {
                ctx.beginPath();
                ctx.lineWidth = c.r;
                ctx.strokeStyle = c.color;
                ctx.moveTo(c.x + c.tilt + c.r, c.y);
                ctx.lineTo(c.x + c.tilt, c.y + c.tilt + c.r * 1.5);
                ctx.stroke();
                ctx.closePath();

                c.tiltAngle += c.tiltAngleIncrement;
                // Physics
                c.y += (Math.cos(c.d) + c.speed + c.r / 2);
                c.x += Math.sin(c.tiltAngle) * 2;

                // Respawn logic
                if (c.y > canvas.height) {
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

        // Cleanup
        setTimeout(() => {
            this.stopConfetti = true;
        }, 2000);

        setTimeout(() => {
            cancelAnimationFrame(animationId);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }, 4000);
    }
}

// Scroll Utility
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

// Navigation Control
class NavigationBar {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.hamburger = document.querySelector('.hamburger');
        this.navMenu = document.querySelector('.nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.sections = document.querySelectorAll('section, #home');
        this.init();
    }

    // Initialize
    init() {
        // Scroll listener
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

        // Menu toggle
        if (this.hamburger) {
            this.hamburger.addEventListener('click', () => {
                this.hamburger.classList.toggle('active');
                this.navMenu.classList.toggle('active');
            });
        }

        // Link handling
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const targetId = link.getAttribute('href');

                // Internal links
                if (targetId.startsWith('#')) {
                    e.preventDefault();
                    const targetSection = document.querySelector(targetId);

                    if (targetSection) {
                        const offsetTop = targetId === '#home' ? 0 : targetSection.offsetTop - 80;
                        smoothScrollTo(offsetTop, 500);
                    }

                    // Active link
                    this.navLinks.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');

                    // Click outside
                    if (this.hamburger) this.hamburger.classList.remove('active');
                    if (this.navMenu) this.navMenu.classList.remove('active');
                } else {
                    // External links
                }
            });
        });

        // Click outside listener
        document.addEventListener('click', (e) => {
            if (this.navbar && !this.navbar.contains(e.target) && this.navMenu.classList.contains('active')) {
                this.hamburger.classList.remove('active');
                this.navMenu.classList.remove('active');
            }
        });
    }

    // Update active section
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

// Lightbox Modal
class ModalSlider {
    constructor() {
        this.modalOverlay = document.getElementById('modalOverlay');
        this.modalSlide = document.querySelector('.modal-slide');
        this.modalLikeBtn = document.querySelector('.modal-like-btn');
        this.currentModalIndex = 0;
        this.galleryItems = [];
        this.init();
    }

    // Initialize
    init() {
        // Navigation events
        const modalPrev = document.querySelector('.modal-nav.prev');
        const modalNext = document.querySelector('.modal-nav.next');
        const modalClose = document.querySelector('.modal-close');

        if (modalPrev) modalPrev.addEventListener('click', () => this.prevSlide());
        if (modalNext) modalNext.addEventListener('click', () => this.nextSlide());
        if (modalClose) modalClose.addEventListener('click', () => this.closeModal());

        // Overlay events
        if (this.modalOverlay) {
            this.modalOverlay.addEventListener('click', (e) => {
                if (e.target === this.modalOverlay) {
                    this.closeModal();
                }
            });
        }

        // Keyboard events
        document.addEventListener('keydown', (e) => {
            if (this.modalOverlay && this.modalOverlay.classList.contains('active')) {
                if (e.key === 'Escape') this.closeModal();
                if (e.key === 'ArrowLeft') this.prevSlide();
                if (e.key === 'ArrowRight') this.nextSlide();
            }
        });

        // Like button
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

    // Helper to extract image data
    getItemData(item) {
        const id = item.getAttribute('data-id');
        const img = item.querySelector('img');
        if (!img) return null;

        // Hi-res logic
        let highResSrc = img.src;
        if (highResSrc.includes('w=800')) {
            highResSrc = highResSrc.replace('w=800', 'w=1920');
        } else if (highResSrc.includes('w=')) {
            highResSrc = highResSrc.replace(/w=\d+/, 'w=1920');
        }

        return {
            id: id,
            src: highResSrc,
            alt: img.alt
        };
    }

    // Open modal with specific context
    openModal(itemsElements, startIndex = 0) {
        this.galleryItems = Array.from(itemsElements).map(el => this.getItemData(el)).filter(Boolean);
        this.currentModalIndex = startIndex;
        this.createModalIndicators();
        this.updateModalSlide();
        this.modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Close modal
    closeModal() {
        this.modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
        this.galleryItems = []; // Clear context
    }

    // Update slide
    updateModalSlide() {
        const item = this.galleryItems[this.currentModalIndex];
        if (!item) return;

        const img = this.modalSlide.querySelector('img');
        img.src = item.src;
        img.alt = item.alt;
        this.modalLikeBtn.setAttribute('data-id', item.id);

        // Like state
        if (window.likeManager && window.likeManager.likedItems.has(item.id)) {
            this.modalLikeBtn.classList.add('liked');
        } else {
            this.modalLikeBtn.classList.remove('liked');
        }

        // Indicator state
        const indicators = document.querySelectorAll('.modal-indicators .indicator');
        indicators.forEach((ind, i) => {
            if (i === this.currentModalIndex) {
                ind.classList.add('active');
            } else {
                ind.classList.remove('active');
            }
        });
    }

    // Next slide
    nextSlide() {
        if (this.galleryItems.length === 0) return;
        this.currentModalIndex = (this.currentModalIndex + 1) % this.galleryItems.length;
        this.updateModalSlide();
    }

    // Previous slide
    prevSlide() {
        if (this.galleryItems.length === 0) return;
        this.currentModalIndex = (this.currentModalIndex - 1 + this.galleryItems.length) % this.galleryItems.length;
        this.updateModalSlide();
    }

    // Create indicators
    createModalIndicators() {
        const indicatorsContainer = document.querySelector('.modal-indicators');
        if (!indicatorsContainer) return;
        indicatorsContainer.innerHTML = '';

        // Limit indicators if too many
        if (this.galleryItems.length > 20) return;

        this.galleryItems.forEach((_, index) => {
            const indicator = document.createElement('div');
            indicator.className = `indicator ${index === this.currentModalIndex ? 'active' : ''}`;
            indicator.addEventListener('click', () => {
                this.currentModalIndex = index;
                this.updateModalSlide();
            });
            indicatorsContainer.appendChild(indicator);
        });
    }
}

// Gallery Click Handlers
function setupGalleryClicks() {
    document.querySelectorAll('.gallery-item').forEach((item) => {
        item.addEventListener('click', (e) => {
            if (!e.target.closest('.gallery-like-btn')) {
                if (window.modalSlider) {
                    // Identify the container (grid) to scope the gallery
                    const container = item.closest('.gallery-grid');
                    if (container) {
                        // Users request: "only images on the displayed"
                        // We interpret this as "visible items only", respecting pagination.
                        const visibleSiblings = Array.from(container.querySelectorAll('.gallery-item')).filter(el => {
                            return !el.classList.contains('hidden') && el.offsetParent !== null;
                        });

                        const index = visibleSiblings.indexOf(item);

                        if (index !== -1) {
                            window.modalSlider.openModal(visibleSiblings, index);
                        }
                    }
                }
            }
        });
    });
}

// Pagination System
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

    // Initialize
    init() {
        this.renderPagination();
        this.showPage(1);
        this.setupEventListeners();
    }

    // Event listeners
    setupEventListeners() {
        const prevBtn = this.pagination.querySelector('.prev-page');
        const nextBtn = this.pagination.querySelector('.next-page');

        if (prevBtn) prevBtn.addEventListener('click', () => this.prevPage());
        if (nextBtn) nextBtn.addEventListener('click', () => this.nextPage());
    }

    // Show page
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

    // Prev page
    prevPage() {
        if (this.currentPage > 1) {
            this.showPage(this.currentPage - 1);
        }
    }

    // Next page
    nextPage() {
        if (this.currentPage < this.totalPages) {
            this.showPage(this.currentPage + 1);
        }
    }

    // Update buttons
    updatePaginationButtons() {
        const prevBtn = this.pagination.querySelector('.prev-page');
        const nextBtn = this.pagination.querySelector('.next-page');

        if (prevBtn) prevBtn.disabled = this.currentPage === 1;
        if (nextBtn) nextBtn.disabled = this.currentPage === this.totalPages;
    }

    // Render pagination
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

        // Page 1
        if (startPage > 1) {
            this.createPageNumber(numbersContainer, 1);
            if (startPage > 2) {
                this.createEllipsis(numbersContainer);
            }
        }

        // Number links
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

    // Create number
    createPageNumber(container, pageNum) {
        const number = document.createElement('button');
        number.className = `pagination-number ${pageNum === this.currentPage ? 'active' : ''}`;
        number.textContent = pageNum;
        number.addEventListener('click', () => this.showPage(pageNum));
        container.appendChild(number);
    }

    // Create ellipsis
    createEllipsis(container) {
        const ellipsis = document.createElement('span');
        ellipsis.className = 'pagination-ellipsis';
        ellipsis.textContent = '...';
        container.appendChild(ellipsis);
    }
}

// Canvas Resize Handler
document.addEventListener('DOMContentLoaded', () => {
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

// Service Worker Registration
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
