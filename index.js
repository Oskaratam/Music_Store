const container = document.querySelector('main'),
      formDialog = document.querySelector('.formDialog'),
      arrow_right = document.getElementById('arrow_right'),
      homeLogInBtn = document.getElementById('homeLogInBtn');





//CHANGING BACKGROUNDS//
let currentBg = 1,
    bg;

let changeBg = () => {
    if (currentBg === 3) {
       document.querySelector('#photo3').classList.remove('active');
       document.querySelector('#photo2').classList.remove('active');
       currentBg = 1;
    } else {
        currentBg += 1;
    }
    document.querySelector('#photo'+ currentBg).classList.add('active');
}
arrow_right.addEventListener('click', changeBg);

//////////////////////////////////////////////////



homeLogInBtn.addEventListener('click', () => {
    formDialog.classList.add('formsOpened');
    document.querySelector('.overlay').classList.remove('hidden');
})

const closeForms = () => {
    formDialog.classList.remove('formsOpened');
    document.querySelector('.overlay').classList.add('hidden');
}
document.querySelector('.overlay').addEventListener('click', ()=>{closeForms()});
document.addEventListener("keydown", (e) => {
    if (e.key == "Escape" && !formDialog.classList.contains('hidden')) {
        closeForms();
    }
});