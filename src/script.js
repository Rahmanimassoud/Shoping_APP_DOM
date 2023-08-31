

let shop = document.getElementById("shop");
// console.log(shop);


// store the data to show which specific item we have selected.
let basket = JSON.parse(localStorage.getItem("data")) || [];


const generateCard = ()=>{
    return shop.innerHTML = cardItemsData.map((element)=>{
        let {id, name, price, desc, img} = element;
        let search = basket.find((element)=>element.id === id) || [];
        return `
        <div id=product-id-${id} class="item">
        <img width="300" src=${img} alt="Sneaker">
        <div class="details">
            <h3>${name}</h3>
            <p>${desc}</p>
            <div class="price-quantity">
                <h2 id="price">$ ${price}</h2>
                <div class="price-button">
                    <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                    <div id=${id}  class="quantity">${search.item === undefined? 0: search.item}</div>
                    <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                </div>
            </div>
        </div>
    </div>
        
        `
    }).join(" ");

};
generateCard();


// increment/decrement and update functions
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
    // console.log(basket);
    update(selectedItem.id);

    // adding/setting the data/increment number to local storage
    localStorage.setItem("data", JSON.stringify(basket));
}
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
    basket = basket.filter((element)=>element.item !==0)

    
    // adding/setting the data/decrement number to local storage
    localStorage.setItem("data", JSON.stringify(basket));
};


const update = (id)=>{
    // search to see if the item is not included than change the number
    let search = basket.find((element)=> element.id === id);
    // console.log(search.item);
    document.getElementById(id).innerHTML = search.item;
    calculateNumber();
}


// Add all the numbers and display it in the shopping cart, should increase and decrease.

const calculateNumber = ()=>{
    let cartNumber = document.getElementById("cartAmount");
    // console.log(basket);
    cartNumber.innerHTML = basket.map((e)=>e.item).reduce((e, i) => e + i, 0)
};
calculateNumber();