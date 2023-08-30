

let shop = document.getElementById("shop");
// console.log(shop);

let cardItemsData = [{
    id: "salkdq",
    name: "Casual Shirt",
    price: 45,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    img: "./assets/sneaker1.jpg.jpg",

}, {
    id: "kkklklkd",
    name: "Office clothing",
    price: 100,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    img: "./assets/shirt.jpg.jpg",
}, {
    id: "iidkkdl",
    name: "Casual Shirt",
    price: 50,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    img: "./assets/sneaker1.jpg.jpg",
}, {
    id: "ookodsad",
    name: "just Shirt",
    price: 20,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    img: "./assets/sneaker1.jpg.jpg",
}, {
    id: "salkdq",
    name: "Casual Shirt",
    price: 45,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    img: "./assets/sneaker1.jpg.jpg",
}]



const generateCard = ()=>{
    return shop.innerHTML = cardItemsData.map((element)=>{
        let {id, name, price, desc, img} = element;
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
                    <div id=${id}  class="quantity">0</div>
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
    console.log(id);
}
const decrement = ()=>{
    console.log(id);
}
const update = ()=>{}


