

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
        trackMoves('x', num,rowId)


    } else {

        o = document.createElement('img')
        o.src = './assets/o.png'
        o.id = `tile${num}`

        tile.appendChild(o)
        turn++
        
        winCond('o', rowId, num)
        trackMoves('o', num,rowId)

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
        for (let j = 0; j < grid; j++) {


            if (winTracker[0][i][j] == 'x') {

                xtrack++
            }
            if (winTracker[0][i][j] == 'o') {
                otrack++
            }
        }
        if (xtrack == grid || otrack == 3) {
            xtrack == grid ? win('X') : win('O')
            break
        }
    }
}
function winCondCol() {

    for (let i = 0; i < grid; i++) {
        const boardLine = []
        let countx = 0
        let counto = 0
        for (let j = 0; j < grid; j++) {
            boardLine.push(winTracker[1][j][i])
            if (winTracker[1][j][i] == 'x')
                countx++
            if (winTracker[1][j][i] == 'o')
                counto++
        }
        if (countx == grid) {
            win('X')
            break
        }
        if (counto == grid) {
            win('O')
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

    for (let i = 0; i < grid; i++) {
        if (winTracker[2][i][i] == 'x')
            firstDiaX++
        if (winTracker[2][i][i] == 'o')
            firstDiaO++
        if (winTracker[2][i][grid - 1 - i] == 'x')
            secondDiaX++
        if (winTracker[2][i][grid - 1 - i] == 'o')
            secondDiaO++

    }

    if (firstDiaX == grid || secondDiaX == grid) {
        win('X')
        return
    }
    if (firstDiaO == grid || secondDiaO == grid) {
        win('O')
        return
    }



    // console.log('First: ',firstDiaX,firstDiaO,"\nSecond: ",secondDiaX,secondDiaO) //DEBUG

}

moveOrder = []
index = 0
function trackMoves(player, tile,rowId) {

    moveOrder.push({
        'index': index,
        'player': player,
        'tile': tile,
        'row':rowId
    })
    index++
    // console.log('Retrace: ',moveOrder) //DEBUG

}

function reDoMove() {
    lastImg = moveOrder.pop()
    img = document.getElementById(`tile${lastImg['tile']}`)
    img.remove()

    //Removes from the wintracker array
    for(let i = 0;i<grid;i++ ){
        winTracker[i][lastImg['row']][lastImg['tile']-(lastImg['row']*grid)] = '~'

    }
    console.log(lastImg['tile'],winTracker)

    usedTiles.pop()
    index--
    turn = turn - 1


    // console.log('UTiles: ',usedTiles,' Turn: ',turn,' Move Order: ',moveOrder) //DEBUG
}

function win(player){
    setTimeout(()=>{
        alert(`${player} Wins`)
    },10)
    




}


function newGame() {
    imgsToRemove = document.querySelectorAll('img')

    for (let i = 0; i < imgsToRemove.length; i++) {
        imgsToRemove[i].remove()

    }
    usedTiles = []
    turn = 0
    moveOrder = []
    winTracker = []
    winTrackerFill()
}











