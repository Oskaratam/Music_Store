const container = document.querySelector('main'),
      formDialog = document.querySelector('.formDialog'),
      arrow_right = document.getElementById('arrow_right'),
      homeLogInBtn = document.getElementById('homeLogInBtn'),
      itemButtons = document.querySelectorAll('.itemButton'),
      cartBtn = document.querySelector('.cartBtn'),
      cart = document.querySelector('.cart'),
      cartItems = document.querySelector('.cartItems')
      addToCartButtons = document.querySelectorAll('#addToCartBtn');

let currentBg = 1,
    bg;

const NUMBERS = {
    1: 'first',
    2: 'second',
    3: 'third',
    4: 'fourth',
    5: 'fifth',
    6: 'sixth'
}



//CHANGING BACKGROUNDS//

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

//CREATING CATALOG//

class Item {
    constructor(imageSource, name, price) {
        this.image = imageSource;
        this.name = name;
        this.price = price;
    }
    
    get imageUrl(){
        return imageSource
    }

    /**
     * @param {any} updatedPrice
     */
    set updatePrice(updatedPrice){
        this.price = updatedPrice
    }
}

const guitars = {
    itemTypeTxt: 'guitars',
    guitars1: new Item("./img/guitars/prs_se_santana.jpg", "PRS SE Santana", "1100$"),
    guitars2: new Item("./img/guitars/squier_affinity.jpeg", "Squier Stratocaster", "450$"),
    guitars3: new Item("./img/guitars/fender_jazzmaster.jpg", "Fender Jazzmaster", "1680$"),
    guitars4: new Item("./img/guitars/G&L_Asat.jpg", "G&L Asat Classic", "2130$"), 
    guitars5: new Item("./img/guitars/prs_se_245.jpg", "PRS SE 245", "1300$"),
    guitars6: new Item("./img/guitars/yamaha_revstar.jpg", "Yamaha Revstar", "760$")
}
const bass = {
    itemTypeTxt: 'bass',
    bass1: new Item("./img/basses/g&l_tribute.jpg", "G&L Tribute", "1200$"),
    bass2: new Item("./img/basses/ltd.jpg", "LTD AP-204", "630$"),
    bass3: new Item("./img/basses/cort_a4.jpg", "CORT A4 Plus", "1050$"),
    bass4: new Item("./img/basses/yamaha.jpg", "YAMAHA BB234", "400$"),
    bass5: new Item("./img/basses/IBANEZ.jpg", "Ibanez SR605E", "1350$"),
    bass6: new Item("./img/basses/fender jazz bass.jpg", "Fender Jazz Bass", "1670$"),
}
const keys = {
    itemTypeTxt: 'keys',
    keys1: new Item("./img/keys/kawai.jpeg", "Kawai Novus NV10", "1480$"),
    keys2: new Item("./img/keys/casio.jpg", "Casio PX-750", "870$"),
    keys3: new Item("./img/keys/yamaha.jpg", "Yamaha p115", "630$"),
    keys4: new Item("./img/keys/kurzwelli.png", "Kurzweil M1", "800$"),
    keys5: new Item("./img/keys/yamaha2.jpg", "Yamaha ARIUS", "1300$"),
    keys6: new Item("./img/keys/pearl.jpg", "Pearl River V033RW", "850$"),
}

const drums = {
    itemTypeTxt: 'drums',
    drums1: new Item('./img/drums/Dw.jpg', "DW Design Series", "2700$"),
    drums2: new Item('./img/drums/maxtone.jpg', "MAXTONE MXC-3005", "920$"),
    drums3: new Item('./img/drums/DB.jpg', "DB Percussion DB52-44", "550$"),
    drums4: new Item('./img/drums/PDP.jpg', "PDP CONCEPT SERIES", "1270$"),
    drums5: new Item('./img/drums/pearl.jpg', "Pearl CRB-504P", "2000$"),
    drums6: new Item('./img/drums/pearl2.jpg', "Pearl DMP-925F" ,"1700$"),
}

const amps = {
    itemTypeTxt: 'amps',
    amps1: new Item('./img/amps/fender.jpg', "FENDER 65 DELUXE REVERB", "1600$"),
    amps2: new Item('./img/amps/peavey.jpg', "PEAVEY Classic 30", "1060$"),
    amps3: new Item('./img/amps/yamaha.jpg', "Yamaha THR15", "520$"),
    amps4: new Item('./img/amps/ashdown.jpg', "ASHDOWN MAG 212T", "450$"),
    amps5: new Item('./img/amps/vox.jpg', "VOX AC30C2X", "2200$"),
    amps6: new Item('./img/amps/orange.jpg', "Orange Crush Pix", "870$"),
}

const buttonValues = {
    "guitars": guitars,
    "bass": bass,
    "keys": keys,
    "drums": drums,
    "amps": amps,
}

createElementsInItemBoxes = () => {
    for (let i = 1; i < 7; i++){
        let image = document.createElement('img');
        image.classList.add('itemImage');
        let name = document.createElement('span');
        name.classList.add('itemName');
        let price = document.createElement('span');
        price.classList.add('itemPrice');
        let itemContainer = document.querySelector(`.${NUMBERS[i]}`);
        itemContainer.appendChild(image);
        itemContainer.appendChild(name);
        itemContainer.appendChild(price);
    }
};
createElementsInItemBoxes();

const setItems = (itemType) => {
    for (let i = 1; i < 7; i++){
        let itemBox = document.querySelector(`.item.${NUMBERS[i]}`);
        itemBox.setAttribute('data-itemtype', `${itemType.itemTypeTxt}`)
        itemBox.setAttribute('data-item', `${itemType.itemTypeTxt + i}`)
        document.getElementsByClassName(`itemImage`)[i - 1].setAttribute('src', `${itemType[itemType.itemTypeTxt + i].image}`)
        document.getElementsByClassName('itemName')[i - 1].innerHTML = `${itemType[itemType.itemTypeTxt + i].name}`
        document.getElementsByClassName('itemPrice')[i - 1].innerHTML = `${itemType[itemType.itemTypeTxt + i].price}`
}
}

setItems(guitars)

for (let i = 0; i < itemButtons.length; i++){
    itemButtons[i].addEventListener('click', () => {
        document.querySelector('.currentItemButton').classList.remove('currentItemButton');
        itemButtons[i].classList.add('currentItemButton');
        setItems(buttonValues[itemButtons[i].value])
    })
}

//////////////////////////////////////////////////////////////

/*CART SYSTEM*/
let cartItemsCount = 0;

const cartItemsArray = [];


cartBtn.addEventListener('click', ()=> {
    cart.classList.toggle('cartOpened');
})

for (let i = 0; i < addToCartButtons.length; i++){
    addToCartButtons[i].addEventListener('click', () => {
        let cartItem = document.createElement('div');
        cartItem.classList.add('cartItem');
        cartItems.appendChild(cartItem);

        let itemBox = document.querySelectorAll('.item')[i];
        let itemObject = buttonValues[itemBox.dataset.itemtype];
        let addedItem = itemObject[itemBox.dataset.item];
        cartItemsArray.push(addedItem);

        let cartItemName = document.createElement('p');
        cartItemName.classList.add('cartItemName')
        cartItemName.innerHTML = addedItem.name;
        cartItem.appendChild(cartItemName);

        let cartItemPrice = document.createElement('p');
        cartItemPrice.classList.add('cartItemPrice');
        cartItemPrice.innerHTML = addedItem.price;
        cartItem.appendChild(cartItemPrice)
        cartItemsCount += 1;
    })
}