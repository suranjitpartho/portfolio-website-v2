export const setupAboutSection = () => {
    const aboutTextContainer = document.getElementById('about-text-container');
    const toggleAboutButton = document.getElementById('toggle-about-button');

    if (aboutTextContainer && toggleAboutButton) {
        toggleAboutButton.addEventListener('click', () => {
            aboutTextContainer.classList.toggle('expanded');
            if (aboutTextContainer.classList.contains('expanded')) {
                toggleAboutButton.textContent = 'Show Less';
            } else {
                toggleAboutButton.textContent = 'See More';
            }
        });
    }
};