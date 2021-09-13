const input=document.getElementById('input-number');
const addBtn=document.getElementById('add');
const minBtn=document.getElementById('min');
const multiBtn=document.getElementById('multi')
const dividBtn=document.getElementById('di');
const resultSection=document.querySelector('.result-section');
const hForRes=document.getElementById('res');
const defaultResult=0;

let currentResult=defaultResult;
let type='Defualt';

function getUserInput(){
    return +input.value;
}

// function clearInput(){
//     input.value='';
// }

function check(type){
    let enteredNumber=getUserInput();
    
    if(type==='ADD'){
        currentResult+=enteredNumber;
    }else if(type==='MIN'){
        currentResult-=enteredNumber;
    }
    else if(type==='MULTI'){
        currentResult*=enteredNumber;
    }
    else if(type==='DIV'){
        currentResult/=enteredNumber;
    }

    hForRes.innerText=currentResult;
}


function ADD(){
    check('ADD')
    // clearInput();
}
function MIN(){
    check('MIN');
    // clearInput();
}
function MULTI(){
    check('MULTI');
    // clearInput();
}
function DIVIDE(){
    check('DIV');
    // clearInput();
}


addBtn.addEventListener('click',ADD);
minBtn.addEventListener('click',MIN);
multiBtn.addEventListener('click',MULTI);
dividBtn.addEventListener('click',DIVIDE);