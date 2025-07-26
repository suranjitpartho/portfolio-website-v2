export const setupHeroAnimations = () => {
    const heroGreetingPrefixSpan = document.getElementById('hero-greeting-prefix');
    const suranjitNameSpan = document.getElementById('suranjit-name');
    const heroIntroSpan = document.getElementById('hero-intro');
    const heroRolesSpan = document.getElementById('hero-roles');
    const firstLineCursor = document.querySelector('.first-line-cursor');
    const suranjitNameCursor = document.querySelector('.suranjit-name-cursor');
    const secondLineCursor = document.querySelector('.second-line-cursor');

    const professions = [" Data Analyst", " BI Developer", " Software Engineer"];
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

        if (heroRolesSpan.textContent !== '') {
            heroRolesSpan.classList.remove('profession-slide-in');
            heroRolesSpan.classList.add('profession-slide-out');
            setTimeout(() => {
                heroRolesSpan.classList.remove('profession-slide-out');
                heroRolesSpan.textContent = '';
                typeAndSlideInProfession(currentProfession);
            }, 500);
        } else {
            typeAndSlideInProfession(currentProfession);
        }
    };

    const typeAndSlideInProfession = (profession) => {
        heroRolesSpan.classList.add('profession-slide-from-top');
        heroRolesSpan.style.opacity = 0;
        heroRolesSpan.textContent = '';

        setTimeout(() => {
            heroRolesSpan.classList.remove('profession-slide-from-top');
            heroRolesSpan.classList.add('profession-slide-in');
            typeText(heroRolesSpan, profession, 100, () => {
                setTimeout(() => {
                    eraseText(heroRolesSpan, 50, () => {
                        professionIndex = (professionIndex + 1) % professions.length;
                        loopProfessions();
                    }, secondLineCursor);
                }, 2000);
            }, secondLineCursor);
        }, 100);
    };

    const startHeroAnimations = async () => {
        await new Promise(resolve => typeText(heroGreetingPrefixSpan, "Hi there! I'm ", 70, resolve, firstLineCursor));
        await new Promise(resolve => typeText(suranjitNameSpan, " Suranjit", 70, () => {
            if (suranjitNameCursor) suranjitNameCursor.classList.remove('active');
            resolve();
        }, suranjitNameCursor));
        await new Promise(resolve => typeText(heroIntroSpan, "I build data-driven solutions as a ", 70, resolve, secondLineCursor));
        loopProfessions();
    };

    setTimeout(startHeroAnimations, 500);
};