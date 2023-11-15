
turn = 0
usedTiles = []
ai = true


function clickBoard(num) {
    tile = document.getElementById(`td${num}`)
    rowId = tile.parentElement.id //gets The id of the tr element
    rowId = rowId.substring(2)

    randomClick()

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
        trackMoves('x', num, rowId)
        winCond('x', rowId, num)



    } else {
        o = document.createElement('img')
        o.src = './assets/o.png'
        o.id = `tile${num}`

        tile.appendChild(o)
        turn++

        trackMoves('o', num, rowId)
        winCond('o', rowId, num)


    }
    // console.log(winTracker)
}
var grid = 3
winTracker = []

function winTrackerFill() {
    winTracker = []

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


    for (let i = 0; i < 3; i++) {
        winTracker[i][rowId][num - (grid * rowId)] = player
    }



    winCondRow()
    winCondCol()
    winCondDia()
    tieCheck()

    if (ai) {
        who = turnCheck()
    }
    if (who == false) {
        setTimeout(easyEnemyAi, 500)

    }


}

function tieCheck() {
    setTimeout(() => {
        if (moveOrder.length >= grid * grid && isItAwin == false) {
            winAlert(`Its a Tie`)
        }
    }, 50)


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
            xtrack == grid ? win('X', winningTiles, false) : win('O', winningTiles, false)
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
            win('X', winningTiles, false)
            break
        }
        if (counto == grid) {
            win('O', winningTiles, false)
            break
        }
    }
}

function winCondDia() {
    let firstDiaX = 0;
    let secondDiaX = 0;
    let firstDiaO = 0;
    let secondDiaO = 0;

    const winningTilesX = [];
    const winningTilesO = [];

    for (let i = 0; i < grid; i++) {
        if (winTracker[2][i][i] == 'x') {
            winningTilesX.push([1, (i * grid) + i]);
            firstDiaX++;
        }
        if (winTracker[2][i][i] == 'o') {
            winningTilesO.push([1, (i * grid) + i]);
            firstDiaO++;
        }
        if (winTracker[2][i][grid - 1 - i] == 'x') {
            winningTilesX.push([2, (grid - 1 - i) + i * grid]);
            secondDiaX++;
        }
        if (winTracker[2][i][grid - 1 - i] == 'o') {
            winningTilesO.push([2, (grid - 1 - i) + i * grid]);
            secondDiaO++;
        }
    }
    if (firstDiaX == grid || secondDiaX == grid) {
        if (firstDiaX > secondDiaX) {
            for (let i = 0; i < winningTilesX.length; i++) {
                if (winningTilesX[i][0] == 2) {
                    winningTilesX.splice(i, 1);

                }
            }

        } else if (firstDiaX == secondDiaX) {
            console.log('Both Diagonals')
        }
        else {
            for (let i = 0; i < winningTilesX.length; i++) {
                if (winningTilesX[i][0] == 1) {
                    winningTilesX.splice(i, 1);
                }
            }
        }
        win('X', winningTilesX, true);
        return;
    }
    if (firstDiaO == grid || secondDiaO == grid) {
        if (firstDiaO > secondDiaO) {
            for (let i = 0; i < winningTilesO.length; i++) {
                if (winningTilesO[i][0] == 2) {
                    winningTilesO.splice(i, 1);
                }
            }
        } else {
            for (let i = 0; i < winningTilesO.length; i++) {
                if (winningTilesO[i][0] == 1) {
                    winningTilesO.splice(i, 1);
                }
            }
        }
        win('O', winningTilesO, true);
        return;
    }
}

function saveGame() {
    // console.log(moveOrder) //DEBUG
    localStorage.setItem('gameState', JSON.stringify(moveOrder))

}
function loadGame() {

    newGame()
    savedGame = JSON.parse(localStorage.getItem('gameState'))
    changeGrid(savedGame[0]['grid'])
    for (let i = 0; i < savedGame.length; i++) {
        clickBoard(savedGame[i]['tile'])

    }
}
function showBestScore() {
    if (localStorage.getItem('bestScore') == 999) {
        winAlert('No High scores found')
    } else {
        winAlert(`The Highest score is: ${localStorage.getItem('bestScore')}`)
    }



}

moveOrder = []
index = 0
function trackMoves(player, tile, rowId) {

    moveOrder.push({
        'index': index,
        'player': player,
        'tile': tile,
        'row': rowId,
        'grid': grid
    })
    index++
}

function reDoMove() {
    lastImg = moveOrder.pop()
    img = document.getElementById(`tile${lastImg['tile']}`)
    img.remove()

    //Removes from the wintracker array
    for (let i = 0; i < grid; i++) {
        winTracker[i][lastImg['row']][lastImg['tile'] - (lastImg['row'] * grid)] = '~'

    }

    usedTiles.pop()
    index--
    turn = turn - 1
}

let bestScore = 999
isItAwin = false

