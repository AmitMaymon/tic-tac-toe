

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

        winCond('x', rowId, num)
        trackMoves('x', num, rowId)


    } else {

        o = document.createElement('img')
        o.src = './assets/o.png'
        o.id = `tile${num}`

        tile.appendChild(o)
        turn++

        winCond('o', rowId, num)
        trackMoves('o', num, rowId)

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



}



function winCond(player, rowId, num) {
    for (let i = 0; i < grid; i++) {
        winTracker[i][rowId][num - (grid * rowId)] = player
    }


    winCondRow()
    winCondCol()
    winCondDia()


}

function winCondRow() {

    for (let i = 0; i < grid; i++) {
        let xtrack = 0
        let otrack = 0
        const winningTiles = []
        for (let j = 0; j < grid; j++) {


            if (winTracker[0][i][j] == 'x') {
                winningTiles.push(j + (i * grid))
                xtrack++
            }
            if (winTracker[0][i][j] == 'o') {
                winningTiles.push(j + (i * grid))
                otrack++
            }
        }
        if (xtrack == grid || otrack == grid) {

            console.log(winningTiles)
            xtrack == grid ? win('X', winningTiles) : win('O', winningTiles)
            break
        }
    }
}
function winCondCol() {

    for (let i = 0; i < grid; i++) {
        let countx = 0
        let counto = 0
        const winningTiles = []
        for (let j = 0; j < grid; j++) {

            if (winTracker[1][j][i] == 'x') {
                winningTiles.push(i + (j * grid))
                countx++
            }
            if (winTracker[1][j][i] == 'o') {
                winningTiles.push(i + (j * grid))
                counto++
            }
        }
        if (countx == grid) {
            win('X', winningTiles)
            break
        }
        if (counto == grid) {
            win('O', winningTiles)
            break
        }
        // console.log('Column: ', i, ' - BL: ', boardLine) //DEBUG


    }




}

function winCondDia() {
    let firstDiaX = 0
    let secondDiaX = 0
    let firstDiaO = 0
    let secondDiaO = 0
    const winningTilesX = []
    const winningTilesO = []

    for (let i = 0; i < grid; i++) {
        if (winTracker[2][i][i] == 'x') {
            winningTilesX.push(i + (i * grid))
            firstDiaX++
        }
        if (winTracker[2][i][i] == 'o') {
            winningTilesO.push(i + (i * grid))
            firstDiaO++
        }
        if (winTracker[2][i][grid - 1 - i] == 'x') {
            winningTilesX.push(i + ((grid - 1 - i) * grid))
            secondDiaX++
        }
        if (winTracker[2][i][grid - 1 - i] == 'o') {
            winningTilesO.push(i + ((grid - 1 - i) * grid))
            secondDiaO++
        }

    }

    if (firstDiaX == grid || secondDiaX == grid) {
        console.log(winningTilesX)
        win('X', winningTilesX)
        return
    }
    if (firstDiaO == grid || secondDiaO == grid) {
        win('O', winningTilesO)
        return
    }



    // console.log('First: ',firstDiaX,firstDiaO,"\nSecond: ",secondDiaX,secondDiaO) //DEBUG

}


function saveGame() {
    console.log(moveOrder)
    localStorage.setItem('gameState', JSON.stringify(moveOrder))

}
function loadGame() {

    newGame()
    savedGame = JSON.parse(localStorage.getItem('gameState'))
    console.log(savedGame)
    for(let i = 0;i<savedGame.length;i++){
        clickBoard(savedGame[i]['tile'])

    }
}

function showBestScore(){
    if(localStorage.getItem('bestScore') == 999){
        alert('No High scores found')
    }else{
        alert(`The Highest score is: ${localStorage.getItem('bestScore')}`)
    }



}



moveOrder = []
index = 0
function trackMoves(player, tile, rowId) {

    moveOrder.push({
        'index': index,
        'player': player,
        'tile': tile,
        'row': rowId
    })
    index++
    // console.log('Retrace: ',moveOrder) //DEBUG

}

function reDoMove() {
    lastImg = moveOrder.pop()
    img = document.getElementById(`tile${lastImg['tile']}`)
    img.remove()

    //Removes from the wintracker array
    for (let i = 0; i < grid; i++) {
        winTracker[i][lastImg['row']][lastImg['tile'] - (lastImg['row'] * grid)] = '~'

    }
    console.log(lastImg['tile'], winTracker)

    usedTiles.pop()
    index--
    turn = turn - 1


    // console.log('UTiles: ',usedTiles,' Turn: ',turn,' Move Order: ',moveOrder) //DEBUG
}

let bestScore = 999


function win(player, winningTiles) {
    localStorage.setItem('bestScore',bestScore)
    for (let i = 0; i < winningTiles.length; i++) {
        tile = document.getElementById(`td${winningTiles[i]}`)
        tile.style.border = '2px solid green'

    }
    if(localStorage.getItem('bestScore')>moveOrder.length){
    bestScore = moveOrder.length +1
    localStorage.setItem('bestScore',bestScore)
    }




    setTimeout(() => {
        alert(`${player} Wins`)
        newGame(winningTiles)
    }, 10)





}


function newGame(winningTiles) {
    imgsToRemove = document.querySelectorAll('img')

    for (let i = 0; i < imgsToRemove.length; i++) {
        imgsToRemove[i].remove()

    }
    try {
        for (let i = 0; i < winningTiles.length; i++) {
            tile = document.getElementById(`td${winningTiles[i]}`)
            tile.style.border = ''




        }
    }catch(error){
        console.log('No win')
    }


    usedTiles = []
    turn = 0
    moveOrder = []
    winTracker = []
    winTrackerFill()
}











