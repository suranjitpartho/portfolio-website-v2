export const setupSkillsAnimation = () => {
    const skillsSection = document.getElementById('skills');
    const skillItems = document.querySelectorAll('.skill-item');

    const animateProgress = (skillItem) => {
        const percent = parseInt(skillItem.dataset.percent);
        const circle = skillItem.querySelector('.progress-ring-fg');
        const radius = circle.r.baseVal.value;
        const circumference = 2 * Math.PI * radius;

        circle.style.strokeDasharray = `${circumference} ${circumference}`;
        circle.style.strokeDashoffset = circumference; // Reset to 0% progress

        // Force reflow to ensure the transition restarts
        circle.getBoundingClientRect();

        const offset = circumference - (percent / 100) * circumference;
        circle.style.strokeDashoffset = offset;
    };

    skillItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            animateProgress(item);
        });
        item.addEventListener('mouseleave', () => {
            const circle = item.querySelector('.progress-ring-fg');
            const radius = circle.r.baseVal.value;
            const circumference = 2 * Math.PI * radius;
            circle.style.strokeDashoffset = circumference; // Reset to 0% progress
        });
    });

    const skillsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5 // Trigger when 50% of the section is visible
    });

    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }
};