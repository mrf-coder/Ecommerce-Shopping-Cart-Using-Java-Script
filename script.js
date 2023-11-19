
let shop = document.getElementById("shop")
console.log(shop);

let basket =JSON.parse(localStorage.getItem("data")) || [];
let generteshop =()=> {
  
  return( shop.innerHTML=shopItemData.map((x)=>{
   let {id,name,price,desc,img}=x;
   let search = basket.find((x)=>x.id===id) || []
   return `
   <div id=product-id-${id} class="item">
   <img width="220" src=${img} alt="">
  <div class="detail">
    <h3>${name}</h3>
    <p>${desc}</p>
    <div class="price-quantity">
    <h2>$ ${price}</h2>
    <div class="button">
       <i onclick="dcrement(${id})" class="bi bi-dash-lg"></i>
         <div id=${id} class="quantity">${search.item===undefined?0:search.item}</div>
        <i  onclick="increment(${id})" class="bi bi-plus"></i>
        
    </div>
   </div>
  </div>
 </div> 
   `
  }).join(""));
    
};


generteshop();

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
   
   // console.log(basket);
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
//   console.log(basket);
  
  localStorage.setItem("data",JSON.stringify(basket));
};
let update = (id) =>{
   let search=basket.find((x)=>x.id===id);
   // console.log(search.item);
   document.getElementById(id).innerHTML=search.item;
   calculation();
};


let calculation =()=>{
   let carticon= document.getElementById("cartAmount");
   carticon.innerHTML=basket.map((x)=>x.item).reduce((x,y)=>x+y,0)
   // console.log(basket.map((x)=>x.item).reduce((x,y)=>x+y,0));
};

calculation();