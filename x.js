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
        console.log('TOP Wins')
    } else {
        console.log('BOTTOM WINS')
    }
}

whoWins("JACK", "ACE")