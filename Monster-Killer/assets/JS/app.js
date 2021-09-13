const extraLife=document.getElementById('life');
const monsterHelth=document.getElementById('monster-helth');
const playerHelth=document.getElementById('player-helth');
const attackButton=document.getElementById('attack-btn');
const strongAttackButton=document.getElementById('strong-attack-btn');
const healButton=document.getElementById('heal-btn');
const resetButton=document.getElementById('reset-btn');

const playerAttackValue=12
const playerStrongAttackValue=14
const playerHealValue=10
const mosterAttackValue=15

let chosenMaxLife=100
let hasExtraLife=true


function adjustHealthBar(maxLife){
    monsterHelth.max=maxLife;
    monsterHelth.value=maxLife;
    playerHelth.max=maxLife;
    playerHelth.value=maxLife;
}

adjustHealthBar(chosenMaxLife)

function dealDamageToMonster(damage){
    let currentPlayerHealth=playerHelth.value;
    let currentMonsterHealth=monsterHelth.value;

    if(currentPlayerHealth<=0 && hasExtraLife){
        hasExtraLife=false
        playerHelth.value=30
        extraLife.innerText='0'
        alert('you got more HP defeat Monster')
    }

    if(currentPlayerHealth<=0 && currentMonsterHealth>=0 && hasExtraLife){
        alert('you lose and mosnter win')
    }else if(currentMonsterHealth<=0 && currentPlayerHealth>=0){
        alert('you win')
    }else if(currentMonsterHealth === 0 && currentPlayerHealth===0){
        alert('draw')
    }
    const dealtDamage=Math.random()*damage;
    monsterHelth.value=+monsterHelth.value-dealtDamage
    return dealtDamage;
}

function dealDamageToPlayer(damage){
    const dealtDamage=Math.random()*damage;
    playerHelth.value=+playerHelth.value-dealtDamage
}

function healPlayer(heal){
    playerHelth.value=+playerHelth.value+heal
}
function resetGame(value){
    playerHelth.value=value
    monsterHelth.value=value
}

function attackHandler(){
    dealDamageToMonster(playerAttackValue)
    dealDamageToPlayer(mosterAttackValue)
}

function strongAttackHandler(){
    dealDamageToMonster(playerStrongAttackValue)
    dealDamageToPlayer(mosterAttackValue)
}

function healingPlayer(){
    healPlayer(playerHealValue)
}

function reset(){
    resetGame(chosenMaxLife)
    hasExtraLife=true
    extraLife.innerText='1'
}

attackButton.addEventListener('click',attackHandler)
strongAttackButton.addEventListener('click',strongAttackHandler)
healButton.addEventListener('click',healingPlayer)
resetButton.addEventListener('click',reset)