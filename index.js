/*
JS code for Memory maching game.
*/



// Adding all sounds
var wrongCardSound = new Audio('./sound/Wrong.mp3');
var correctSound = new Audio('./sound/Score.mp3');
var newGameSound = new Audio('./sound/newGameSound.mp3');
newGameSound.play();


// Array of images
const imgURL = [
    './img/Bird.jpg',
    './img/Lion.jpg',
    './img/Muse.jpg',
    './img/Octopus.jpg',
    './img/Bird.jpg',
    './img/Lion.jpg',
    './img/Muse.jpg',
    './img/Octopus.jpg',
]

// Different game variables.

var gameArray = []

const nuberOfCards = 8;

const arrayChecker = []

const positionsClickedForChecker = []

var cardCountOpen = 0

var gameScore = 0


// Select random image URL and delite the image from the array
function selectURL(){
    if (!(imgURL.length == 1)){
        var randomNumber = Math.floor(Math.random() * imgURL.length)
        var urlToTransfer = imgURL[randomNumber]
        imgURL.splice(randomNumber, 1)
        return urlToTransfer
        }
    else {
        return imgURL[0]
    }
}


// Generating random array for the game
function generateGameArray() {
    for (let i = 0; i < nuberOfCards; i++){
        gameArray.push(selectURL())
    }
}


// Generating image tag for start
function generateImage(url) {
    var imgTile = document.createElement('img');
    imgTile.src = url;
    imgTile.className += "imgClass";
    return imgTile; // Return img
}   


// Make all the card faces coverd
function cardsBackFace(){
    var allImages = document.getElementsByClassName('gridItem');
    for (let i = 0; i < allImages.length; i++ ){
        var img = generateImage('./img/Back_side.jpg');
        allImages[i].append(img);
    }
}


// Add evntListener to images
function addEventListenersToImg(){
    for (let i = 0; i < nuberOfCards; i++){
        var images = document.getElementsByClassName('imgClass')
        images[i].addEventListener('click', (event) =>{
            const parentElement = event.target.parentElement.id;

            console.log(parentElement); // consol.log position
            positionsClickedForChecker.push(parentElement);
            console.log(positionsClickedForChecker);
            turnTheCard(parentElement);
        })
    }
}


// Time sleep
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


// Funtction to turn the card around
function turnTheCard(position){
    // Get index pased on id
    let index = parseInt (position.replace('pos', ''));
    // Target img element inside div tag
    let image = document.getElementById(position).querySelector('img');
    //change the src of image
    image.src = gameArray[index]
    
    arrayChecker.push(gameArray[index])
    //console.log(arrayChecker)
    cardCountOpen += 1

    if ((cardCountOpen !== 0) && (cardCountOpen % 2 == 0)){
        if (arrayChecker[(arrayChecker.length - 1)] == arrayChecker[(arrayChecker.length - 2)]){
        gameScore += 1;
        document.getElementById('score').innerHTML = gameScore;
        correctSound.play();

        document.getElementById('container').classList.add("greenBorder"); // Adding green border
        document.getElementById('container').classList.remove("gridContainer"); // Removing normal styling

        sleep(500).then(() => {
            document.getElementById('container').classList.add("gridContainer"); // Removing green border
            document.getElementById('container').classList.remove("greenBorder"); // Adding normal styling
         });


        if (gameScore == 4){
            sleep(500).then(() => {
                document.getElementById('container').classList.add("greenBorder"); // Adding green border
                document.getElementById('container').classList.remove("gridContainer"); // Removing normal styling
                ding.play();
                alert('You Win! 🏆')
             });
            

        }
        }
        else{
            document.getElementById('container').classList.add("redBorder"); // Adding red border
            document.getElementById('container').classList.remove("gridContainer"); // Removing normal styling
            wrongCardSound.play();
            sleep(900).then(() => { 
                var idOfDivToReplace1 = positionsClickedForChecker[positionsClickedForChecker.length-1]
                var idOfDivToReplace2 = positionsClickedForChecker[positionsClickedForChecker.length-2]
                document.getElementById(idOfDivToReplace1).querySelector('img').src = './img/Back_side.jpg'
                document.getElementById(idOfDivToReplace2).querySelector('img').src = './img/Back_side.jpg'

                document.getElementById('container').classList.add("gridContainer"); // Adding the original styling
                document.getElementById('container').classList.remove("redBorder"); // Removing red border styling
             });
            
        }
    
    }

}


// Event listener to a Button
document.getElementById('btn').addEventListener('click', () => {
    window.location.reload()
})


// Game coling functions
cardsBackFace()
generateGameArray()
addEventListenersToImg()
