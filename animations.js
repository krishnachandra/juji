const sliderState = {
    'slider-1': 0,
    'slider-2': 0,
    'slider-3': 0
};

function nextSlide(sliderId, transitionType) {
    const viewport = document.getElementById(sliderId);
    if (!viewport) return;

    // Find all slides inside this specific slider
    const slides = Array.from(viewport.querySelectorAll('.slide'));
    if (slides.length === 0) return;

    // Get current and next indices
    let currentIndex = sliderState[sliderId];
    let nextIndex = (currentIndex + 1) % slides.length;

    const currentSlide = slides[currentIndex];
    const targetSlide = slides[nextIndex];

    // Remove active state from current completely
    currentSlide.classList.remove('active');

    // Handle specific action-film transitions
    if (transitionType === 'bourne') {
        /* BOURNE SHAKE: Fast switch, chaotic shake on arrival */
        targetSlide.classList.remove('shake');
        void targetSlide.offsetWidth; // Trigger reflow to restart animation
        targetSlide.classList.add('shake');
        targetSlide.classList.add('active');

    } else if (transitionType === 'expendable') {
        /* EXPENDABLE: Heavy 2-second crossfade dissolving */
        targetSlide.classList.add('active');

    } else if (transitionType === 'quickcut') {
        /* QUICK CUT: Hard snap + RGB chromatic abberation burst */
        targetSlide.classList.remove('quickcut-flash');
        void targetSlide.offsetWidth; // Trigger reflow
        targetSlide.classList.add('quickcut-flash');
        targetSlide.classList.add('active');
    }

    // Advance the internal state
    sliderState[sliderId] = nextIndex;
}
