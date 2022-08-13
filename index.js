const characters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9","~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?",
"/"];
const alphabetCharacters = characters.slice(0,characters.indexOf("0"))
const symbolsCharacters = characters.slice(characters.indexOf("~"))
const numbersCharacters = characters.slice(characters.indexOf("0"), characters.indexOf("~"))

const generatePassBtn = document.getElementById('generate-pass-btn')
const errorMessageElement = document.getElementById('error-message')
const passField_1 = document.getElementById('pass-field--1')
const passField_2 = document.getElementById('pass-field--2')

const numbersCheckElement = document.getElementById('numbers-chk')
const symbolsCheckElement =  document.getElementById('symbols-chk')
const passLengthElement = document.getElementById('pass-length')

const minPassLength = parseInt(passLengthElement.min)
const maxPassLength = parseInt(passLengthElement.max)

let isNumbersIncluded = numbersCheckElement.checked
let isSymbolsIncluded = symbolsCheckElement.checked
let passLength = parseInt(passLengthElement.value)

numbersCheckElement.addEventListener('change',()=> isNumbersIncluded = numbersCheckElement.checked )
symbolsCheckElement.addEventListener('change',()=> isSymbolsIncluded = symbolsCheckElement.checked )
passLengthElement.addEventListener('change', ()=> passLength = parseInt(passLengthElement.value) )


function generateTwoPasswords(){
    const pass1 = generatePassword()
    const pass2  = generatePassword()
    passField_1.value = ""
    passField_2.value = ""
    if (pass1 !== "" && pass2 !== ""){
        passField_1.value = pass1
        passField_2.value = pass2
        errorMessageElement.innerText = ""
    }
    else{
        errorMessageElement.innerText = `password length should be between ${minPassLength} and ${maxPassLength} characters.`
    }
}

function generatePassword(){
    let isError = false
    let includedArray = []
    let password = ""
    if (isNumbersIncluded && isSymbolsIncluded){
        includedArray = [...characters]
    } 
    else if (isNumbersIncluded && !isSymbolsIncluded){
        includedArray = [...alphabetCharacters].concat([...numbersCharacters])
    } else if (isSymbolsIncluded && !isNumbersIncluded){
        includedArray = [...alphabetCharacters].concat([...symbolsCharacters])
    } else {
        includedArray = [...alphabetCharacters]
    }
    if (passLength < minPassLength || passLength > maxPassLength){
        isError = true
    }
    else {
        isError = false
    }
    if (!isError){
        for (let i = 0; i < passLength ; i++){
            const randomIndex = Math.floor(Math.random()*includedArray.length)
            password += includedArray[randomIndex]
        }
    }
    return password
}


