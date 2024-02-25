const shuffleBtn = document.getElementById('new-deck')
shuffleBtn.addEventListener('click', drawNewDeck)

const drawBtn = document.getElementById('draw-btn')
drawBtn.addEventListener('click', drawTwoCard)


let deckID = ''
let cardTop = ''
let cardBottom = ''
let cpuScore = 0
let meScore = 0
let remainingCards

document.getElementById('cpu-score').innerHTML = `${cpuScore}`
document.getElementById('me-score').innerHTML = `${meScore}`
const popUp = document.getElementById('game-over')

function drawNewDeck (){
    
    fetch('https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/')
    .then(res => res.json())
    .then(data => {deckID = data.deck_id
        
    // console.log('deck = ' + deckID)
    document.getElementById('top-msg').innerHTML = 'Deck Shuffled !'
    
    cpuScore = 0
    meScore = 0
    remainingCards = 52

    document.getElementById('cpu-score').innerHTML = cpuScore
    document.getElementById('me-score').innerHTML = meScore
    document.getElementById('remaining-cards').innerHTML = `${remainingCards}`

})   
}

function drawTwoCard (){
    if (deckID){
        document.getElementById('default-card-bg2').style.display='none'
        fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckID}/draw/?count=2`)
    .then(response => response.json())
    .then(data => {
        remainingCards = data.remaining
        document.getElementById('remaining-cards').innerHTML = `${remainingCards}`

        document.getElementById('card-slot-1').innerHTML= `
        <img src=${data.cards[0].image} class="card-image">
        <img src=${data.cards[1].image} class="card-image">
        `
        cardTop = data.cards[0].value
        cardBottom = data.cards[1].value



        // console.log('Top card is: ' + cardTop)
        // console.log('Bottom card is: '+ cardBottom)
  

        whoWins(cardTop, cardBottom)

        if (remainingCards ===0){
            let winner = ''
            if(cpuScore>meScore){
                winner='CPU 🖥️ Wins !'
                
            } else if (meScore>cpuScore){
                winner = 'YOU 💪 Win !'
            } else {
                winner = 'TIE ❌ Game'  
            }

            gameOver(winner)
            document.getElementById('replay-btn').addEventListener('click', playAgain)
        }
    })
    

    } else {
        document.getElementById('top-msg').innerHTML = 'Deck is not yet set ! click Shuffle deck First'
    }
    
}

function whoWins (cardTop, cardBottom) {
    const cardScores = {
        "2": 2,
        "3": 3,
        "4": 4,
        "5": 5,
        "6": 6,
        "7": 7,
        "8": 8,
        "9": 9,
        "10": 10,
        "JACK": 11,
        "QUEEN": 12,
        "KING": 13,
        "ACE": 14}

    if (cardScores[cardTop] > cardScores[cardBottom]){
        document.getElementById('top-msg').innerHTML = 'CARD 1 WINS'
        cpuScore +=1
        document.getElementById('cpu-score').innerHTML = cpuScore
    } else if (cardScores[cardTop] < cardScores[cardBottom]){
        document.getElementById('top-msg').innerHTML = 'CARD 2 WINS'
        meScore +=1
        document.getElementById('me-score').innerHTML = meScore
    } else {
        document.getElementById('top-msg').innerHTML = 'WAR !'
    }
}

function playAgain(){
    location.reload()
}

function gameOver (winner){
    popUp.style.display = 'block'
        popUp.innerHTML = `
        <h1>Game Over</h1>
        <h2>${winner}</h2>
        <button id="replay-btn">Play Again !</button>
        `
    drawBtn.disabled = true
    shuffleBtn.disabled = true
}