
if(document.readyState=='loading'){
    document.addEventListener('DOMContentLoaded',ready)
}else{
    ready();
}
function ready(){
    const removeCartItemsButton=document.querySelectorAll(".btn-danger");
    //remove item
    removeCartItemsButton.forEach((btn)=>{
        btn.addEventListener("click",removeCartItem);
    })

    // change the input
    var quantityInput=document.querySelectorAll('.cart-quantity-input');
    quantityInput.forEach((item)=>{
        item.addEventListener('change',quantityChanged)
    })

    //add to cart

    const addToCartBtns=document.querySelectorAll('.shop-item-button')
    addToCartBtns.forEach((btn)=>{
        btn.addEventListener('click',addToCart)
    })

    // purchase btn

   document.querySelector('.btn-purchase').addEventListener('click',purchased);
    

}

// Functions
function removeCartItem(e){
    const btnClicked=e.target;
            btnClicked.parentElement.parentElement.remove();
            updateTotal();
}

function quantityChanged(e){
    const input=e.target;
    if(isNaN(input.value) || input.value<=0){
        input.value=1;
    }
    updateTotal();
}

//add to cart
function addToCart(e){
    const btn=e.target;
    
    const shopItem=btn.parentElement.parentElement;
    const title=shopItem.querySelector('.shop-item-title').innerText;
    const price=shopItem.querySelector('.shop-item-price').innerText;
    const img=shopItem.querySelector('.shop-item-image').src;

    addedItemToCart(title,price,img);
    updateTotal();
}




function addedItemToCart(title,price,img){
    const cartRow=document.createElement('div');
    cartRow.classList.add('cart-row')
    const cartItem=document.querySelector('.cart-items')
   
    const cartItemNames=cartItem.getElementsByClassName('cart-item-title');
    for(let i=0;i<cartItemNames.length;i++){
        if(cartItemNames[i].innerText===title){
            alert('already exist');
            return
        }
    }

    const htmlContent=`
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${img}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>
`
    cartRow.innerHTML=htmlContent;
    cartItem.append(cartRow);
    cartRow.querySelector('.btn-danger').addEventListener('click',removeCartItem)
    cartRow.querySelector('.cart-quantity-input').addEventListener('change',quantityChanged)
}

//purhcased

function purchased(){
    alert("HAPPY SHOPPING")
    const cartItem=document.querySelector('.cart-items')

    while(cartItem.hasChildNodes()){
        cartItem.removeChild(cartItem.firstChild);

    }
    updateTotal()
}


function updateTotal(){
   var cartItemsContainer=document.getElementsByClassName('cart-items')[0];
   var cartRows=cartItemsContainer.getElementsByClassName('cart-row');
   var total=0;
   for(let i=0;i<cartRows.length;i++){
    let cartRow=cartRows[i];
    var priceElement=cartRow.getElementsByClassName('cart-price')[0];
    var quantityElement=cartRow.getElementsByClassName('cart-quantity-input')[0];
    var price=parseFloat(priceElement.innerText.replace("$",""));
    var quantity=quantityElement.value;
    total=total+(quantity*price);
   }
   document.getElementsByClassName('cart-total-price')[0].innerText=("$"+total.toFixed(2))
}

