let e,t,n,s,o,c,r,l;document.querySelector("main");const a=document.querySelector(".formDialog"),d=document.getElementById("arrow_right"),i=document.getElementById("homeLogInBtn"),m=document.querySelectorAll(".itemButton"),u=document.querySelector(".cartBtn"),p=document.querySelector(".cart"),y=document.querySelector(".cartItems");addToCartButtons=document.querySelectorAll("#addToCartBtn"),countCartItemsImage=document.getElementById("countCartItemsImage"),totalPrice=document.querySelector(".totalPrice"),checkout=document.getElementById("checkout"),sendReportButton=document.querySelector(".sendReportButton"),issueReportInput=document.querySelector(".issueReportInput"),window.addEventListener("scroll",()=>{document.body.style.cssText=`--scrollTop: ${window.scrollY}px`;let e=window.scrollX;document.querySelector(".menu_bar").style.transform=`translateX(-${e}px)`,document.querySelector("#user").style.transform=`translateX(-${e}px)`,document.querySelector(".cartBtn").style.transform=`translateX(-${e}px)`});let g=1;const h={1:"first",2:"second",3:"third",4:"fourth",5:"fifth",6:"sixth"};d.addEventListener("click",()=>{3===g?(document.querySelector("#photo3").classList.remove("active"),document.querySelector("#photo2").classList.remove("active"),g=1):g+=1,document.querySelector("#photo"+g).classList.add("active")}),i.addEventListener("click",()=>{a.classList.add("formsOpened"),document.querySelector(".overlay").classList.remove("hidden")});const v=()=>{a.classList.remove("formsOpened"),document.querySelector(".overlay").classList.add("hidden")};document.querySelector(".overlay").addEventListener("click",()=>{v()}),document.addEventListener("keydown",e=>{"Escape"!=e.key||a.classList.contains("hidden")||v()}),(()=>{for(let e=1;e<7;e++){let t=document.createElement("img");t.classList.add("itemImage");let n=document.createElement("span");n.classList.add("itemName");let s=document.createElement("span");s.classList.add("itemPrice");let o=document.querySelector(`.${h[e]}`);o.appendChild(t),o.appendChild(n),o.appendChild(s)}for(let e=1;e<3;e++){let t=document.createElement("img");t.classList.add("bestSellerImage");let n=document.createElement("span");n.classList.add("bestSellerName");let s=document.createElement("span");s.classList.add("bestSellerPrice");let o=document.querySelector(`.${h[e]}Best`);o.appendChild(t),o.appendChild(n),o.appendChild(s)}})();const L=e=>{for(let t=1;t<7;t++){let n=document.querySelector(`.item.${h[t]}`);n.setAttribute("data-itemtype",`${e[0]}`),n.setAttribute("data-item",`${e[t]}`),document.getElementsByClassName("itemImage")[t-1].setAttribute("src",`${e[t].imageSource}`),document.getElementsByClassName("itemName")[t-1].innerHTML=`${e[t].name}`,document.getElementsByClassName("itemPrice")[t-1].innerHTML=`${e[t].price/100}$`}};fetch("https://muse-vibe-server.onrender.com/items").then(e=>e.json()).then(a=>{e=a.guitars,t=a.bass,n=a.keys,s=a.drums,o=a.amps,c=a.bestSellers,L(e),r=[n,s,e,t,o],l={guitars:e,drums:s,bass:t,amps:o,keys:n,bestSellers:c};for(let e=0;e<2;e++)document.querySelectorAll(".bestSellerContainer")[e].style.backgroundImage=`url(${c[e+7].imageSource})`,document.getElementsByClassName("bestSellerName")[e].innerHTML=`${c[e+7].name}`,document.getElementsByClassName("bestSellerPrice")[e].innerHTML=`${c[e+7].price/100}$`}).catch(e=>{console.error(e)});for(let e=0;e<m.length;e++)m[e].addEventListener("click",()=>{document.querySelector(".currentItemButton").classList.remove("currentItemButton"),m[e].classList.add("currentItemButton"),L(r[e]),addToCartButtons.forEach(e=>e.classList.remove("addToCartBtnClicked"))});let E=0,S=[];u.addEventListener("click",()=>{p.classList.toggle("cartOpened")});const I=()=>{countCartItemsImage.innerHTML=`${E}`},B=()=>{let e=0;S.forEach(t=>e+=parseInt(t.price/100*t.quantity)),totalPrice.innerHTML=`Total ${e}$`};for(let e=0;e<addToCartButtons.length;e++)addToCartButtons[e].addEventListener("click",()=>{if(E<=5){let t=addToCartButtons[e];addToCartButtons[e].classList.add("addToCartBtnClicked");let n=l[document.querySelectorAll(".item")[e].dataset.itemtype][e+1];if(n.quantity=1,!S.includes(n)){S.push(n),console.log(S);let e=document.createElement("div");e.classList.add("cartItem"),y.appendChild(e);let s=document.createElement("p");s.classList.add("cartItemName"),s.innerHTML=n.name,e.appendChild(s);let o=document.createElement("img");o.setAttribute("src","../img/minus.png"),o.classList.add("minusIcon"),e.appendChild(o);let c=document.createElement("input");c.classList.add("cartItemQuantity"),c.setAttribute("value","1"),c.setAttribute("type","number"),c.setAttribute("min","1"),c.setAttribute("max","5"),e.appendChild(c);let r=document.createElement("img");r.setAttribute("src","../img/plus.png"),r.classList.add("plusIcon"),e.appendChild(r);let l=document.createElement("p");l.classList.add("cartItemPrice"),l.innerHTML=`${n.price/100}$`,e.appendChild(l),E+=1,I(),B();let a=()=>{let e=c.value,t=parseInt(`${n.price/100}$`);S=S.filter(e=>e!=n),n.quantity=parseInt(e),console.log(S),S.push(n);for(let n=0;n<e;n++)l.innerHTML=`${t*e}$`;B()};o.addEventListener("click",()=>{c.stepDown(),a()}),r.addEventListener("click",()=>{c.stepUp(),a()});let d=document.createElement("img");d.classList.add("removeItemButton"),d.setAttribute("src","../img/cross.png"),e.appendChild(d),C(d,e,n,t)}}else alert("Cart is full ;)")});const C=(e,t,n,s)=>{e.addEventListener("click",()=>{t.remove(),S=S.filter(e=>e!=n),E-=1,I(),B(),s.classList.remove("addToCartBtnClicked")})};checkout.addEventListener("click",()=>{fetch("https://muse-vibe-server.onrender.com/create-checkout-session",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({items:S})}).then(e=>e.ok?e.json():e.json().then(e=>Promise.reject(e))).then(({url:e})=>{window.location=e}).catch(e=>{console.error(e)})}),document.querySelector(".issueForm").onsubmit=e=>{e.preventDefault(),console.log(issueReportInput.value),issueReportInput.value="",document.querySelector(".acceptImage").classList.add("acceptImageOpened"),setTimeout(function(){document.querySelector(".acceptImage").classList.remove("acceptImageOpened")},2e3)},document.getElementById("logIn");const q=document.getElementById("signUp");document.getElementById("signUpBtn");const f=async(e,t,n)=>{try{let s=await fetch("https://muse-vibe-server.onrender.com/users",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:e,email:t,password:n})});s.ok?console.log("USER CREATED"):console.log("Failed to create user")}catch(e){console.error(e)}};f("testUser","test@gmail.com","12345");const b=async(e,t)=>{try{let n=await fetch("https://muse-vibe-server.onrender.com/users/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({inputEmail:e,inputPassword:t})});if(n.ok){console.log("YOU HAVE ACCESS"),v();let e=await n.json();document.querySelector(".userImgActive").style.display="inline",document.querySelector(".userImg").style.display="none",document.getElementById("homeLogInBtn").style.visibility="hidden",document.querySelector(".userName").innerHTML=e.name,document.querySelector(".userName").style.display="inline",console.log(e.name)}else console.log("Invalid Email or Password")}catch(e){console.error(e)}};q.addEventListener("submit",async()=>{await f(document.getElementById("name2").value,document.getElementById("email2").value,document.getElementById("password2").value)}),document.getElementById("logIn").addEventListener("submit",async e=>{e.preventDefault(),await b(document.getElementById("email").value,document.getElementById("password").value)});const T=document.querySelector(".chooseDescriptionBtn"),k=document.querySelector(".chooseDescriptionBtn2"),$=document.querySelector(".descriptionForBest"),A=document.querySelector(".descriptionForBest2");T.addEventListener("click",()=>{T.classList.add("chooseDescriptionBtnActive"),k.classList.remove("chooseDescriptionBtnActive"),$.style.display="none",A.style.display="flex"}),k.addEventListener("click",()=>{k.classList.add("chooseDescriptionBtnActive"),T.classList.remove("chooseDescriptionBtnActive"),A.style.display="none",$.style.display="flex"});
//# sourceMappingURL=index.bc96c69b.js.map
