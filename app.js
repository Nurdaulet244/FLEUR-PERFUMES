/* =========================
   FLEUR PERFUMES APP.JS
========================= */


/* =========================
   DISPLAY PRODUCTS
========================= */


function displayProducts(list = products){

    const container = document.getElementById("products");

    if(!container) return;


    container.innerHTML = "";


    list.forEach(product => {


        container.innerHTML += `

        <div class="product-card">


            <img 
            src="${product.image}"
            alt="${product.name}"
            loading="lazy"
            >


            <h3>
            ${product.name}
            </h3>


            <p class="brand">
            ${product.brand}
            </p>


            <p class="description">
            ${product.description}
            </p>


            <button
            class="btn gold"
            onclick="addToCart(${product.id})"
            >

            🛒 В корзину

            </button>


        </div>

        `;


    });


}





/* =========================
   SEARCH FILTER
========================= */


function initCatalog(){


    if(typeof products === "undefined") return;


    displayProducts();



    const search =
    document.getElementById("search");


    const brandFilter =
    document.getElementById("brandFilter");



    function filterProducts(){


        let result = products;



        if(search){


            const text =
            search.value
            .toLowerCase()
            .trim();



            if(text){


                result =
                result.filter(product =>


                    product.name
                    .toLowerCase()
                    .includes(text)


                    ||


                    product.brand
                    .toLowerCase()
                    .includes(text)


                );


            }


        }




        if(
        brandFilter &&
        brandFilter.value !== "all"
        ){


            result =
            result.filter(product =>

            product.brand === brandFilter.value

            );


        }



        displayProducts(result);


    }




    if(search){

        search.addEventListener(
            "input",
            filterProducts
        );

    }




    if(brandFilter){

        brandFilter.addEventListener(
            "change",
            filterProducts
        );

    }


}








/* =========================
   CART STORAGE
========================= */


function getCart(){


    return JSON.parse(
        localStorage.getItem("cart")
    ) || [];


}






function saveCart(cart){


    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


}







/* =========================
   ADD TO CART
========================= */


function addToCart(id){


    if(typeof products === "undefined")
    return;



    let cart = getCart();



    let product =
    products.find(item =>
        item.id === id
    );



    if(product){


        cart.push(product);


        saveCart(cart);



        alert(
        product.name +
        " добавлен в корзину"
        );


    }


}







/* =========================
   LOAD CART
========================= */


function loadCart(){


    const container =
    document.getElementById("cartItems");



    const total =
    document.getElementById("total");



    if(!container)
    return;



    let cart =
    getCart();



    container.innerHTML="";




    if(cart.length===0){


        container.innerHTML = `

        <h3>
        Корзина пустая
        </h3>

        `;


        if(total)
        total.innerHTML="";


        return;


    }





    cart.forEach((item,index)=>{


        container.innerHTML += `


        <div class="cart-item">


            <img 
            src="${item.image}"
            >


            <div>


                <h3>
                ${item.name}
                </h3>


                <p>
                ${item.brand}
                </p>


                <button
                class="btn dark"
                onclick="removeCart(${index})"
                >

                Удалить

                </button>


            </div>


        </div>


        `;


    });




    if(total){


        total.innerHTML =

        "Всего товаров: "
        +
        cart.length;


    }


}








/* =========================
   REMOVE CART
========================= */


function removeCart(index){


    let cart =
    getCart();



    cart.splice(index,1);



    saveCart(cart);



    loadCart();


}







/* =========================
   WHATSAPP ORDER
========================= */


function checkout(){


    let cart =
    getCart();



    if(cart.length===0){


        alert(
        "Корзина пустая"
        );


        return;


    }



    let message =
    "Здравствуйте, FLEUR PERFUMES!%0A%0A";


    message +=
    "Хочу заказать:%0A";




    cart.forEach(item=>{


        message +=

        "- "
        +
        item.name
        +
        " ("
        +
        item.brand
        +
        ")%0A";


    });





    window.open(

    "https://wa.me/77781655756?text="
    +
    message

    );


}









/* =========================
   WHOLESALE
========================= */


function sendWholesale(){


    const name =
    document.getElementById("name")?.value || "";


    const company =
    document.getElementById("company")?.value || "";


    const phone =
    document.getElementById("phone")?.value || "";


    const city =
    document.getElementById("city")?.value || "";


    const aroma =
    document.getElementById("aroma")?.value || "";


    const volume =
    document.getElementById("volume")?.value || "";




    let text =

    "Здравствуйте, FLEUR PERFUMES!%0A%0A"

    +

    "Имя: "
    + name
    +"%0A"

    +

    "Компания: "
    + company
    +"%0A"

    +

    "Телефон: "
    + phone
    +"%0A"

    +

    "Город: "
    + city
    +"%0A"

    +

    "Аромат: "
    + aroma
    +"%0A"

    +

    "Объем: "
    + volume;



    window.open(

    "https://wa.me/77781655756?text="
    +
    text

    );


}






/* =========================
   START
========================= */


document.addEventListener(
"DOMContentLoaded",
()=>{


    initCatalog();


    loadCart();


});