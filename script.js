const add = (a,b) => {
    return a+b;
}
const substract = (a,b) =>{
    return a-b;
}
const multiply = (a,b) => {
    return a*b;
}
const divide = (a,b) =>{
    if(b == 0){
        return undefined;
    }
    return a/b;
}


function equalize(str){
    let args = str.match(/\d+|\D+/g);
    let i = 1;
    while(i < args.length - 1){
       let result = 0;
       
       if(args[i] == "÷" || args[i] == "/"){
         result = divide(parseFloat(args[i-1]),parseFloat(args[i+1]));
         args.splice(i-1,3,result);
         i-=1;
       }
       
       else if(args[i]=="x"){
        result = multiply(parseFloat(args[i-1]),parseFloat(args[i+1]));
        args.splice(i-1,3,result);
        i-=1;
       }
       
       i++;
    }
    
    i = 1;
    while(i < args.length - 1){
        let result = 0;
       
         if(args[i]=="+"){
         result = add(parseFloat(args[i-1]),parseFloat(args[i+1]));
         args.splice(i-1,3,result);
         i-=1;
        }
        
        else if(args[i]=="-"){
         result = substract(parseFloat(args[i-1]),parseFloat(args[i+1]));
         args.splice(i-1,3,result);
         i-=1;
        }
        
        i++;
     }
     
     // Return the final result of the calculation
     return args[0];
}

let str = "";
const checkout = document.querySelector(".checkout");
function updateScreen(e) {
    const regex = /[+\-x\/÷]/;

    if (e.target.innerText == "=") {
        str = equalize(str);
    } else if (e.target.innerText == "C") {
        str = "0";
    } else {
        if (str === "0" && !regex.test(e.target.innerText)) {
            str = "";
        } else if (str === "0" && regex.test(e.target.innerText)) {
            str = "0";
        }

        // Check if the clicked button's text is not an operator
        // or if str is not empty and the last character of str is not an operator
        if (!regex.test(e.target.innerText) || (str !== "" && !regex.test(str[str.length - 1]))) {
            str += e.target.innerText;
        }
    }

    checkout.innerText = str;
}


const buttons = Array.from(document.querySelectorAll(".buttons"));
buttons.forEach((button) => {

    button.addEventListener("click",function(e){
        if (e.target.tagName === "BUTTON") {
            updateScreen(e);
        }
    })
})

const equal = document.querySelector(".equal");
equal.addEventListener("click", () => updateScreen({ target: { innerText: "=" } }));
