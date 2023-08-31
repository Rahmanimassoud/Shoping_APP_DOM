

let label = document.getElementById("label");
let shoppingCart = document.getElementById("shoping-cart")
// console.log(cardItemsData);

// get the already stored data from local storage and show it in the cart page.
let basket = JSON.parse(localStorage.getItem("data")) || [];

const calculateNumber = ()=>{
    let cartNumber = document.getElementById("cartAmount");
    // console.log(basket);
    cartNumber.innerHTML = basket.map((e)=>e.item).reduce((e, i) => e + i, 0)
};
calculateNumber();


// function to generate cards for the selected items 
const generateCartItems = ()=>{
    if(basket.length !==0){
        return (shoppingCart.innerHTML = basket.map((element)=>{
            // console.log(element);
            // destracture the data so we only have what we need
            let {id, item} = element;
            let search = cardItemsData.find((e)=>e.id === id) || [];
            let {img, name, price} = search
            return `
            <div class="cart-item">
                <img width="150" src=${img} alt="" />
                <div class="details">
                    <div class="title-price-x">
                        <h4 class="name-price">
                            <p>${name}</p>
                            <p class="only-price">$ ${price}</p>
                        </h4>
                        <i onclick ="removeItem(${id})"  class="bi bi-bookmark-x"></i>
                    
                    </div>
                    <div class="price-button">
                        <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                        <div id=${id}  class="quantity">${item}</div>
                        <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                    </div>

                    <h3>$ ${item * search.price}</h3>
                </div>
            </div>
            `
        }).join(''));
    }
    else{
        shoppingCart.innerHTML = ``
        label.innerHTML = `
        <h2>Cart is Empty</h2>
        <a href="index.html">
            <button class="HomeBtn">Home</button>
        </a>
        `
    }
};
generateCartItems();

const increment = (id)=>{
    let selectedItem = id;
    // console.log(selectedItem.id);
// search to see if the item is already in the basket, if not ad it and if exist increase the count/number of items in the basket.
    let search = basket.find((element)=> element.id === selectedItem.id)
    if(search === undefined){
        basket.push({
            id: selectedItem.id,
            item: 1,
        });
    } 
    else {
        search.item += 1;
    }
    generateCartItems();
    update(selectedItem.id);

    // adding/setting the data/increment number to local storage
    localStorage.setItem("data", JSON.stringify(basket));
};
const decrement = (id)=>{
    let selectedItem = id;
    // console.log(selectedItem.id);

    let search = basket.find((element)=> element.id === selectedItem.id)
    if(search === undefined) return;
    else if(search.item === 0) return;
    else {
        search.item -= 1;
    }

    
    update(selectedItem.id);
    // filter the local storage, so if there is no item selected, it should not store anything in the local storage. 
    basket = basket.filter((element)=>element.item !==0);
    generateCartItems();

    
    // adding/setting the data/decrement number to local storage
    localStorage.setItem("data", JSON.stringify(basket));
};

const update = (id)=>{
    // search to see if the item is not included than change the number
    let search = basket.find((element)=> element.id === id);
    // console.log(search.item);
    document.getElementById(id).innerHTML = search.item;
    calculateNumber();
    totalAmount();
};


// function for deleting a specific card clicking the remove sign
const removeItem = (id)=>{
    let selectedItem = id;
    // console.log(selectedItem.id);

    // remove the object/cart from local storage and from the page once it's clicked
    basket = basket.filter((e)=>e.id !==selectedItem.id);
    generateCartItems(); //rerendering the carts.
    totalAmount();
    calculateNumber()
    localStorage.setItem("data", JSON.stringify(basket));
};

// function for total amout and the head section buttons

const totalAmount = ()=>{
    // if we have data in the local storage
    if(basket.length !==0){
        let amount = basket.map((e)=>{
            let {item, id} = e;
            let search = cardItemsData.find((e)=>e.id === id) || [];
            return item * search.price;
        }).reduce((previous, next)=>previous+next, 0)
        // console.log(amount);
        label.innerHTML = `
        <h2 id="AmountSection">Total Amount: $ ${amount}</2>
        <button class="checkout">Checkout</button>
        <button onclick="clearCart()" class="removeAll">Clear Cart</button>
        
        
        `
    }
    else return
}
totalAmount();

// clear cart function
const clearCart = ()=>{
    basket = []
    generateCartItems();
    calculateNumber();
    localStorage.setItem("data", JSON.stringify(basket));
}
