//querySelector() allows you to find the first element that matches one or more css selectors

$(document).ready(function(){                              //document.addEventListener('DOMContentLoaded',function(){ 
const gridDisplay = document.querySelector('.grid')        //<div class="grid"></div > 
const resetDisplay = document.querySelector('#reset')      //<button id="reset">New Game</button>
let squares =[]
let width = 4
let score = 0
$('.instruction').hide()                                                //document.querySelector('.instruction')

// to show and hide the instructions


$('#play').click(play)                                                 ////document.querySelector('#play'), value:<button id = play>How To Play</button> 
let Bool= false;
function play(){                                                       //boolean is false and when the button is clicked it becomes true
    Bool=!Bool;
    Bool? $('.instruction').show():$('.instruction').hide()            //if ternary condition is true it will show and if false it will hide

}

//to start a new game

$('#reset').click(reset)                             //.addEventListener('click',reset)
function reset(){
    for(i=0;i<16;i++){
        squares[i].innerHTML=""
    }
    generate();
    generate();
    checkForColor()
    document.addEventListener('keyup',control)
    //.innerHTML=0
    $('#score').text("0")                           //document.querySelector('#score')  ,value:// <span id="score">0</span>
    score = 0
    //.innerHTML=""
    $('#result').text("")                           //document.querySelector('#result'),value://<div id="result"></div>

}


//create 4*4 board

function createBoard(){
    for(let i=0;i<16;i++){
      let square = document.createElement('div')     //create a div element
        square.innerHTML= ""                        //<div>""</div>
        gridDisplay.appendChild(square)            // appendChild():put 16 squares inside grid with innerHTML ""
        squares.push(square)
    }
    generate()
    generate()                                     
}
createBoard();

//generate 2 in the board

function generate(){
 let randomNumber=Math.floor(Math.random()*squares.length)  //Math.random gives a random number in the range of 0 to 1 and Math.floor rounds a number downwards to nearest integer
  if (squares[randomNumber].innerHTML==""){
      squares[randomNumber].innerHTML=2
      checkZero()
  }else{
      generate()
      
  }
}

// check whether Game over or not

function checkZero(){                              //if there are " " ,zeroes value increases by one if not remains the same
    let zeroes = 0
    for(let i = 0;i<squares.length;i++){
        if(squares[i].innerHTML==""){
            zeroes++
        }
    }
    if( zeroes=== 0){
    // .innerHTML = 'You Lose..!'
    $('#result').text("You Lose..!")
    document.removeEventListener('keyup',control)         //remove event when the player loses
    }

}

// Check if player Wins or not (Wins if reached 2048)
  
function checkForWin(){
    for(let i=0;i<squares.length;i++){
        if(squares[i].innerHTML==2048){
            //.innerHTML = 'You Win..!'
            $('#result').text("You Win..!")
            document.removeEventListener('keyup',control)            //remove event whwn player wins
        }
    }
}

//swipe right

function moveRight(){
    for(let i = 0;i<16;i++){
        if(i%4===0){                                                //if i is 0,4,8or12
            let totalOne = squares[i].innerHTML //"2"
            let totalTwo =squares[i+1].innerHTML//""
            let totalThree = squares[i+2].innerHTML//"4"
            let totalFour =squares[i+3].innerHTML//""
         
         //to convert strings to numbers
         let row = [parseInt(totalOne),parseInt(totalTwo),parseInt(totalThree),parseInt(totalFour)]// [2,NaN,4,NaN]     parseInt(): it parses a string and converts it in to number
         let filteredRow =row.filter(num=>num)// [2,4] filter():it creates new array of numbers.
         
         let missing = 4 - filteredRow.length//2
         let zeroes = Array(missing).fill("")  // ["",""] fill() :  fills the specified elements in an array with a static value.             
         let newRow = zeroes.concat(filteredRow)  //  ["","",2,4]    concat() : used to join two or more strings.

         squares[i].innerHTML = newRow[0]
         squares[i+1].innerHTML=newRow[1]
         squares[i+2].innerHTML=newRow[2]
         squares[i+3].innerHTML=newRow[3]
        }
    }
}
//swipe left

function moveLeft(){
    for(let i = 0;i<16;i++){
        if(i%4===0){                                                
            let totalOne = squares[i].innerHTML //"2"
            let totalTwo =squares[i+1].innerHTML//""
            let totalThree = squares[i+2].innerHTML//"4"
            let totalFour =squares[i+3].innerHTML//""
         
         //to convert strings to numbers
         let row = [parseInt(totalOne),parseInt(totalTwo),parseInt(totalThree),parseInt(totalFour)]// [2,NaN,4,NaN]     
         let filteredRow =row.filter(num=>num)// [2,4] 
         
         let missing = 4 - filteredRow.length//2
         let zeroes = Array(missing).fill("")  // ["",""]             
         let newRow = filteredRow.concat(zeroes)  //  [2,4,"",""]  

         squares[i].innerHTML = newRow[0]
         squares[i+1].innerHTML=newRow[1]
         squares[i+2].innerHTML=newRow[2]
         squares[i+3].innerHTML=newRow[3]
        }
    }
}


//swipe down

function moveDown(){
    for(let i = 0;i<4;i++){                                                                 
         let totalOne = squares[i].innerHTML //"2"
         let totalTwo =squares[i+width].innerHTML//""
         let totalThree = squares[i+(width*2)].innerHTML//"4"
         let totalFour =squares[i+(width*3)].innerHTML//""
         
         let column = [parseInt(totalOne),parseInt(totalTwo),parseInt(totalThree),parseInt(totalFour)]// [2,NaN,4,NaN]     
         let filteredColumn =column.filter(num=>num)// [2,4] 
         
         let missing = 4 - filteredColumn.length//2
         let zeroes = Array(missing).fill("")  // ["",""]             
         let newColumn = zeroes.concat(filteredColumn)  //  ["","",2,4]  

         squares[i].innerHTML = newColumn[0]
         squares[i+width].innerHTML=newColumn[1]
         squares[i+(width*2)].innerHTML=newColumn[2]
         squares[i+(width*3)].innerHTML=newColumn[3]
        
    }
}

//swipe up

function moveUp(){
    for(let i = 0;i<4;i++){                                                                  
         let totalOne = squares[i].innerHTML //"2"
         let totalTwo =squares[i+width].innerHTML//""
         let totalThree = squares[i+(width*2)].innerHTML//"4"
         let totalFour =squares[i+(width*3)].innerHTML//""
         
         
         let column = [parseInt(totalOne),parseInt(totalTwo),parseInt(totalThree),parseInt(totalFour)]// [2,NaN,4,NaN]     
         let filteredColumn =column.filter(num=>num)// [2,4] 
         
         let missing = 4 - filteredColumn.length//2
         let zeroes = Array(missing).fill("")  // ["",""]             
         let newColumn = filteredColumn.concat(zeroes)  //  ["","",2,4]  

         squares[i].innerHTML = newColumn[0]
         squares[i+width].innerHTML=newColumn[1]
         squares[i+(width*2)].innerHTML=newColumn[2]
         squares[i+(width*3)].innerHTML=newColumn[3]
        
    }
}

// add all the digits in a row as per the left or right movement 

function combineRow(){                                                      //for 16 th square we dont have anything to combine
        for(let i=0; i<15; i++){                                            //checking 1 and i+1 is empty also checks whether they are equal
            if(squares[i].innerHTML && squares[i+1].innerHTML && squares[i].innerHTML === squares[i+1].innerHTML){
                let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i+1].innerHTML)
                squares[i].innerHTML = combinedTotal
                squares[i+1].innerHTML = "";
                score+= combinedTotal
                //.innerHTML = score
                $('#score').text(score)
            }
        }
        checkForWin()
    }
