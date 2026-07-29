/* =================================
   FLEUR PERFUMES
   CATALOG SYSTEM
================================= */


const products = [


{
name:"Honour",
brand:"Amouage",
image:"images/amouage-honour.jpg",
description:"Роскошный восточный аромат с цветочными и пряными нотами."
},



{
name:"Chance Eau Tendre",
brand:"Chanel",
image:"images/chance-eau-tendre.jpg",
description:"Нежный женственный аромат с нотами фруктов, розы и жасмина."
},



{
name:"Vétiver d'Haïti au thé vert",
brand:"Chopard",
image:"images/chopard-vetiver.jpg",
description:"Свежий древесный аромат с зелёным чаем и ветивером."
},



{
name:"Dior Homme Intense",
brand:"Dior",
image:"images/dior-homme-intense.jpg",
description:"Элегантный мужской аромат с ирисом и древесными нотами."
},



{
name:"Blackberry & Bay",
brand:"Jo Malone",
image:"images/jo-malone-blackberry.jpg",
description:"Свежий аромат ежевики с зелёными нотами."
},



{
name:"Peony & Blush Suede",
brand:"Jo Malone",
image:"images/jo-malone-peony.jpg",
description:"Нежный цветочный аромат с пионом и мягкой кожей."
},



{
name:"Angel's Share",
brand:"Kilian",
image:"images/kilian-angels-share.jpg",
description:"Сладкий аромат с коньяком, корицей и ванилью."
},



{
name:"Love Don't Be Shy",
brand:"Kilian",
image:"images/kilian-love.jpg",
description:"Сладкий женственный аромат с карамелью и ванилью."
},



{
name:"Idôle",
brand:"Lancôme",
image:"images/lancome-idole.jpg",
description:"Современный цветочный аромат с розой и жасмином."
},



{
name:"Attrape-Rêves",
brand:"Louis Vuitton",
image:"images/lv-attrape-reves.jpg",
description:"Воздушный аромат с пионом, личи и какао."
}



];





let cart = JSON.parse(
localStorage.getItem("fleurCart")
) || [];






/* ================================
   LOAD CATALOG
================================ */


function loadProducts(){


let container =
document.getElementById("products");



if(!container)
return;



container.innerHTML="";



products.forEach(product=>{


container.innerHTML += `


<div class="product-card">


<img 
src="${product.image}"
alt="${product.name}"
>



<h3>

<a href="product.html?id=${product.name}">

${product.name}

</a>

</h3>



<p class="brand">

${product.brand}

</p>



<p>

${product.description}

</p>



<select class="volume">


<option value="6000">

6 мл — 6000 ₸

</option>


<option value="10000">

8 мл — 10000 ₸

</option>


<option value="15000">

15 мл — 15000 ₸

</option>


</select>



<h3 class="price">

6000 ₸

</h3>



<button

class="btn gold"

onclick="addToCart(this)"

>

🛒 В корзину

</button>



<a

class="btn dark"

target="_blank"

href="https://wa.me/77781655756?text=Здравствуйте! Хочу заказать ${product.brand} ${product.name}"

>

WhatsApp

</a>



</div>


`;

});


}









/* ================================
   PRICE CHANGE
================================ */


document.addEventListener(
"change",
function(e){


if(
e.target.classList.contains("volume")
){


let card =
e.target.closest(".product-card");


card.querySelector(".price").innerHTML =
e.target.value+" ₸";


}


});









/* ================================
   ADD TO CART
================================ */


function addToCart(button){


let card =
button.closest(".product-card");



let name =
card.querySelector("h3 a").innerText;



let volume =
card.querySelector(".volume");



let product={


name:name,


volume:
volume.options[
volume.selectedIndex
].text,


price:
volume.value


};



cart.push(product);



localStorage.setItem(
"fleurCart",
JSON.stringify(cart)
);



alert(
name+" добавлен в корзину 🛒"
);


}









/* ================================
   SEARCH
================================ */


document.addEventListener(
"input",
function(e){


if(e.target.id==="search"){


let value =
e.target.value.toLowerCase();



document
.querySelectorAll(".product-card")
.forEach(card=>{


card.style.display =

card.innerText
.toLowerCase()
.includes(value)

?

"block"

:

"none";


});


}


});









/* ================================
   FILTER BRAND
================================ */


document.addEventListener(
"change",
function(e){


if(e.target.id==="brandFilter"){


let brand =
e.target.value;



document
.querySelectorAll(".product-card")
.forEach(card=>{


if(
brand==="all" ||
card.innerText.includes(brand)

)

{

card.style.display="block";

}

else{

card.style.display="none";

}


});


}


});









/* ================================
   PRODUCT PAGE
================================ */


function loadProduct(){


let params =
new URLSearchParams(
window.location.search
);


let id =
params.get("id");



if(!id)
return;



let product =
products.find(
p=>p.name===id
);



if(!product)
return;



document.getElementById("productName").innerHTML =
product.name;



document.getElementById("productBrand").innerHTML =
product.brand;



document.getElementById("productDescription").innerHTML =
product.description;



document.getElementById("productImage").src =
product.image;


}









/* ================================
   CART
================================ */


function loadCart(){


let box =
document.getElementById("cartItems");



if(!box)
return;



let total=0;



box.innerHTML="";



cart.forEach((item,index)=>{


total += Number(item.price);



box.innerHTML += `


<div class="cart-item">


<h3>${item.name}</h3>


<p>${item.volume}</p>


<p>${item.price} ₸</p>


<button onclick="removeCart(${index})">

Удалить

</button>


</div>


`;



});



document.getElementById("total").innerHTML =
"Итого: "+total+" ₸";


}






function removeCart(index){


cart.splice(index,1);



localStorage.setItem(
"fleurCart",
JSON.stringify(cart)
);



loadCart();


}







function checkout(){


let text =
"Здравствуйте! Хочу заказать:%0A%0A";



cart.forEach(item=>{


text +=

item.name+
" "+
item.volume+
" - "+
item.price+
" ₸%0A";


});



window.open(

"https://wa.me/77781655756?text="+text,

"_blank"

);


}