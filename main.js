document.addEventListener('DOMContentLoaded', () => {
    // Skills section animation
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
                // Removed skillItems.forEach(animateProgress); from here
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5 // Trigger when 50% of the section is visible
    });

    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }

    // About Me section - See More/Show Less functionality
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

    // Hero section animations
    const heroGreetingPrefixSpan = document.getElementById('hero-greeting-prefix');
    const suranjitNameSpan = document.getElementById('suranjit-name');
    const heroIntroSpan = document.getElementById('hero-intro');
    const heroRolesSpan = document.getElementById('hero-roles');
    const firstLineCursor = document.querySelector('.first-line-cursor');
    const suranjitNameCursor = document.querySelector('.suranjit-name-cursor');
    const secondLineCursor = document.querySelector('.second-line-cursor');

    const professions = [" Data Analyst", " BI Developer", " Software Developer"];
    let professionIndex = 0;

    const typeText = (element, text, speed, callback, cursorElement = null) => {
        let i = 0;
        element.textContent = '';
        element.style.opacity = 1;
        if (cursorElement) {
            cursorElement.classList.add('active');
        }
        const interval = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(interval);
                if (cursorElement) {
                    cursorElement.classList.remove('active');
                }
                if (callback) callback();
            }
        }, speed);
    };

    const eraseText = (element, speed, callback, cursorElement = null) => {
        let text = element.textContent;
        let i = text.length - 1;
        if (cursorElement) {
            cursorElement.classList.add('active');
        }
        const interval = setInterval(() => {
            if (i >= 0) {
                element.textContent = text.substring(0, i);
                i--;
            } else {
                clearInterval(interval);
                if (cursorElement) {
                    cursorElement.classList.remove('active');
                }
                if (callback) callback();
            }
        }, speed);
    };

    const loopProfessions = () => {
        const currentProfession = professions[professionIndex];

        // Slide out current profession (if any) and prepare for new one
        if (heroRolesSpan.textContent !== '') {
            heroRolesSpan.classList.remove('profession-slide-in');
            heroRolesSpan.classList.add('profession-slide-out');
            setTimeout(() => {
                heroRolesSpan.classList.remove('profession-slide-out');
                heroRolesSpan.textContent = ''; // Clear text after slide out
                typeAndSlideInProfession(currentProfession);
            }, 500); // Match CSS transition duration
        } else {
            typeAndSlideInProfession(currentProfession);
        }
    };

    const typeAndSlideInProfession = (profession) => {
        heroRolesSpan.classList.add('profession-slide-from-top'); // Start from above
        heroRolesSpan.style.opacity = 0; // Ensure it's hidden before sliding in
        heroRolesSpan.textContent = ''; // Clear content before typing

        setTimeout(() => {
            heroRolesSpan.classList.remove('profession-slide-from-top');
            heroRolesSpan.classList.add('profession-slide-in'); // Slide in
            typeText(heroRolesSpan, profession, 100, () => {
                setTimeout(() => {
                    eraseText(heroRolesSpan, 50, () => {
                        professionIndex = (professionIndex + 1) % professions.length;
                        loopProfessions();
                    }, secondLineCursor); // Pass secondLineCursor here
                }, 2000); // Display duration for each profession
            }, secondLineCursor); // Pass secondLineCursor here
        }, 100); // Small delay to ensure enter class is applied
    };

    const startHeroAnimations = async () => {
        // Type "Hi There! This is "
        await new Promise(resolve => typeText(heroGreetingPrefixSpan, "Hi there! This is ", 70, resolve, firstLineCursor));

        // Type "SURANJIT."
        await new Promise(resolve => typeText(suranjitNameSpan, " Suranjit", 70, () => {
            if (suranjitNameCursor) suranjitNameCursor.classList.remove('active');
            resolve();
        }, suranjitNameCursor));

        // Type "I am a "
        await new Promise(resolve => typeText(heroIntroSpan, "I am a ", 70, resolve, secondLineCursor));

        // Start looping professions
        loopProfessions();
    };

    // Start animations after a short delay on page load
    setTimeout(startHeroAnimations, 500);

    // Smooth scrolling for navigation links
    document.querySelectorAll('nav ul li a, .btn-primary').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});