//add all the digits in a column as per up or down movement
  
function combineColumn(){                
        
            for(let i=0; i<12; i++){    
                if(squares[i].innerHTML && squares[i+width].innerHTML && squares[i].innerHTML === squares[i+width].innerHTML){
                    let combinedTotal = parseInt(squares[i].innerHTML)+parseInt(squares[i+width].innerHTML)
                    squares[i].innerHTML = combinedTotal
                    squares[i+width].innerHTML = ""
                    score+= combinedTotal
                    //.innerHTML = score
                    $('#score').text(score)
                }
            }
            checkForWin()
        }
        
// keyboard control

 function control(e){
    if(e.key==='ArrowRight'){
        keyRight()
     }else if(e.key==='ArrowLeft'){
        keyLeft()
     }else if(e.key==='ArrowUp'){
        keyUp()
     }else if(e.key==='ArrowDown'){
        keyDown()
     }
}



document.addEventListener('keyup',control)
//it listens to the page whenever a up key is pressed and then it invokes the controlfunction.
function keyRight(){
    moveRight()
    combineRow()
    moveRight()
    generate()  
    checkForColor()
}

function keyLeft(){
    moveLeft()
    combineRow()
    moveLeft()
    generate()
    checkForColor()
}

function keyDown(){
    moveDown()
    combineColumn()
    moveDown()
    generate()
    checkForColor()
}

function keyUp(){
    moveUp()
    combineColumn()
    moveUp()
    generate()
    checkForColor()
}
//animation

let colorValue ={
    "":" #cceeff",
    2 :" #ccccff",
    4: "#cc99ff",
    8:"#b3ffb3",
    16:"#66ffff",
    32:" #33ff99",
    64:"#00e6b8",
    128:"#70dbdb",
    256:"#ff99ff",
    512:"#99ff99",
    1024:"#ffcccc",
    2048:"#ff80aa"

}

function checkForColor(){                                  //gives a color from colorValue according to the given condition
    for(let i=0;i<squares.length;i++){
        let num =squares[i].innerHTML
        $(`.grid div:eq(${i})`).animate({"background-color":colorValue[num]}); 
        $(`.grid div:eq(${i})`).hover (function(){               //(function1,function2)
            $(this).css("background-color","gray");
        },function(){
            $(this).css({"background-color":colorValue[num]}) ;  //if hovered first condition otherwise second one
        })

    }

}checkForColor()
        
})
