const BASE_URL="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns=document.querySelectorAll(".dropdown select");

let btn=document.querySelector("form button");
let fromV=document.querySelector(".from select");
let toV=document.querySelector(".to select");
let msg=document.querySelector(".msg");
let amount=document.querySelector(".amount input");

const updateRate = async () => {
    let amtVal = amount.value;
    const URL = `${BASE_URL}/${fromV.value.toLowerCase()}.json`;
    const resp = await fetch(URL);
    const data = await resp.json();
    let rate = data[fromV.value.toLowerCase()][toV.value.toLowerCase()];
    let result = rate * amtVal;
    if(amtVal===""){
        result=rate;
        amtVal=1;
    }
    msg.innerText = `${amtVal} ${fromV.value} = ${result} ${toV.value}`;
}

for(let select of dropdowns){
    for(currCode in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=currCode;
        newOption.value=currCode;
        if(select.name==="from" && currCode==="USD"){
            newOption.selected="selected";
        }else if(select.name==="to" && currCode==="INR"){
            newOption.selected="selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
        updateRate();
    })
}
updateFlag=(element)=>{
    let currCode=element.value;
    let countryCode=countryList[currCode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newSrc;
}

btn.addEventListener("click", async (evt)=>{
    evt.preventDefault();
    amount=document.querySelector(".amount input");
    amtVal=amount.value;
    const URL=`${BASE_URL}/${fromV.value.toLowerCase()}.json`;
    const resp= await fetch(URL);
    const data=await resp.json();
    let rate=data[fromV.value.toLowerCase()][toV.value.toLowerCase()];
    let result=rate*amtVal;
    msg.innerText=`${amtVal} ${fromV.value}= ${result} ${toV.value}`;
    updateRate();
})

let exchangeBtn=document.getElementById("exchange");
exchangeBtn.addEventListener("click",()=>{
    let temp=fromV.value;
    fromV.value=toV.value;
    toV.value=temp;
    updateFlag(fromV);
    updateFlag(toV);
    updateRate();
});