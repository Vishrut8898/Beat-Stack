FilePond.registerPlugin(
    FilePondPluginImagePreview,
    FilePondPluginImageResize,
    FilePondPluginFileEncode,
)

FilePond.setOptions({
    stylePanelAspectRatio: 50 / 50,
    imageResizeTargetWidth: 50,
    imageResizeTargetHeight: 50
})

FilePond.parse(document.body);

const navBtn = document.querySelector('.nav');
const closeBtn = document.querySelector('.closy');
const hiddenNav = document.querySelector('.hidden-nav');
const playBtn = document.querySelector('.icon i');

navBtn.addEventListener('click', () => {
    hiddenNav.classList.add('active');
});

closeBtn.addEventListener('click', () => {
    hiddenNav.classList.remove('active');
})