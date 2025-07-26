import { setupSkillsAnimation } from './skills.js';
import { setupAboutSection } from './about.js';
import { setupJourneySection } from './journey.js';
import { setupHeroAnimations } from './hero.js';
import { setupSmoothScrolling } from './common.js';
import { setupPhotoViewer } from './photoViewer.js';

document.addEventListener('DOMContentLoaded', () => {
    setupSkillsAnimation();
    setupAboutSection();
    setupJourneySection();
    setupHeroAnimations();
    setupSmoothScrolling();
    setupPhotoViewer();
});