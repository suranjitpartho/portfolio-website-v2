export const setupJourneySection = () => {
    const journeyTimelineContainer = document.getElementById('journey-timeline-container');
    const toggleJourneyButton = document.getElementById('toggle-journey-button');

    if (journeyTimelineContainer && toggleJourneyButton) {
        toggleJourneyButton.addEventListener('click', () => {
            journeyTimelineContainer.classList.toggle('expanded');
            if (journeyTimelineContainer.classList.contains('expanded')) {
                toggleJourneyButton.textContent = 'Show Less';
            } else {
                toggleJourneyButton.textContent = 'See More';
            }
        });
    }
};