const showGuide = document.getElementById('showGuide');
const crossButton = document.getElementById('crossButton');
const Guide = document.getElementById('guide_popup');
console.log(crossButton);
console.log(showGuide);

showGuide.addEventListener('click', guidePop);
crossButton.addEventListener('click', fermerGuide);

function guidePop() {
    Guide.style.display='block';
}
function fermerGuide() {
    Guide.style.display='none';
}