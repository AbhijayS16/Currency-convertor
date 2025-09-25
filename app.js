let btn = document.querySelector("#btn");
let img1 = document.querySelector(".from img");
let img2 = document.querySelector(".to img");
let fromCurr = document.querySelector(".from select");
let toCurr = document.querySelector(".to select");
let msg = document.querySelector(".msg");
let dropdowns = document.querySelectorAll("select");

const BASE_URL =
    "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";



btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amt = amount.value;
    if(amt === "" || amt < 1 ){
        amt = 1;
        amount.value = "1";
    }
    

    let URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;

    let to = toCurr.value.toLowerCase();
    let from = fromCurr.value.toLowerCase();

    let response = await fetch(URL);
    let data = await response.json();
    console.log(data[from][to]);

    let finalAmt = amt * data[from][to];
    msg.innerText = `${amt} ${from} = ${finalAmt} ${to}`;

});

for (let select of dropdowns) {
    for (currencyCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currencyCode;
        newOption.value = currencyCode;
        if (select.name == "from" && currencyCode == "USD")
            newOption.selected = "selected";
        if (select.name == "to" && currencyCode == "INR")
            newOption.selected = "selected";
        select.append(newOption);
    }

    select.addEventListener("change",(evt) => {
        
        updateFlag(evt.target);
    })
};

let updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];

    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;

    let img = element.parentElement.querySelector("img");

    img.src = newSrc;
};

