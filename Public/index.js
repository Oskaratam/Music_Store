const container = document.querySelector('main'),
      formDialog = document.querySelector('.formDialog'),
      arrow_right = document.getElementById('arrow_right'),
      homeLogInBtn = document.getElementById('homeLogInBtn'),
      itemButtons = document.querySelectorAll('.itemButton'),
      cartBtn = document.querySelector('.cartBtn'),
      cart = document.querySelector('.cart'),
      cartItems = document.querySelector('.cartItems')
      addToCartButtons = document.querySelectorAll('#addToCartBtn'),
      countCartItemsImage = document.getElementById('countCartItemsImage'),
      totalPrice = document.querySelector('.totalPrice'),
      checkout = document.getElementById('checkout');

window.addEventListener('scroll', ()=>{
    document.body.style.cssText = `--scrollTop: ${window.scrollY}px`
})

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
        itemBox.setAttribute('data-itemtype', `${itemType[0]}`)
        itemBox.setAttribute('data-item', `${itemType[i]}`)
        document.getElementsByClassName(`itemImage`)[i - 1].setAttribute('src', `${itemType[i].imageSource}`)
        document.getElementsByClassName('itemName')[i - 1].innerHTML = `${itemType[i].name}`
        document.getElementsByClassName('itemPrice')[i - 1].innerHTML = `${itemType[i].price / 100}$`
}
}

let guitars, bass, keys, drums, amps, buttonValues, itemTypesTxtToObject;

fetch('http://localhost:3000/items')
    .then(res => res.json())
    .then(data => {
        guitars = data.guitars,
        bass = data.bass,
        keys = data.keys,
        drums = data.drums,
        amps = data.amps;
        
        setItems(guitars);

        buttonValues = [
                keys,
                drums,
                guitars,
                bass,
                amps
        ]

        itemTypesTxtToObject = {
            "guitars": guitars,
            "drums": drums,
            "bass": bass,
            "amps": amps,
            "keys": keys,
        }
            
        


    })
    .catch(error => {
        console.error(error);
    });



for (let i = 0; i < itemButtons.length; i++){
    itemButtons[i].addEventListener('click', () => {
        document.querySelector('.currentItemButton').classList.remove('currentItemButton');
        itemButtons[i].classList.add('currentItemButton');
        setItems(buttonValues[i]);
        addToCartButtons.forEach(button => button.classList.remove('addToCartBtnClicked'));
    })
}

//////////////////////////////////////////////////////////////

/*CART SYSTEM*/
let cartItemsCount = 0;

let cartItemsArray = [];


cartBtn.addEventListener('click', ()=> {
    cart.classList.toggle('cartOpened');
})

const updateCartItemsCountImage = () => {
    countCartItemsImage.innerHTML = `${cartItemsCount}`;
}
const updateTotalPrice = () => {
    let total = 0;
    cartItemsArray.forEach(item => total += parseInt((item.price / 100) * item.quantity));
    totalPrice.innerHTML = `Total ${total}$`;
}

//adding items to cart
for (let i = 0; i < addToCartButtons.length; i++){
    addToCartButtons[i].addEventListener('click', () => {
        if(cartItemsCount <= 5){
            let currentAddToCartBtn = addToCartButtons[i];
            addToCartButtons[i].classList.add('addToCartBtnClicked')
            
            let itemBox = document.querySelectorAll('.item')[i];
            let itemObject = itemBox.dataset.itemtype;
            let addedItem = itemTypesTxtToObject[itemObject][i + 1];

            addedItem.quantity = 1;


            if (!cartItemsArray.includes(addedItem)){
                cartItemsArray.push(addedItem);

                console.log(cartItemsArray)

                
                let cartItem = document.createElement('div');
                cartItem.classList.add('cartItem');
                cartItems.appendChild(cartItem);
                    
                let cartItemName = document.createElement('p');
                cartItemName.classList.add('cartItemName')
                cartItemName.innerHTML = addedItem.name;
                cartItem.appendChild(cartItemName);

                let minus = document.createElement('img');
                minus.setAttribute('src', '../img/minus.png');
                minus.classList.add('minusIcon');
                cartItem.appendChild(minus);

                let cartItemQuantity = document.createElement('input')
                cartItemQuantity.classList.add('cartItemQuantity');
                cartItemQuantity.setAttribute('value', '1');
                cartItemQuantity.setAttribute('type', "number");
                cartItemQuantity.setAttribute('min', '1');
                cartItemQuantity.setAttribute('max', '5');
                cartItem.appendChild(cartItemQuantity);

                let plus = document.createElement('img');
                plus.setAttribute('src', '../img/plus.png');
                plus.classList.add('plusIcon');
                cartItem.appendChild(plus);


                let cartItemPrice = document.createElement('p');
                cartItemPrice.classList.add('cartItemPrice');
                cartItemPrice.innerHTML = `${addedItem.price / 100}$`;
                cartItem.appendChild(cartItemPrice)
                cartItemsCount += 1;
                updateCartItemsCountImage();
                updateTotalPrice();

                const updateItemQuantity = () => {
                    let value = cartItemQuantity.value;
                    let priceNumber = parseInt(`${addedItem.price / 100}$`);
                    cartItemsArray = cartItemsArray.filter((item) => {
                        return item != addedItem;
                    })
                    addedItem.quantity = parseInt(value);
                    console.log(cartItemsArray)
                    cartItemsArray.push(addedItem)
                    for(let i = 0; i < value; i++){
                        cartItemPrice.innerHTML = `${priceNumber * value}$`
                    }
                    updateTotalPrice();
                }

                minus.addEventListener('click', ()=> {
                    cartItemQuantity.stepDown();
                    updateItemQuantity();
                })

                plus.addEventListener('click', ()=> {
                    cartItemQuantity.stepUp();
                    updateItemQuantity();
                })


                let removeItemButton = document.createElement('img');
                removeItemButton.classList.add('removeItemButton');
                removeItemButton.setAttribute('src', '../img/cross.png');
                cartItem.appendChild(removeItemButton)
                removeItemEvent(removeItemButton, cartItem, addedItem, currentAddToCartBtn)
            }
        } else {
            alert('Cart is full ;)')
        }
        
    })
}

// removing items from cart

const removeItemEvent = (button, element, arrayItem, currentAddToCartBtn) => {
    button.addEventListener('click', () => {
        element.remove();
        cartItemsArray = cartItemsArray.filter((item) => {
            return item != arrayItem;
        })
        cartItemsCount -= 1;
        updateCartItemsCountImage();
        updateTotalPrice();
        currentAddToCartBtn.classList.remove('addToCartBtnClicked');
    })
}
////////////////////////////////////////////////////////////////////

/*CHECKOUT*/

checkout.addEventListener('click', () => {
    fetch('http://localhost:3000/create-checkout-session', {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            items: cartItemsArray
        }),
    }).then(res => {
        if (res.ok) return res.json()
        return res.json().then(json => Promise.reject(json))
    }).then(({ url }) => {
        window.location = url
    }).catch((e) => {
        console.error(e);
    })

})


