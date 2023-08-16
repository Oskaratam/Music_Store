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
const NUMBERS = {
    1: 'first',
    2: 'second',
    3: 'third',
    4: 'fourth',
    5: 'fifth',
    6: 'sixth'
}


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
        console.log(itemBox)
        document.getElementsByClassName(`itemImage`)[i - 1].setAttribute('src', `${itemType[itemType.itemTypeTxt + i].image}`)
        document.getElementsByClassName('itemName')[i - 1].innerHTML = `${itemType[itemType.itemTypeTxt + i].name}`
        document.getElementsByClassName('itemPrice')[i - 1].innerHTML = `${itemType[itemType.itemTypeTxt + i].price}`
}
}

setItems(guitars);
