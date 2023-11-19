



 var lable = document.getElementById("lable") 
 var shoppingCart = document.getElementById("purchase-list-cart") 



let basket =JSON.parse(localStorage.getItem("data")) || [];
let calculation =()=>{
    let carticon= document.getElementById("cartAmount");
    carticon.innerHTML=basket.map((x)=>x.item).reduce((x,y)=>x+y,0)
    // console.log(basket.map((x)=>x.item).reduce((x,y)=>x+y,0));
 };
 
 calculation();
 let genratecarItem =()=>{
    if(basket.length !==0){
        return  shoppingCart.innerHTML=basket.map((x)=>{
           
            let {id,item}=x;
             let search =  shopItemData.find((f)=>f.id===id) || []
              let {img,name,price}=search;
            return `
            <div class="Item-list">
            <img width="100" src=${img} />
            <div class="details">
                 <div class="name-price-bn">
                    <h4 class="name-price"><p>${name}</p>
                     <p  class="button1">$ ${price}</p>
                    </h4>
                     <i onclick=" removeItem(${id})" class="bi bi-x-octagon"></i>
                </div>
                  <div class="button">
                      <i onclick="dcrement(${id})" class="bi bi-dash-lg"></i>
                         <div id=${id} class="quantity">${item}
                         </div>
                       <i  onclick="increment(${id})" class="bi bi-plus"></i>
                        
                 </div>
                 <h3 style="padding:10px;">$ ${item*search.price}</h3> 
            </div>
            
            </div>
              
            ` 
        }).join("");
    }
     else{
        shoppingCart.innerHTML=``;
        lable.innerHTML=`
        <h2>Cart is Empty</h2>
        <a href="index.html">
        <button  class="Homebtn">Back to home<button>
        </a>
        `;
   }
    
 }
 genratecarItem();

 
 let increment = (id) =>{
  let selectItem=id;
 let search=basket.find((x)=>x.id===selectItem.id);
 if(search===undefined){
  basket.push({
     id:selectItem.id,
     item:1,
  });
 }else{search.item+=1;}
 localStorage.setItem("data",JSON.stringify(basket));
  
 genratecarItem();
  update(selectItem.id);
};
let dcrement = (id) =>{
  let selectItem=id;
 let search=basket.find((x)=>x.id===selectItem.id);
 if(search===undefined)return;
 else if(search.item===0)return;
 else{search.item-=1;}
 update(selectItem.id);
  basket=basket.filter((x)=>x.item!==0);
  genratecarItem();
 
 localStorage.setItem("data",JSON.stringify(basket));
};
let update = (id) =>{
  let search=basket.find((x)=>x.id===id);
  // console.log(search.item);
  document.getElementById(id).innerHTML=search.item;
  calculation();   toTal ();
};



 let removeItem = (id)=>{
  let selectItem =id;
  basket=basket.filter((a) => a.id !== selectItem.id)
  genratecarItem();
  calculation();
  toTal ();
  localStorage.setItem("data",JSON.stringify(basket));
 }
  let clearCart=()=>{
    basket=[]
    genratecarItem();
    calculation();
    calculation();  
  localStorage.setItem("data",JSON.stringify(basket));

  }


   let toTal =()=>{
    if(basket.length!==0){
      let price1 = basket.map((r)=>{
        let {item,id}=r;
        let search =  shopItemData.find((f)=>f.id===id) || []
        return item * search.price
      }).reduce((q,w)=>q+w,0);
      // console.log(price1);
      lable.innerHTML=`
       <h2>Total Bill $ ${price1}</h2>
       <button class="checkout">Checkout<button>
       <button onclick="clearCart()" class="removeallw">Clear Cart<button>
      `
    }else return;
   }
   toTal ();