

turn = 0
usedTiles = []

function clickBoard(num) {
    tile = document.getElementById(`td${num}`)

    //if trying to click a space that already been clicked on
    if (usedTiles.includes(`td${num}`)) {

        return
    }

    usedTiles.push(`td${num}`)

    //checks if it is x or o turn
    if (turn % 2 == 0) {

        x = document.createElement('img')
        x.src = './assets/x.png'
        x.id = `tile${num}`

        tile.appendChild(x)
        turn++
        winCondRow('x', num)
        winCondCol('x', num)
        winCondDia('x', num)
        trackMoves('x',num)


    } else {

        o = document.createElement('img')
        o.src = './assets/o.png'
        o.id = `tile${num}`

        tile.appendChild(o)
        turn++
        winCondRow('o', num)
        winCondCol('o', num)
        winCondDia('o', num)
        trackMoves('o',num)

    }
}


moveOrder = []
index = 0
function trackMoves(player, tile) {

    moveOrder.push({
        'index': index,
        'player': player,
        'tile': tile
    })
    index++
    console.log('Retrace: ',moveOrder)

}

function reDoMove(){
    lastImg = moveOrder.pop()
    img = document.getElementById(`tile${lastImg['tile']}`)
    img.remove()

    usedTiles.pop()
    index--
    turn = turn -1


    console.log('UTiles: ',usedTiles,' Turn: ',turn,' Move Order: ',moveOrder)

    reDoRemoveData(lastImg['player'],lastImg['tile'])


}

function reDoRemoveData(player,tile){
    console.log(player, tile)


    switch(tile){
        case 0:
            







    }

}







function newGame() {
    imgsToRemove = document.querySelectorAll('img')

    for (let i = 0; i < imgsToRemove.length; i++) {
        imgsToRemove[i].remove()

    }
    usedTiles = []
    turn = 0
    moveOrder = []
}




rowBoard = [[], [], []]

function winCondRow(player, num) {
    if (num >= 0 && num <= 2) {
        rowBoard[0].push(player)

    }
    if (num >= 3 && num <= 5) {
        rowBoard[1].push(player)

    }
    if (num >= 6 && num <= 8) {
        rowBoard[2].push(player)

    }

    // console.log('RowBoard: ', rowBoard) 
    for (let i = 0; i < rowBoard.length; i++) {
        count = 0
        for (let j = 0; j < rowBoard[i].length; j++) {
            if (rowBoard[i][j] === player) {
                count++

                if (count == 3) {
                    console.log(player, ' Wins')
                    rowBoard = [[], [], []]
                    colBoard = [[], [], []]
                    diaBoard = [[], []]

                }

            }

        }


    }

}


colBoard = [[], [], []]

function winCondCol(player, num) {
    if (num == 0 || num == 3 || num == 6) {
        colBoard[0].push(player)

    }
    if (num == 1 || num == 4 || num == 7) {
        colBoard[1].push(player)

    }
    if (num == 2 || num == 5 || num == 8) {
        colBoard[2].push(player)

    }

    // console.log('ColBoard: ', colBoard)
    for (let i = 0; i < colBoard.length; i++) {
        count = 0
        for (let j = 0; j < colBoard[i].length; j++) {
            if (colBoard[i][j] === player) {
                count++
            }
            if (count == 3) {
                console.log(player, ' Wins')
                rowBoard = [[], [], []]
                colBoard = [[], [], []]
                diaBoard = [[], []]

            }
        }
    }
}

diaBoard = [[], []]
function winCondDia(player, num) {
    if (num == 0 || num == 4 || num == 8) {
        diaBoard[0].push(player)

    }
    else if (num == 2 || num == 4 || num == 6) {
        diaBoard[1].push(player)

    }

    // console.log('DiaBoard: ', diaBoard)
    for (let i = 0; i < diaBoard.length; i++) {
        count = 0
        for (let j = 0; j < diaBoard[i].length; j++) {
            if (diaBoard[i][j] === player) {
                count++
            }
            if (count == 3) {
                console.log(player, ' Wins')
                rowBoard = [[], [], []]
                colBoard = [[], [], []]
                diaBoard = [[], []]

            }
        }
    }



}
