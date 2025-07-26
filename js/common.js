export const setupSmoothScrolling = () => {
    document.querySelectorAll('nav ul li a, .btn-primary').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
};