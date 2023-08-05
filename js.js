const container = document.querySelector('main'),
      formDialog = document.querySelector('#formDialog'),
      arrow_right = document.getElementById('arrow_right'),
      homeLogInBtn = document.getElementById('homeLogInBtn');

fetch('./Forms/forms.html')
.then(res=>res.text())
.then(data=>{
    formDialog.innerHTML = data;
    const parser = new DOMParser()
    const doc = parser.parseFromString(data, 'text/html')
    eval(doc.querySelector('script').textContent)
})





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
homeLogInBtn.addEventListener('click', () => {formDialog.showModal()})

