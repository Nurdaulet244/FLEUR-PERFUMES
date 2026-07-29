/* =================================
   FLEUR PERFUMES
   MAIN JAVASCRIPT
================================= */


/* ================================
   PRODUCTS
================================ */


const products = [

{
id:1,
name:"Honour",
brand:"Amouage",
image:"./images/amouage-honour.jpg",
description:"Роскошный восточный аромат с цветочными и пряными нотами."
},

{
id:2,
name:"Chance Eau Tendre",
brand:"Chanel",
image:"./images/chance-eau-tendre.jpg",
description:"Нежный женственный аромат с нотами фруктов, розы и жасмина."
},

{
id:3,
name:"Vétiver d'Haïti au thé vert",
brand:"Chopard",
image:"./images/chopard-vetiver.jpg",
description:"Свежий древесный аромат с зелёным чаем и ветивером."
},

{
id:4,
name:"Dior Homme Intense",
brand:"Dior",
image:"./images/dior-homme-intense.jpg",
description:"Элегантный мужской аромат с ирисом и древесными нотами."
},

{
id:5,
name:"Blackberry & Bay",
brand:"Jo Malone",
image:"./images/jo-malone-blackberry.jpg",
description:"Свежий аромат ежевики с зелёными нотами."
},

{
id:6,
name:"Peony & Blush Suede",
brand:"Jo Malone",
image:"./images/jo-malone-peony.jpg",
description:"Нежный цветочный аромат с пионом и мягкой кожей."
},

{
id:7,
name:"Angel's Share",
brand:"Kilian",
image:"./images/kilian-angels-share.jpg",
description:"Сладкий аромат с коньяком, корицей и ванилью."
},

{
id:8,
name:"Love Don't Be Shy",
brand:"Kilian",
image:"./images/kilian-love.jpg",
description:"Сладкий женственный аромат с карамелью и ванилью."
},

{
id:9,
name:"Idôle",
brand:"Lancôme",
image:"./images/lancome-idole.jpg",
description:"Современный цветочный аромат с розой и жасмином."
},

{
id:10,
name:"Attrape-Rêves",
brand:"Louis Vuitton",
image:"./images/lv-attrape-reves.jpg",
description:"Воздушный аромат с пионом, личи и какао."
}

];



/* ================================
   CART STORAGE
================================ */


let cart = JSON.parse(
localStorage.getItem("fleurCart")
) || [];





/* ================================
   LOAD PRODUCTS
================================ */


function loadProducts(){


const container =
document.getElementById("products");


if(!container) return;



container.innerHTML="";



products.forEach(product=>{


container.innerHTML += `

<div class="product-card">


<img 
src="${product.image}"
alt="${product.name}"
>



<h3>

<a href="product.html?id=${product.id}">

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
onclick="addToCart(${product.id},this)"
>

🛒 В корзину

</button>



<a 
class="btn dark"
target="_blank"
href="https://wa.me/77781655756"
>

WhatsApp

</a>


</div>

`;

});


}





/* ================================
   CHANGE PRICE
================================ */


document.addEventListener(
"change",
e=>{


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
   ADD CART
================================ */


function addToCart(id,button){


let product =
products.find(
p=>p.id===id
);



let card =
button.closest(".product-card");



let select =
card.querySelector(".volume");



let item={

name:product.name,

brand:product.brand,

volume:
select.options[
select.selectedIndex
].text,

price:
Number(select.value)

};



cart.push(item);



localStorage.setItem(
"fleurCart",
JSON.stringify(cart)
);



alert(
product.name+" добавлен в корзину 🛒"
);


}








/* ================================
   SEARCH
================================ */


document.addEventListener(
"input",
e=>{


if(
e.target.id==="search"
){


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
   FILTER
================================ */


document.addEventListener(
"change",
e=>{


if(
e.target.id==="brandFilter"
){


let brand=e.target.value;



document
.querySelectorAll(".product-card")
.forEach(card=>{


card.style.display =

brand==="all" ||
card.innerText.includes(brand)

?

"block"

:

"none";


});


}


});








/* ================================
   PRODUCT PAGE
================================ */


function loadProduct(){


let id =
new URLSearchParams(
location.search
)
.get("id");



let product =
products.find(
p=>p.id==id
);



if(!product)
return;



document
.getElementById("productName")
.innerHTML =
product.name;



document
.getElementById("productBrand")
.innerHTML =
product.brand;



document
.getElementById("productDescription")
.innerHTML =
product.description;



document
.getElementById("productImage")
.src =
product.image;


}







/* ================================
   CART PAGE
================================ */


function loadCart(){


let box =
document.getElementById("cartItems");


if(!box)
return;



let total=0;


box.innerHTML="";



cart.forEach(
(item,index)=>{


total+=item.price;



box.innerHTML += `


<div class="cart-item">


<h3>
${item.name}
</h3>


<p>
${item.volume}
</p>


<p>
${item.price} ₸
</p>


<button onclick="removeCart(${index})">
Удалить
</button>


</div>


`;



});



let totalBox =
document.getElementById("total");


if(totalBox)

totalBox.innerHTML =
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




/* ================================
   WHATSAPP CHECKOUT
================================ */


function checkout(){


let text =
"Здравствуйте! Хочу заказать:%0A%0A";



cart.forEach(item=>{


text +=

`${item.name} ${item.volume} - ${item.price} ₸%0A`;


});



window.open(

"https://wa.me/77781655756?text="+text,

"_blank"

);


}





/* ================================
   AUTO START
================================ */


document.addEventListener(
"DOMContentLoaded",
()=>{


loadProducts();

loadProduct();

loadCart();


});