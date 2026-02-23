document.addEventListener("DOMContentLoaded", () => {
    // --- 1. Video Playback Control ---
    const heroVideo = document.getElementById("heroVideo");
    const videoControlBtn = document.getElementById("videoControl");

    if (heroVideo) {
        // Essential for the slow-mo cinematic feel requested (e.g. 120fps -> ~30fps feel)
        heroVideo.playbackRate = 0.25;

        // Smooth fade-in once data is loaded to transition from poster image
        heroVideo.addEventListener('loadeddata', () => {
            heroVideo.classList.remove('loading');
        });

        // Accessibility: Play/Pause
        videoControlBtn.addEventListener("click", () => {
            const isPlaying = !heroVideo.paused;
            const pauseIcon = videoControlBtn.querySelector('.icon-pause');
            const playIcon = videoControlBtn.querySelector('.icon-play');

            if (isPlaying) {
                heroVideo.pause();
                videoControlBtn.setAttribute('aria-pressed', 'true');
                pauseIcon.style.display = 'none';
                playIcon.style.display = 'inline';
            } else {
                heroVideo.play();
                videoControlBtn.setAttribute('aria-pressed', 'false');
                pauseIcon.style.display = 'inline';
                playIcon.style.display = 'none';
            }
        });
    }

    // --- 2. Accessible Full-Screen Modal Menu ---
    const menuToggle = document.getElementById("menuToggle");
    const modalMenu = document.getElementById("modalMenu");
    const modalLinks = document.querySelectorAll(".modal-link");

    function toggleMenu() {
        const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
        menuToggle.setAttribute("aria-expanded", !isExpanded);
        modalMenu.setAttribute("aria-hidden", isExpanded);

        // Trap focus or manage tabindex if you wanted fully strict a11y,
        // but for this visual layout, basic toggling is sufficient here.
    }

    menuToggle.addEventListener("click", toggleMenu);

    modalLinks.forEach(link => {
        link.addEventListener("click", () => {
            // Close menu on navigation
            menuToggle.setAttribute("aria-expanded", "false");
            modalMenu.setAttribute("aria-hidden", "true");
        });
    });

    // --- 3. Parallax effect and Film Flicker on Scroll ---
    const scrollContainer = document.querySelector(".scroll-container");
    const videoContainer = document.getElementById("videoContainer");

    let lastScrollY = 0;
    let ticking = false;

    scrollContainer.addEventListener('scroll', () => {
        lastScrollY = scrollContainer.scrollTop;

        if (!ticking) {
            window.requestAnimationFrame(() => {
                // Parallax the video background slightly slower than the scroll speed
                if (videoContainer) {
                    const yPos = -(lastScrollY * 0.3);
                    videoContainer.style.transform = `translate3d(0, ${yPos}px, 0)`;
                }

                // Trigger a film flicker class if crossing the snap threshold
                const viewportHeight = window.innerHeight;
                if (lastScrollY > viewportHeight * 0.1 && lastScrollY < viewportHeight * 0.9) {
                    document.body.classList.add('film-flicker');
                    // Remove immediately after animation completes to reset
                    setTimeout(() => document.body.classList.remove('film-flicker'), 300);
                }

                ticking = false;
            });
            ticking = true;
        }
    });

});
