import LocomotiveScroll from "locomotive-scroll";

const scroll = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: false,
})


document.querySelector('#catalogButton').addEventListener('click', ()=> {
    scroll.scrollTo(document.querySelector('.catalog'));
})

document.querySelector('#homeButton').addEventListener('click', () => {
    scroll.scrollTo(document.querySelector('main'));
})

document.querySelector('#serviceButton').addEventListener('click', () => {
    scroll.scrollTo(document.querySelector('.service'));
})
document.querySelector('#bestSellersButton').addEventListener('click', () => {
    scroll.scrollTo(document.querySelector('.bestSellers'));
});

document.querySelector('#aboutUsButton').addEventListener('click', () => {
    scroll.scrollTo(document.querySelector('.aboutUs'));
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
            images[i].style.transition = 'left 1s ease-out'
            images[i].style.left = '0px';
        }, i * 100)
    }    
}

const activateRight = (images) => {
    for (let i = 0; i < images.length; i++) {
        setTimeout(function () {
            images[i].style.transition = 'right 1s ease-out'
            images[i].style.right = '-1570px';
        }, i * 100)
    }   
} 

const deactivateLeft = (images) => {
    for (let i = 0; i < images.length; i++) {
        images[i].style.transition = 'left 0s'
        images[i].style.left = '-600px';
    }    
}

const deactivateRight = (images) => {
    for (let i = 0; i < images.length; i++){
        images[i].style.transition = 'right 0s'
        images[i].style.right = '-2300px';
    }
} 


scroll.on("call", (func)=> {
    let imagesLeft = document.querySelectorAll('.leftSideImage');
    let imagesRight = document.querySelectorAll('.rightSideImage');
    if (func == "openBackground"){
        activateLeft(imagesLeft);
        activateRight(imagesRight);
    } else if (func == "closeBackground") {
        deactivateLeft(imagesLeft);
        deactivateRight(imagesRight);
    };
}) 

