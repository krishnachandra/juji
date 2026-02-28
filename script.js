document.addEventListener("DOMContentLoaded", () => {
    const menuBtn = document.getElementById("menuBtn");
    const navMenu = document.getElementById("navMenu");
    const navLinks = document.querySelectorAll(".nav-menu__link");
    const headerLeft = document.querySelector(".header-center-menu");

    let isMenuOpen = false;

    // Toggle Menu
    menuBtn.addEventListener("click", () => {
        if (!isMenuOpen) {
            menuBtn.classList.add("open");
            navMenu.classList.add("open");
            if (headerLeft) headerLeft.classList.add("hidden-menu-active");
            document.body.style.overflow = "hidden"; // Prevent scrolling when menu is open
            isMenuOpen = true;
        } else {
            closeMenu();
        }
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            closeMenu();
        });
    });

    function closeMenu() {
        menuBtn.classList.remove("open");
        navMenu.classList.remove("open");
        if (headerLeft) headerLeft.classList.remove("hidden-menu-active");
        document.body.style.overflow = "auto";
        isMenuOpen = false;
    }

    // Pill Menu Active State Selection
    const pillLinks = document.querySelectorAll(".header-center-menu ul li a");
    pillLinks.forEach(link => {
        link.addEventListener("click", function () {
            // Remove active from all
            pillLinks.forEach(l => l.classList.remove("active"));
            // Add active to the clicked one
            this.classList.add("active");
        });
    });

    // Optional: Add scroll listener for subtle parallax or header effects if needed later
    window.addEventListener("scroll", () => {
        const scrollY = window.scrollY;
        // Example: Dim the background video slightly when scrolling down
        const videoOverlay = document.querySelector('.video-overlay');
        if (videoOverlay) {
            const opacity = Math.min(0.8 + (scrollY / 1000), 0.95);
            // videoOverlay.style.background = `radial-gradient(circle at center, transparent 30%, rgba(0, 0, 0, ${opacity}) 100%)`;
        }
    });

    // Static Noise Flicker on Hero Title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        // Wait 2 seconds before starting the flicker loop
        setTimeout(() => {
            setInterval(() => {
                // Quick double-flicker burst
                heroTitle.classList.add('flicker');
                setTimeout(() => {
                    heroTitle.classList.remove('flicker');
                    setTimeout(() => {
                        heroTitle.classList.add('flicker');
                        setTimeout(() => {
                            heroTitle.classList.remove('flicker');
                        }, 60);
                    }, 80);
                }, 60);
            }, 1500); // Every 1.5 seconds
        }, 2000);
    }

    // Background Carousel Logic
    const carouselImages = document.querySelectorAll('.carousel-bg');
    const indicators = document.querySelectorAll('.carousel-indicators .indicator');
    const progressBar = document.querySelector('.carousel-progress-bar');

    if (carouselImages.length > 0) {
        let currentImageIndex = 0;
        let carouselInterval;

        const updateCarousel = (newIndex) => {
            // Remove active class from current
            carouselImages[currentImageIndex].classList.remove('active');
            if (indicators.length > 0) indicators[currentImageIndex].classList.remove('active');

            // Update index
            currentImageIndex = newIndex;

            // BOURNE SHAKE Trigger
            const targetSlide = carouselImages[currentImageIndex];
            targetSlide.classList.remove('shake');
            void targetSlide.offsetWidth; // Force browser reflow to restart animation
            targetSlide.classList.add('shake');
            setTimeout(() => {
                targetSlide.classList.remove('shake');
            }, 400);

            // Add active class to new
            targetSlide.classList.add('active');
            if (indicators.length > 0) indicators[currentImageIndex].classList.add('active');

            if (progressBar) {
                // Reset progress bar instantly
                progressBar.style.transition = 'none';
                progressBar.style.width = '0%';

                // Force browser reflow to apply the reset instantly
                void progressBar.offsetWidth;

                // Start filling over 4 seconds
                progressBar.style.transition = 'width 4s linear';
                progressBar.style.width = '100%';
            }
        };

        const startCarousel = () => {
            carouselInterval = setInterval(() => {
                const nextIndex = (currentImageIndex + 1) % carouselImages.length;
                updateCarousel(nextIndex);
            }, 4000); // 4000ms = 4 seconds
        };

        // Initialize click events for indicators
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                clearInterval(carouselInterval); // Stop auto-rotation when user interacts
                updateCarousel(index);
                startCarousel(); // Restart interval
            });
        });

        // Initialize progress bar width on first load
        if (progressBar) {
            progressBar.style.transition = 'none';
            progressBar.style.width = '0%';
            void progressBar.offsetWidth;
            progressBar.style.transition = 'width 4s linear';
            progressBar.style.width = '100%';
        }

        startCarousel();
    }
});
