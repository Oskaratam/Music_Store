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
      checkout = document.getElementById('checkout'),
      sendReportButton = document.querySelector('.sendReportButton'),
      issueReportInput = document.querySelector('.issueReportInput');

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


const createElementsInItemBoxes = () => {
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

    for(let i = 1; i < 3; i++) {
        let image2 = document.createElement('img');
        image2.classList.add('bestSellerImage');
        let name2 = document.createElement('span');
        name2.classList.add('bestSellerName');
        let price2 = document.createElement('span');
        price2.classList.add('bestSellerPrice');
        let bestSellerContainer = document.querySelector(`.${NUMBERS[i]}Best`);
        bestSellerContainer.appendChild(image2);
        bestSellerContainer.appendChild(name2);
        bestSellerContainer.appendChild(price2);
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

let guitars, bass, keys, drums, amps, bestSellers, buttonValues, itemTypesTxtToObject;

fetch('https://muse-vibe-server.onrender.com/items')
    .then(res => res.json())
    .then(data => {
        guitars = data.guitars,
        bass = data.bass,
        keys = data.keys,
        drums = data.drums,
        amps = data.amps,
        bestSellers = data.bestSellers;
        
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
            "bestSellers": bestSellers,
        }
            
    for(let i = 0; i < 2; i++) {
        //document.getElementsByClassName('bestSellerImage')[i].setAttribute('src', `${bestSellers[i].imageSource}`);
        document.querySelectorAll('.bestSellerContainer')[i].style.backgroundImage = `url(${bestSellers[i + 7].imageSource})`;
        document.getElementsByClassName('bestSellerName')[i].innerHTML = `${bestSellers[i + 7].name}`;
        document.getElementsByClassName('bestSellerPrice')[i].innerHTML = `${bestSellers[i + 7].price / 100}$`;
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
            addToCartButtons[i].classList.add('addToCartBtnClicked');
                
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
    fetch('https://muse-vibe-server.onrender.com/create-checkout-session', {
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

//ACCEPT ISSUE REPORT

const acceptReport = (e) => {
    e.preventDefault();
    console.log(issueReportInput.value);
    issueReportInput.value = '';
    document.querySelector('.acceptImage').classList.add('acceptImageOpened')
    setTimeout(function(){
        document.querySelector('.acceptImage').classList.remove('acceptImageOpened')
    }, 2000)
}

document.querySelector('.issueForm').onsubmit = acceptReport;

//AUTHENTIFICATION

const logIn = document.getElementById('logIn'),
    signUp = document.getElementById('signUp'),
    signUpBtn = document.getElementById('signUpBtn');


const createUser = async (name, email, password) => {
    try {
        const response = await fetch('https://muse-vibe-server.onrender.com/users', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({"name": name,
                "email": email,
                "password": password})
    });
    if (response.ok){
        console.log('USER CREATED')
    } else {
        console.log('Failed to create user')
    }
   }catch (error) {
    console.error(error);
}}

createUser("testUser", "test@gmail.com", "12345");

const loginVerification = async (email, password) => {
    try {
        const response = await fetch("https://muse-vibe-server.onrender.com/users/login", {    
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "inputEmail": email,
                "inputPassword": password
            }) 
        })
        if (response.ok) {
            console.log('YOU HAVE ACCESS');
            closeForms();
            const data = await response.json();
            document.querySelector('.userImgActive').style.display = 'inline';
            document.querySelector('.userImg').style.display = 'none';
            document.getElementById('homeLogInBtn').style.visibility = 'hidden';
            document.querySelector('.userName').innerHTML = data.name;
            document.querySelector('.userName').style.display = 'inline';
            console.log(data.name)
        } else {
            console.log("Invalid Email or Password")
        }
    } catch (e) {
        console.error(e);
    }
    
}





signUp.addEventListener('submit', async () => {
    await createUser(document.getElementById("name2").value, document.getElementById('email2').value, document.getElementById('password2').value)
})


document.getElementById('logIn').addEventListener('submit', async (e) => {
    e.preventDefault();
   await loginVerification(document.getElementById("email").value, document.getElementById("password").value);
})


//DESCRIPTION BUTTONS//

const btn1 = document.querySelector('.chooseDescriptionBtn');
const btn2 = document.querySelector('.chooseDescriptionBtn2');
const description1 = document.querySelector('.descriptionForBest'),
    description2 = document.querySelector('.descriptionForBest2');

btn1.addEventListener('click', () => {
    btn1.classList.add('chooseDescriptionBtnActive');
    btn2.classList.remove('chooseDescriptionBtnActive');
    description1.style.display = 'none';
    description2.style.display = 'flex';
})

btn2.addEventListener('click', () => {
    btn2.classList.add('chooseDescriptionBtnActive')
    btn1.classList.remove('chooseDescriptionBtnActive')
    description2.style.display = 'none';
    description1.style.display = 'flex';
})










