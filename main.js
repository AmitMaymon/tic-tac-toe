

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
        // TODO - insert win Condition
        trackMoves('x',num)


    } else {

        o = document.createElement('img')
        o.src = './assets/o.png'
        o.id = `tile${num}`

        tile.appendChild(o)
        turn++
        // TODO - insert win Condition
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
    // console.log('Retrace: ',moveOrder) //DEBUG

}

function reDoMove(){
    lastImg = moveOrder.pop()
    img = document.getElementById(`tile${lastImg['tile']}`)
    img.remove()

    usedTiles.pop()
    index--
    turn = turn -1


    // console.log('UTiles: ',usedTiles,' Turn: ',turn,' Move Order: ',moveOrder) //DEBUG

    reDoRemoveData(lastImg['player'],lastImg['tile'])


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











