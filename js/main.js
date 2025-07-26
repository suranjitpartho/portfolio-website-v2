import { setupSkillsAnimation } from './skills.js';
import { setupAboutSection } from './about.js';
import { setupJourneySection } from './journey.js';
import { setupHeroAnimations } from './hero.js';
import { setupSmoothScrolling } from './common.js';

document.addEventListener('DOMContentLoaded', () => {
    setupSkillsAnimation();
    setupAboutSection();
    setupJourneySection();
    setupHeroAnimations();
    setupSmoothScrolling();
});
