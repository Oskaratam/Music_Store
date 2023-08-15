const container = document.querySelector("main"), formDialog = document.querySelector(".formDialog"), arrow_right = document.getElementById("arrow_right"), homeLogInBtn = document.getElementById("homeLogInBtn");
//CONNECTING FORMS FILE
fetch("./Forms/forms.html").then((res1)=>res1.text()).then((data)=>{
    formDialog.innerHTML = data;
    const parser = new DOMParser();
    const doc = parser.parseFromString(data, "text/html");
    eval(doc.querySelector("script").textContent);
});
//CHANGING BACKGROUNDS//
let currentBg = 1, bg;
let changeBg = ()=>{
    if (currentBg === 3) {
        document.querySelector("#photo3").classList.remove("active");
        document.querySelector("#photo2").classList.remove("active");
        currentBg = 1;
    } else currentBg += 1;
    document.querySelector("#photo" + currentBg).classList.add("active");
};
arrow_right.addEventListener("click", changeBg);
homeLogInBtn.addEventListener("click", ()=>{
    formDialog.classList.add("formsOpened");
    document.querySelector(".overlay").classList.remove("hidden");
});
const closeForms = ()=>{
    formDialog.classList.remove("formsOpened");
    document.querySelector(".overlay").classList.add("hidden");
};
document.querySelector(".overlay").addEventListener("click", ()=>{
    closeForms();
});
document.addEventListener("keydown", (e1)=>{
    if (e1.key == "Escape" && !formDialog.classList.contains("hidden")) closeForms();
});

//# sourceMappingURL=index.27a62f76.js.map
