

turn = 0
usedTiles = []

function clickBoard(num) {
    tile = document.getElementById(`td${num}`)
    rowId = tile.parentElement.id //gets The id of the tr element
    rowId = rowId[rowId.length - 1]

    console.log(`Row: ${rowId} Num: ${num}`) //DEBUG


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
        // TODO - insert win Condition
        winCond('x', rowId, num)
        trackMoves('x', num)


    } else {

        o = document.createElement('img')
        o.src = './assets/o.png'
        o.id = `tile${num}`

        tile.appendChild(o)
        turn++
        // TODO - insert win Condition
        winCond('o', rowId, num)
        trackMoves('o', num)

    }
}
grid = 3
winTracker = []

function winTrackerFill() {

    for (let i = 0; i < 3; i++) {
        winTracker.push([])
        for (let j = 0; j < grid; j++) {
            winTracker[i].push([])
            for (let t = 0; t < grid; t++) {
                winTracker[i][j][t] = '~'


            }


        }


    }


    console.log(winTracker)
}
winTrackerFill()


function winCond(player, rowId, num) {
    for (let i = 0; i < grid; i++) {
        winTracker[i][rowId][num - (grid * rowId)] = player
    }

    console.log(winTracker)
    // winCondRow()
    winCondCol()


}

function winCondRow() {

    for (let i = 0; i < grid; i++) {
        let xtrack = 0
        let otrack = 0
        for (let j = 0; j < grid; j++) {


            if (winTracker[0][i][j] == 'x') {

                xtrack++
            }
            if (winTracker[0][i][j] == 'o') {
                otrack++
            }
        }
        if (xtrack == grid || otrack == 3) {
            xtrack == grid ? console.log('x wins') : console.log('o wins')
            break
        }
    }
}
function winCondCol() {




}
function winCondDia() {

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
    // console.log('Retrace: ',moveOrder) //DEBUG

}

function reDoMove() {
    lastImg = moveOrder.pop()
    img = document.getElementById(`tile${lastImg['tile']}`)
    img.remove()

    usedTiles.pop()
    index--
    turn = turn - 1


    // console.log('UTiles: ',usedTiles,' Turn: ',turn,' Move Order: ',moveOrder) //DEBUG

    reDoRemoveData(lastImg['player'], lastImg['tile'])


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











