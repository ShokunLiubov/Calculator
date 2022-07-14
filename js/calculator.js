
let data = {
    numbers: [],
    actions: [],
    percent: [],
    cachNumber: '',
    activeAction: false,
    deleteAction: false,
    deleteNegative: false
}

// Нельзя вводить буквы 
function validate(e) {
    let key = e.key
    let regex = /[0-9 + * / -]|Backspace|\./
    if(!regex.test(key)) {
        e.returnValue = false
        if(e.preventDefault) e.preventDefault()
    }
}


// Выводит цифры

function insertNumber(number) {
    if(data.deleteNegative == false){
        let inp = document.querySelector('.data-input')
        inp.value = inp.value + number.toString()
        if(data.activeAction == false) {
            data.cachNumber += number.toString()
        } else {
            data.numbers.push(data.cachNumber)
            data.cachNumber = number.toString()
            data.activeAction = false
            data.deleteAction = false
        }
    }  
}


// Выводит знаки
function insertAction(action) {
        if(data.activeAction) {
            return
        } 
            let inp = document.querySelector('.data-input')
            inp.value = inp.value + action
            data.actions.push(action)
            data.activeAction = true
            data.deleteAction = false

}
 // Арифметические операции equals
function insertEquals(equals) {
        let inp = document.querySelector('.data-input')

        data.numbers.push(data.cachNumber)
        // выводит результат и убирает строку данных
        let res = eval(getResultStr())
        inp.value = res
    
        display()
        // Обнуляет data и записывает результат в массив numbers
        data.numbers.length=0
        data.actions.length=0
        data.cachNumber= res.toString()
        data.activeAction = false 
        data.deleteAction = false  
        // data.deleteNegative = false
  
}

// Считать %
function insertPercent(percent) {
    if(data.numbers.length == 0 ) {
        data.percent.push(percent)
        insertEquals() 
        data.percent.pop(0, -1)
        if(display()) return 
        document.getElementById("display__projection").innerHTML = ""
    }
     

}

// Добавить отрицание в число
function insertNegative(negative) {
    if(data.cachNumber.length) {
        let inp = document.querySelector('.data-input')
        inp.value = inp.value.substr(0, inp.value.length - data.cachNumber.length)
        
        if(data.cachNumber[0] != '('){
            data.cachNumber = '(-'+data.cachNumber+')'
            inp.value += data.cachNumber
            data.deleteNegative = true
            return
        }if(data.cachNumber[0] == '('){
            data.cachNumber = data.cachNumber.substr(2)
            data.cachNumber = data.cachNumber.slice(0, -1)
            inp.value += data.cachNumber
        }
    }
    
}

// cтроку добавить в display
function display(){
    let x = document.getElementsByTagName("input")
    document.getElementById("display__projection").innerHTML = ""
    document.getElementById("display__projection").innerHTML += getResultStr()+ ' ='
}



// вводит цифры и знаки с помощью клавиатуры
document.querySelector('.data-input').addEventListener('keydown', function(e) {
    validate(e)
    //keydown number
    if(e.key.match(/[0-9 .]/)) {
        if(data.activeAction == false) {
            data.cachNumber += e.key
        } else {
            data.numbers.push(data.cachNumber)
            data.cachNumber = e.key
            data.activeAction = false
            data.deleteAction = false
        }
        if(data.deleteNegative == true)  {
            let key = e.key
            let regexNumber = /[0-9]/
            if(regexNumber.test(key)) {
                e.returnValue = false
                if(e.preventDefault) e.preventDefault()
            }
        }
    } 

    //keydown action
    if(e.key.match(/[+ / * -]/)) {
        if(data.activeAction == true){
            e.returnValue = false
            if(e.preventDefault) e.preventDefault()
            return
        } 
            data.actions.push(e.key)
            data.activeAction = true
            data.deleteAction = false
    }





    //keydown equals
    if(e.key.match(/[=]/)) {
            data.numbers.push(data.cachNumber)
            let inp = document.querySelector('.data-input')
    
            // выводит результат и убирает строку данных
            let res = eval(getResultStr())
            inp.value = res
            display()
            // Обнуляет data и записывает результат в массив numbers
            data.numbers.length=0
            data.actions.length=0
            data.cachNumber= res.toString()
            data.activeAction = false
            data.deleteAction = false
       
    }
    
}) 

// Button clear AC
document.querySelector('.clear').addEventListener('click', function() {
document.querySelector('.data-input').value = ""
   data.numbers.length=0
   data.actions.length=0
   data.cachNumber= ''
   data.activeAction = false
   data.deleteAction = false
   data.deleteNegative = false
document.getElementById("display__projection").innerHTML = ""
})


// Options delete one simbol
// Button del delete
document.querySelector('.del').addEventListener('click', function(e){
    let inp = document.querySelector('.data-input')
    inp.value = inp.value.slice(0, -1)
    del()

})


document.querySelector('.data-input').addEventListener('keydown', function(e){
    // delete backspace
    Backspace(e)
    function Backspace(e) {
        if (e.keyCode == 8){
            if(data.deleteNegative == true) {
                e.returnValue = false
                if(e.preventDefault) e.preventDefault()
                return
            }

            del()
        }
    }
    
    // нельзя использовать space
    Space(e)
    function Space(e) {
        if(e.keyCode == 32) {
            e.returnValue = false
            if(e.preventDefault) e.preventDefault()
        }
    }

})

// Function delete
function del() {
    if(data.cachNumber.length) {

        data.cachNumber = data.cachNumber.slice(0,-1)
        if(data.cachNumber.length < 1) {

            data.deleteAction = true
            return
        } 
        
    } 
    if(data.deleteAction == true ){

        data.actions.pop(0, -1)
        data.deleteAction = false

        let end = data.numbers[data.numbers.length- 1]

        data.cachNumber += end.toString()
        data.numbers.pop(0,-1)
        

        return 
    }
    if(data.deleteNegative == true) {
        if(data.cachNumber.length){
            let inp = document.querySelector('.data-input')
            inp.value = inp.value.substr(0, inp.value.length - data.cachNumber.length)
            data.cachNumber = data.cachNumber.substr(2)
            data.deleteNegative = false
            inp.value += data.cachNumber

        }
    }
}


//получить строку действий
function getResultStr() {
    let result = ''
    data.numbers.forEach(function(value, index) {
   
       if(data.numbers.length!=index+1) {
           result += value + data.actions[index] + data.percent
       } else {
           result+=value + data.percent
       }
       
    })
    return result
}




// 1.нельзя первым писать знак и последним перед = ++++++
// 2. если после 0 нет точки удалять 0
// 3.
