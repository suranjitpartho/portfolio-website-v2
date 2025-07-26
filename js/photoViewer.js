export const setupPhotoViewer = () => {
    const photoItems = document.querySelectorAll('.photo-item');
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');
    let currentIndex = 0;

    const updatePhotoClasses = () => {
        photoItems.forEach((item, index) => {
            item.classList.remove('active', 'next', 'prev');
            // The CSS will handle the default hidden state (display: none, opacity: 0, etc.)

            if (index === currentIndex) {
                item.classList.add('active');
            } else if (index === (currentIndex + 1) % photoItems.length) {
                item.classList.add('next');
            } else if (index === (currentIndex - 1 + photoItems.length) % photoItems.length) {
                item.classList.add('prev');
            }
        });
    };

    const showNextPhoto = () => {
        currentIndex = (currentIndex + 1) % photoItems.length;
        updatePhotoClasses();
    };

    const showPrevPhoto = () => {
        currentIndex = (currentIndex - 1 + photoItems.length) % photoItems.length;
        updatePhotoClasses();
    };

    leftArrow.addEventListener('click', showPrevPhoto);
    rightArrow.addEventListener('click', showNextPhoto);

    // Initial setup
    updatePhotoClasses();
};
