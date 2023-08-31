import LocomotiveScroll from "locomotive-scroll";

const scroll = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: false,
})


document.querySelector('#catalogButton').addEventListener('click', ()=> {
    scroll.scrollTo(document.querySelector('.catalog'))
})

document.querySelector('#homeButton').addEventListener('click', () => {
    scroll.scrollTo(document.querySelector('main'))
})

document.querySelector('#serviceButton').addEventListener('click', () => {
    scroll.scrollTo(document.querySelector('.service'))
})

document.querySelectorAll('.product').forEach(product => {
    product.addEventListener('click', () => {
        scroll.scrollTo(document.querySelector('.catalog'));
        document.querySelector('.currentItemButton').classList.remove('currentItemButton');
        setItems(itemTypesTxtToObject[product.dataset.value]);
        document.querySelector(`.itemButton[value="${product.dataset.value}"`).classList.add('currentItemButton');
    })
})







const activateLeft = (images) => {
    for (let i = 0; i < images.length; i++) {
        setTimeout(function () {
           images[i].classList.add('leftSideImageOpened')
        }, i * 100)
    }    
}

const activateRight = (images) => {
    for (let i = 0; i < images.length; i++) {
        setTimeout(function () {
           images[i].classList.add('rightSideImageOpened')
        }, i * 100)
    }   
} 

const deactivateLeft = (images) => {
    for (let i = 0; i < images.length; i++) {
           images[i].classList.remove('leftSideImageOpened')
    }    
}

const deactivateRight = (images) => {
    for (let i = 0; i < images.length; i++) {
           images[i].classList.remove('rightSideImageOpened')
    }   
} 


scroll.on("call", (func)=> {
    let imagesLeft = document.querySelectorAll('.leftSideImage');
    let imagesRight = document.querySelectorAll('.rightSideImage');
    if (func == "closeBackground") {
        deactivateLeft(imagesLeft);
        deactivateRight(imagesRight);
    };
    if (func == "openBackground"){
        activateLeft(imagesLeft);
        activateRight(imagesRight);
    } 
}) 

