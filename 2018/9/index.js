const printCircle = (marble) => {
    const circle = [];
    //rotate to beginning
    let current = marble;
    while (current.value !== 0) {
        current = current.next;
    }
    do {
        circle.push((current.value === marble.value) ? `(${current.value})` : current.value);
        current = current.next;
    }
    while (current.value !== 0);
    console.log(circle);
}

const playMarbleGame = (playerCount, marbleCount) => {

    const players = [];
    for (let i = 0; i < playerCount; i++) {
        players.push(0);
    }
    
    
    const marbles = [];
    let marble = {
        value: 0
    }
    marble.prev = marble;
    marble.next = marble;
    
    currentPlayer = -1;
    for (let i = 1; i <= marbleCount; i++) {
        currentPlayer = (currentPlayer + 1) % playerCount;
        if (i % 23 === 0) {
            players[currentPlayer] += i;
    
            //rotate 7 marbles back
            let target = marble;
            for (let j = 0; j < 7; j++) {
                target = target.prev;
            }
    
            players[currentPlayer] += target.value;
            
            target.prev.next = target.next;
            target.next.prev = target.prev;
            marble = target.next;
        } else {
            let newMarble = {
                value: i
            };
            newMarble.prev = marble.next;
            newMarble.next = marble.next.next;
            marble.next.next.prev = newMarble;
            marble.next.next = newMarble;
            marble = newMarble;
        }
    }
    
    console.log("Winner is Player", players.indexOf(Math.max(...players)) + 1, "with", Math.max(...players), "points!");
}

playMarbleGame(465, 71498);
playMarbleGame(465, 71498 * 100);