const container = document.querySelector('main'),
      arrow_right = document.querySelector('#arrow_right'),
      photo1  = document.querySelector('#photo1').getAttribute('src'),
      photo2 = document.querySelector('#photo2').getAttribute('src'),
      photo3 = document.querySelector('#photo3').getAttribute('src');

container.style.backgroundImage = `url(${photo1})`  

let currentBg = 1,
    bg;

let changeBg = () => {
    if (currentBg === 3) {
       currentBg = 1
    } else {
        currentBg += 1;
    }
    switch(currentBg){
        case 1:
            bg = photo1;
            break;
        case 2:
            bg = photo2;
            break;
        case 3:
            bg = photo3;
            break;
    }
    container.style.backgroundImage = `url(${bg})` 
}

arrow_right.addEventListener('click', changeBg);