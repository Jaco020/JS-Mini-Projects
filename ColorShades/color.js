const shadeBtn = document.getElementById("shade-btn");
const randomBtn = document.getElementById("random-btn");
const colorInput = document.getElementById("color-input");
const generateBtn = document.getElementById("generate-btn");
const colorSelect = document.getElementById("color-select");
const genCont = document.querySelector(".generatedCont");
const methodDesc = document.getElementById("method-desc");
var currentMethod = "shade";
shadeBtn.addEventListener("click",()=>{
    currentMethod="shade";
    genCont.innerHTML="";
    colorSelect.classList.remove("hidden");
    methodDesc.innerHTML="Enter Color and see its shades"
})
randomBtn.addEventListener("click",()=>{
    currentMethod="random";
    genCont.innerHTML="";
    colorSelect.classList.add("hidden");
    methodDesc.innerHTML="Generate palette of random colors";
})
colorSelect.addEventListener("click",()=>{
    colorInput.click();
})
colorInput.addEventListener("input",()=>{
    colorSelect.style.backgroundColor=colorInput.value;
    colorSelect.style.color= checkContrast(hextToRGB(colorInput.value));
    colorSelect.value=colorInput.value;
})
function copy(e){
    const copyText = e.target.previousSibling;
    const range = document.createRange();
    range.selectNode(copyText);
    window.getSelection().removeAllRanges(); 
    window.getSelection().addRange(range);
    document.execCommand("copy");
    window.getSelection().removeAllRanges();
}
function hextToRGB(hex){
    hex=hex.substring(1).match(/.{1,2}/g);
    let r=parseInt(hex[0],16),
        g=parseInt(hex[1],16),
        b=parseInt(hex[2],16)
    const rgb = [r,g,b];
    return(rgb);
}
function RGBtoHex(rgb){
    function hexCalc(val) {
        var hex = parseInt(val).toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }
    return "#" + hexCalc(rgb[0]) + hexCalc(rgb[1]) + hexCalc(rgb[2]); 
}
function checkContrast(rgb){
    const [r,g,b] = [rgb[0],rgb[1],rgb[2]];
    return (r * 0.299 + g * 0.587 + b * 0.114) > 186 ? '#000000':'#FFFFFF';
}
function itemColor(perc,color){
    const el = document.createElement("div");
    const hexColor = RGBtoHex(color);
    el.classList="generatedCont__item-color";
    el.innerHTML = `<p>${perc}</p><p>${hexColor}</p><p id="clipboard" onclick="copy(event)"><i class="far fa-copy"></i><p/>`;
    el.style.cssText=`background-color: ${hexColor};color:${checkContrast(color)}`;
    el.querySelector("#clipboard").addEventListener("click",()=>{
        el.querySelector("#clipboard").innerHTML="Copied to clipboard 👍";
    })
    el.querySelector("#clipboard").addEventListener("mouseout",()=>{
        el.querySelector("#clipboard").innerHTML=`<i class="far fa-copy">`;
    })
    return el;
};
function generateTintAndShades(){
    function tintCalc(v,percent){
        return (v + ((255-v) * percent)).toFixed();
    }
    const colorRGB = hextToRGB(colorSelect.value);
    var tintArray = [],shadesArray = [];
    let percent = 0.1,i=10;
    while(i--){
        const newTintRGB=[tintCalc(colorRGB[0],percent),tintCalc(colorRGB[1],percent),tintCalc(colorRGB[2],percent)];
        const newShadeRGB=[colorRGB[0]*(1-percent),colorRGB[1]*(1-percent),colorRGB[2]*(1-percent)];
        tintArray.push(newTintRGB);
        shadesArray.push(newShadeRGB.map(item=>item.toFixed()));
        percent+=0.1;
    }
    return [tintArray,shadesArray]
}
generateBtn.addEventListener("click",()=>{
    if (currentMethod=="shade"){
        const [tintArray,shadesArray] = generateTintAndShades();
        genCont.innerHTML=`
        <h3>Tints</h3>
        <div class="generatedCont__item"></div>
        <h3>Shades</h3>
        <div class="generatedCont__item"></div>
        `;
        let i=10,perc=10;
        while(i--){
            genCont.querySelectorAll(".generatedCont__item")[0].append(itemColor(perc+"%",tintArray[9-i]));
            genCont.querySelectorAll(".generatedCont__item")[1].append(itemColor(perc+"%",shadesArray[9-i]));
            perc+=10;
        }
    }
    else{
        let i = 100;
        genCont.innerHTML=`<div class="generatedCont__item"></div>`;
        while(i--){
            let randomColor = [];
            for(let r=0;r<3;r++){
                randomColor.push(Math.floor(Math.random()*256));
            };
            genCont.querySelector(".generatedCont__item").append(itemColor("",randomColor));
        }
    }
})