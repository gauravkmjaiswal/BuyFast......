
const sLen=function(str)
{
  if(str.length >90)
  return `${str.substr(0,90)}....`
  else
  {
    return str
  }
}


const cardItem=function(items){

items.forEach(item =>{
  

  let mainData=`<div class="card">
  <div class="cardImage">
    
    <a href="${item.product_detail_url}"> <img src="${item.product_main_image_url}" height="70%" > </a>
 
  </div>
  <div class="cardName">
 ${ sLen(item.product_title)}
 
  </div>
  <div class="cardPrice">
   ${item.app_sale_price_currency} ${item.app_sale_price}
  </div>
    

</div>`

document.querySelector('.mid_A').insertAdjacentHTML('beforeend',mainData)
} );
}



const mart=async function(itemS)
{
  const raw=await fetch(`https://amazon24.p.rapidapi.com/api/product?country=US&keyword=${itemS}&page=3&filter=aHR0cHM6Ly93d3cuYW1hem9uLmNvbS9zP2s9aXBob25lJnJoPXBfbl9jb25kaXRpb24tdHlwZSUzQVVzZWQmZGMmcWlkPTE2MTI0MTg5NTMmcmVmPXNyX25yX3Bfbl9jb25kaXRpb24tdHlwZV8y&categoryID=aps`, {
    "method": "GET",
    "headers": {
      "x-rapidapi-key": "3c1f6ddbb9mshb50ebee3475b113p121c3ejsn402a5254a6d5",
      "x-rapidapi-host": "amazon24.p.rapidapi.com"
    }
  })

  const dataCollection=await raw.json()
   data=  dataCollection.docs
  console.log(data)
   cardItem(data);
}

let j=0;
if(j===0)
{
mart("Realme")
j=1
}


document.querySelector('.navBar_A_4').addEventListener("click", startCompletely);

async function startCompletely() {
  let searchText=document.querySelector('.search').value;
  document.querySelector('.mid_A').innerHTML=''
  // console.log(searchText)
  await document.querySelector('.mid_A').insertAdjacentHTML('beforeend',mart(searchText))
}


// document.querySelector('.mid_A').insertAdjacentHTML('beforeend',mainData)