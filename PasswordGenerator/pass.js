const result = document.querySelector("#result")
const passLength = document.querySelector("#length");
const uppercase = document.querySelector("#uppercase");
const lowercase = document.querySelector("#lowercase");
const numbers = document.querySelector("#numbers");
const symbols = document.querySelector("#symbols");
const submit = document.querySelector("#generate");

const upperLettters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerLetters = "abcdefghijklmopqrstuvwxyz";
const numberList = "1234567890";
const symbolsList = "!@#$%^&*()_";

function getUpper(){
    return upperLettters[Math.floor(Math.random() * upperLettters.length)];
}
function getLower(){
    return lowerLetters[Math.floor(Math.random() * lowerLetters.length)];
}
function getnumbers(){
    return numberList[Math.floor(Math.random() * numberList.length)];
}
function getsymbols(){
    return symbolsList[Math.floor(Math.random() * symbolsList.length)];
}
function generatePass(){
    const len=passLength.value;
    let password='';
    for(let i=0;i<len;i++){
        let x = generateX();
        if(x==undefined) x="";
        password+=x;
    }
    result.value = password;
}

function generateX(){
    full_array = [];
    if (uppercase.checked) full_array.push(getUpper());
    if (lowercase.checked) full_array.push(getLower());
    if (numbers.checked) full_array.push(getnumbers());
    if (symbols.checked) full_array.push(getsymbols());
    return full_array[Math.floor(Math.random()*full_array.length)];
}

submit.addEventListener("click",function(){
    if (passLength.value<6){
        alert("Password length must be at least 6");
        return;
    }
    generatePass();
});