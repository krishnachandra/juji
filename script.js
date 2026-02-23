document.addEventListener("DOMContentLoaded", () => {
    const menuBtn = document.getElementById("menuBtn");
    const navMenu = document.getElementById("navMenu");
    const navLinks = document.querySelectorAll(".nav-menu__link");

    let isMenuOpen = false;

    // Toggle Menu
    menuBtn.addEventListener("click", () => {
        if (!isMenuOpen) {
            menuBtn.classList.add("open");
            navMenu.classList.add("open");
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
        document.body.style.overflow = "auto";
        isMenuOpen = false;
    }

    // Optional: Add scroll listener for subtle parallax or header effects if needed later
    window.addEventListener("scroll", () => {
        // Example: Dim the background video slightly when scrolling down
        const scrollY = window.scrollY;
        const videoOverlay = document.querySelector('.video-overlay');
        if (videoOverlay) {
            const opacity = Math.min(0.8 + (scrollY / 1000), 0.95);
            // videoOverlay.style.background = `radial-gradient(circle at center, transparent 30%, rgba(0, 0, 0, ${opacity}) 100%)`;
        }
    });
});
