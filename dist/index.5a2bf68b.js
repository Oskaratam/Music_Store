let e,t,n,c,s,o,r;document.querySelector("main");const a=document.querySelector(".formDialog"),d=document.getElementById("arrow_right"),l=document.getElementById("homeLogInBtn"),i=document.querySelectorAll(".itemButton"),m=document.querySelector(".cartBtn"),u=document.querySelector(".cart"),p=document.querySelector(".cartItems");addToCartButtons=document.querySelectorAll("#addToCartBtn"),countCartItemsImage=document.getElementById("countCartItemsImage"),totalPrice=document.querySelector(".totalPrice"),checkout=document.getElementById("checkout"),sendReportButton=document.querySelector(".sendReportButton"),issueReportInput=document.querySelector(".issueReportInput"),window.addEventListener("scroll",()=>{document.body.style.cssText=`--scrollTop: ${window.scrollY}px`});let y=1;const h={1:"first",2:"second",3:"third",4:"fourth",5:"fifth",6:"sixth"};d.addEventListener("click",()=>{3===y?(document.querySelector("#photo3").classList.remove("active"),document.querySelector("#photo2").classList.remove("active"),y=1):y+=1,document.querySelector("#photo"+y).classList.add("active")}),l.addEventListener("click",()=>{a.classList.add("formsOpened"),document.querySelector(".overlay").classList.remove("hidden")});const L=()=>{a.classList.remove("formsOpened"),document.querySelector(".overlay").classList.add("hidden")};document.querySelector(".overlay").addEventListener("click",()=>{L()}),document.addEventListener("keydown",e=>{"Escape"!=e.key||a.classList.contains("hidden")||L()}),(createElementsInItemBoxes=()=>{for(let e=1;e<7;e++){let t=document.createElement("img");t.classList.add("itemImage");let n=document.createElement("span");n.classList.add("itemName");let c=document.createElement("span");c.classList.add("itemPrice");let s=document.querySelector(`.${h[e]}`);s.appendChild(t),s.appendChild(n),s.appendChild(c)}})();const g=e=>{for(let t=1;t<7;t++){let n=document.querySelector(`.item.${h[t]}`);n.setAttribute("data-itemtype",`${e[0]}`),n.setAttribute("data-item",`${e[t]}`),document.getElementsByClassName("itemImage")[t-1].setAttribute("src",`${e[t].imageSource}`),document.getElementsByClassName("itemName")[t-1].innerHTML=`${e[t].name}`,document.getElementsByClassName("itemPrice")[t-1].innerHTML=`${e[t].price/100}$`}};fetch("http://localhost:3000/items").then(e=>e.json()).then(a=>{e=a.guitars,t=a.bass,n=a.keys,c=a.drums,s=a.amps,g(e),o=[n,c,e,t,s],r={guitars:e,drums:c,bass:t,amps:s,keys:n}}).catch(e=>{console.error(e)});for(let e=0;e<i.length;e++)i[e].addEventListener("click",()=>{document.querySelector(".currentItemButton").classList.remove("currentItemButton"),i[e].classList.add("currentItemButton"),g(o[e]),addToCartButtons.forEach(e=>e.classList.remove("addToCartBtnClicked"))});let I=0,v=[];m.addEventListener("click",()=>{u.classList.toggle("cartOpened")});const E=()=>{countCartItemsImage.innerHTML=`${I}`},C=()=>{let e=0;v.forEach(t=>e+=parseInt(t.price/100*t.quantity)),totalPrice.innerHTML=`Total ${e}$`};for(let e=0;e<addToCartButtons.length;e++)addToCartButtons[e].addEventListener("click",()=>{if(I<=5){let t=addToCartButtons[e];addToCartButtons[e].classList.add("addToCartBtnClicked");let n=r[document.querySelectorAll(".item")[e].dataset.itemtype][e+1];if(n.quantity=1,!v.includes(n)){v.push(n),console.log(v);let e=document.createElement("div");e.classList.add("cartItem"),p.appendChild(e);let c=document.createElement("p");c.classList.add("cartItemName"),c.innerHTML=n.name,e.appendChild(c);let s=document.createElement("img");s.setAttribute("src","../img/minus.png"),s.classList.add("minusIcon"),e.appendChild(s);let o=document.createElement("input");o.classList.add("cartItemQuantity"),o.setAttribute("value","1"),o.setAttribute("type","number"),o.setAttribute("min","1"),o.setAttribute("max","5"),e.appendChild(o);let r=document.createElement("img");r.setAttribute("src","../img/plus.png"),r.classList.add("plusIcon"),e.appendChild(r);let a=document.createElement("p");a.classList.add("cartItemPrice"),a.innerHTML=`${n.price/100}$`,e.appendChild(a),I+=1,E(),C();let d=()=>{let e=o.value,t=parseInt(`${n.price/100}$`);v=v.filter(e=>e!=n),n.quantity=parseInt(e),console.log(v),v.push(n);for(let n=0;n<e;n++)a.innerHTML=`${t*e}$`;C()};s.addEventListener("click",()=>{o.stepDown(),d()}),r.addEventListener("click",()=>{o.stepUp(),d()});let l=document.createElement("img");l.classList.add("removeItemButton"),l.setAttribute("src","../img/cross.png"),e.appendChild(l),B(l,e,n,t)}}else alert("Cart is full ;)")});const B=(e,t,n,c)=>{e.addEventListener("click",()=>{t.remove(),v=v.filter(e=>e!=n),I-=1,E(),C(),c.classList.remove("addToCartBtnClicked")})};checkout.addEventListener("click",()=>{fetch("http://localhost:3000/create-checkout-session",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({items:v})}).then(e=>e.ok?e.json():e.json().then(e=>Promise.reject(e))).then(({url:e})=>{window.location=e}).catch(e=>{console.error(e)})}),window.onsubmit=e=>{e.preventDefault(),console.log(issueReportInput.value),issueReportInput.value="",document.querySelector(".acceptImage").classList.add("acceptImageOpened"),setTimeout(function(){document.querySelector(".acceptImage").classList.remove("acceptImageOpened")},2e3)};
//# sourceMappingURL=index.5a2bf68b.js.map