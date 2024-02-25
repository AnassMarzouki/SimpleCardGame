fetch(`https://apis.scrimba.com/deckofcards/api/deck/elbdsfkci3qe/draw/?count=2`)
.then(res => res.json())
.then(data => console.log(data.remaining))