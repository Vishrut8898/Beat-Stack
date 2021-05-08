const navBtn = document.querySelector('.nav');
const closeBtn = document.querySelector('.close');
const hiddenNav = document.querySelector('.hidden-nav');
const playBtn = document.querySelectorAll('.play');
const pauseBtn = document.querySelectorAll('.pause');

navBtn.addEventListener('click', () => {
    hiddenNav.classList.add('active');
});

closeBtn.addEventListener('click', () => {
    hiddenNav.classList.remove('active');
})

playBtn.forEach(play => {
    play.addEventListener('click', () => {
        const iconDiv = play.parentElement;
        const pausy = iconDiv.querySelector('.pause');

        const allAudio = document.querySelectorAll('audio');
        allAudio.forEach(audio => {
            playBtn.forEach(play => {
                play.style.display = 'initial';
            })
            pauseBtn.forEach(pause => {
                pause.style.display = 'none';
            })
            audio.pause();
        })

        play.style.display = 'none';
        pausy.style.display = 'initial';

        const audio = iconDiv.querySelector('audio');
        audio.play();
    })
})

pauseBtn.forEach(pause => {
    pause.addEventListener('click', () => {
        const iconDiv = pause.parentElement;
        const playy = iconDiv.querySelector('.play');
        const allAudio = document.querySelectorAll('audio');
        allAudio.forEach(audio => {
            playBtn.forEach(play => {
                play.style.display = 'none';
            })
            pauseBtn.forEach(pause => {
                pause.style.display = 'initial';
            })
            audio.pause();
        })

        pause.style.display = 'none';
        playy.style.display = 'initial';

        const audio = iconDiv.querySelector('audio');
        audio.play();
    })
})