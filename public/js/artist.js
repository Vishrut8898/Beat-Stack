const navBtn = document.querySelector('.nav');
const closeBtn = document.querySelector('.close');
const hiddenNav = document.querySelector('.hidden-nav');
const playBtn = document.querySelector('.icon i');

navBtn.addEventListener('click', () => {
    hiddenNav.classList.add('active');
});

closeBtn.addEventListener('click', () => {
    hiddenNav.classList.remove('active');
})