function win(player, winningTiles, dia) {
    if (dia == true) {
        winningTiles = winningTiles.map((data) => { return data[1] })
    }


    localStorage.setItem('bestScore', bestScore)
    for (let i = 0; i < winningTiles.length; i++) {
        tile = document.getElementById(`td${winningTiles[i]}`)
        tile.style.border = '4px solid azure'
        tile.classList = "fill-animation"
    }
    if (localStorage.getItem('bestScore') > moveOrder.length) {
        bestScore = moveOrder.length + 1
        localStorage.setItem('bestScore', bestScore)
    }

    isItAwin = true
    localStorage.setItem('winningTiles', JSON.stringify(winningTiles))
    winAlert(`${player} Wins!`)
}

function newGame(winningTiles) {
    isItAwin = false
    imgsToRemove = document.querySelectorAll('img')

    for (let i = 0; i < imgsToRemove.length; i++) {
        if (imgsToRemove[i].id == 'banner' || imgsToRemove[i].id == 'credit')
            continue
        imgsToRemove[i].remove()

    }
    try {

        for (let i = 0; i < grid * grid; i++) {
            tile = document.getElementById(`td${i}`)
            tile.style.border = ''
            tile.classList = ''
        }
    } catch (error) {
        console.log('No win')
    }
    usedTiles = []
    turn = 0
    moveOrder = []
    winTracker = []
    winTrackerFill()
}

function changeGrid(x) {

    newGame()
    if (!x) {
        tempGrid = +prompt('Enter the grid size')
    } else {
        tempGrid = x
    }
    if (tempGrid % 2 == 0 || tempGrid < 3) {
        alert('Please enter an ODD number above 3')
        return
    } else {
        grid = tempGrid
    }
    winTrackerFill()
    oldTrs = document.querySelectorAll('tr')

    for (let i = 0; i < oldTrs.length; i++) {
        oldTrs[i].remove()

    }

    table = document.getElementById('mainTable')

    let idcounter = 0
    for (let i = 0; i < grid; i++) {
        if (i < grid) {
            tr = document.createElement('tr')
            tr.id = `tr${i}`

        }

        for (let j = 0; j < grid; j++) {
            td = document.createElement('td')
            td.id = `td${idcounter}`
            td.setAttribute('onclick', `clickBoard(${idcounter})`)
            tr.appendChild(td)
            idcounter++
        }
        table.appendChild(tr)
    }

}

let hardModeStatus = false
function hardMode() {
    const button = document.getElementById('test');
    button.classList.toggle('button-pressed');

    table = document.getElementById('mainTable')
    if (hardModeStatus == true) {
        table.style.animation = ''
        hardModeStatus = false
        return
    }

    table.style.animation = 'rotate 2s infinite linear'
    hardModeStatus = true
}

function introAnimation() {
    buttons = document.getElementById('buttons')
    banner.style.animation = 'slideInTop 1s ease-in-out';
    banner.style.animationFillMode = 'forwards';
}
let temp = true
function winAlert(message) {
    document.getElementById('winText').innerText = message;
    document.getElementById('winOverlay').style.display = 'flex';
}

function closeWinOverlay() {
    winningTiles = JSON.parse(localStorage.getItem('winningTiles'))
    newGame(winningTiles)
    document.getElementById('winOverlay').style.display = 'none';
}

function randomClick() {
    click1 = document.getElementById('click1')
    click2 = document.getElementById('click2')
    click3 = document.getElementById('click3')
    let randomNum = Math.floor(Math.random() * 3)
    // event.preventDefault();

    if (randomNum === 0) {
        click1.play()
    } else if (randomNum === 1) {
        click2.play()
    } else {
        click3.play()
    }
}
// burger menu

function toggleMenu() {
    const menu = document.getElementById('menu');
    menu.style.display = menu.style.display === 'none' ? 'flex' : 'none';
}
function closeMenu() {
    const menu = document.getElementById('menu');
    menu.style.display = 'none';
}

document.getElementById('burger-menu').addEventListener('click', toggleMenu);
document.getElementById('close-menu').addEventListener('click', closeMenu);

ai = false

function toggleAi() {
    const button = document.getElementById('testAi');
    button.classList.toggle('button-pressed');

    if (ai) {
        ai = false
        newGame()
    } else {
        ai = true
        newGame()
    }

}

function easyEnemyAi() {
    playerThere = true

    randomTile = randomNumber()
    // console.log(randomTile)
    for (let i = 0; i < moveOrder.length; i++) {
        if (randomTile == moveOrder[i].tile && moveOrder.length < (grid * grid) - 1) {
            i = -1
            console.log('Player there')
            randomTile = randomNumber()
        }

    }
    if (moveOrder.length < (grid * grid) - 1 && isItAwin == false && ai == true) {
        clickBoard(randomTile)
    }

}


function turnCheck() {
    if (turn % 2 == 0) {
        return true
    } else {
        return false
    }
}

function randomNumber() {
    return Math.floor(Math.random() * (grid * grid - 1))
}

// //{
//     "index": 2,
//     "player": "x",
//     "tile": 5,
//     "row": "1",
//     "grid": 3
// }