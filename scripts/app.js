function init() {

  // ! Generating a grid

  // Variables
  // QuerySelectors: grids, playerShips, enemyShips, commentary(may contain images), start button, reset button, forfeit button
  // width, cellCount, occupiedCellsPlayer[], shipsPlayer/Comp[] containing objects for each 
  // ship {name, length, position[], destroyed?} compShots[], playerShots[], computer/playerShipsRemaining, shipsPlaced[]
  // let currentCellComp(rand)/Player(clicked), up, down, left, right, player/compPreviousShotHit = (-1 if missed, or ship was...
  // detroyed) compShotAfterHitOptions = []
  // let randIndex, let randCell, let compShotCoordinate

  // enemyShips[], occupiedCellsCPU[], up, down, left, right

  const cpuLargeBoat = {
    name: 'large',
    length: 4,
    position: [],
    hitsTaken: 0,
  }
  const cpuMediumBoat = {
    name: 'medium',
    length: 3,
    position: [],
    hitsTaken: 0,
  }
  const cpuMediumBoat2 = {
    name: 'medium2',
    length: 3,
    position: [],
    hitsTaken: 0,
  }
  const cpuSmallBoat = {
    name: 'small',
    length: 2,
    position: [],
    hitsTaken: 0,
  }
  const cpuXSmallBoat = {
    name: 'xsmall',
    length: 1,
    position: [],
    hitsTaken: 0,
  }
  const playerLargeBoat = {
    name: 'large',
    length: 4,
    position: [],
    hitsTaken: 0,
  }
  const playerMediumBoat = {
    name: 'medium',
    length: 3,
    position: [],
    hitsTaken: 0,
  }
  const playerMediumBoat2 = {
    name: 'medium2',
    length: 3,
    position: 0,
    hitsTaken: [],
  }
  const playerSmallBoat = {
    name: 'small',
    length: 2,
    position: 0,
    hitsTaken: [],
  }
  const playerXSmallBoat = {
    name: 'xsmall',
    length: 1,
    position: [],
    hitsTaken: 0,
  }
  const enemyShips = [cpuLargeBoat, cpuMediumBoat, cpuMediumBoat2, cpuSmallBoat, cpuXSmallBoat]
  const playerShips = [playerLargeBoat, playerMediumBoat, playerMediumBoat2, playerSmallBoat, playerXSmallBoat]
  const occupiedCellsCPU = []
  const occupiedCellsPlayer = []
  const playerHitsTaken = []
  const cpuHitsTaken = []
  const playerGrid = document.querySelector('.playerGrid')
  const cpuGrid = document.querySelector('.cpuGrid')

  const start = document.querySelector('.start')
  const reset = document.querySelector('.reset')
  const forfeit = document.querySelector('.forfeit')
  const playerShipBtns = document.querySelectorAll('.playerShips Button')

  const width = 10
  const cellCount = width * width
  const playerCells = []
  const cpuCells = []
  let currentShip = {}
  let currentShipLength = 0
  let currentShipIndex = 0
  let cellsRequiredToPlace = []
  let direction = 'down'
  let currentCell = 0
  let playerShot = 0
  let playerShotResult = false

  // ? class for each ship direction?
  function createGrids() {
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('button')
      cell.innerText = i
      cell.dataset.index = i
      cell.classList.add('normal')
      cell.id = i
      playerGrid.appendChild(cell)
      playerCells.push(cell)
    }
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('button')
      cell.innerText = i
      cell.dataset.index = i
      cell.classList.add('normal')
      cpuGrid.appendChild(cell)
      cpuCells.push(cell)
    }
  }

  // const playerGridBtns = playerCells.addEventListener('Button')

  // ! Executions
  // ? MIGHT ADD HITPOSITIONS[] TO SHIP[] AND PUSH INTO THIS AS HITS ARE MADE SO I CAN THEN USE ARRAY.LENGTH TO CHECK FOR DESTROYED SHIPS
  // ? Possibly use a timer to create a delay comp shot after player's shot

  // start() -> select ship you wish to place' + on hover shadowPlacement()
  function begin() {
    start.disabled = true
    reset.disabled = false
    forfeit.disabled = false
    placeCPUShips()
    unlockShipBtns()
  }

  function unlockShipBtns() {
    playerShipBtns.forEach(btn => btn.disabled = false)
  }

  function rotate(e) {
    if (e.keyCode === 82 && direction === 'down') {
      cellsRequiredToPlace = []
      direction = 'left'
      updateCellsRequired()
    } else if (e.keyCode === 82 && direction === 'left') {
      cellsRequiredToPlace = []
      direction = 'up'
      updateCellsRequired()
    } else if (e.keyCode === 82 && direction === 'up') {
      cellsRequiredToPlace = []
      direction = 'right'
      updateCellsRequired()
    } else if (e.keyCode === 82 && direction === 'right') {
      cellsRequiredToPlace = []
      direction = 'down'
      updateCellsRequired()
    }
  }

  function updateCurrentCell() {
    currentCell = parseInt(this.dataset.index)
  }

  function selectShip() {
    currentShipIndex = parseInt(this.value) - 1
    currentShip = playerShips[currentShipIndex]
    console.log(currentShip)
    currentShipLength = currentShip.length
    console.log(currentShipLength)
  }

  function clearSelection() {
    cellsRequiredToPlace = []
  }

  function resetCurrentShip() {
    playerShipBtns[currentShipIndex].disabled
    currentShip = {}
    currentShipLength = 0
    currentShipIndex = 0
    cellsRequiredToPlace = []
  }

  function updateCellsRequired() {
    if (direction === 'down') {
      requiredCellsDown(currentCell, currentShipLength, cellsRequiredToPlace)
      // console.log(cellsRequiredToPlace)
    } else if (direction === 'right') {
      requiredCellsRight(currentCell, currentShipLength, cellsRequiredToPlace)
      // console.log(cellsRequiredToPlace)
    } else if (direction === 'up') {
      requiredCellsUp(currentCell, currentShipLength, cellsRequiredToPlace)
      // console.log(cellsRequiredToPlace)
    } else {
      requiredCellsLeft(currentCell, currentShipLength, cellsRequiredToPlace)
      // console.log(cellsRequiredToPlace)
    }
  }

  function outlineCellsRequired() {
    for (let i = 0; i < cellsRequiredToPlace.length; i++) {
      const index = cellsRequiredToPlace[i]
      playerCells[index].classList.remove('normal')
      playerCells[index].classList.add('shipOutline')
    }
  }

  function removeOutline() {
    for (let i = 0; i < 100; i++) {
      playerCells[i].classList.remove('shipOutline')
      playerCells[i].classList.add('normal')
    }
  }

  function placeShip() {
    if ((direction === 'up' || direction === 'down') && withinLowerLimit(cellsRequiredToPlace) && withinUpperLimit(cellsRequiredToPlace) && occupiedCheck(cellsRequiredToPlace, occupiedCellsPlayer) === false) {
      pushToPlayerArrays(cellsRequiredToPlace, currentShipIndex)
      playerShipBtns[currentShipIndex].disabled = true
      resetCurrentShip()
      startBattle()
      console.log('ship was placed')
      console.log(occupiedCellsPlayer)
    } else if ((direction === 'left' || direction === 'right') && withinLowerLimit(cellsRequiredToPlace) && withinUpperLimit(cellsRequiredToPlace) && occupiedCheck(cellsRequiredToPlace, occupiedCellsPlayer) === false && sameLine(cellsRequiredToPlace)) {
      pushToPlayerArrays(cellsRequiredToPlace, currentShipIndex)
      playerShipBtns[currentShipIndex].disabled = true
      resetCurrentShip()
      startBattle()
      console.log('ship was placed')
      console.log(occupiedCellsPlayer)
    } else {
      console.log('NOT PLACED')
    }
  }

  function startBattle() {
    if (occupiedCellsPlayer.length === 13) {
      removeOutline()
      playerCells.forEach(btn => btn.disabled = true)
      unlockEnemyGrid()
    }
  }

  function fireShot() {
    playerShot = parseInt(this.dataset.index)
    playerShotResult = occupiedCellsCPU.includes(playerShot)
    updateTargetCell()
    // lockEnemyGrid()
  }

  function updateTargetCell() {
    cpuCells[playerShot].classList.remove('normal')
    if (playerShotResult) {
      cpuCells[playerShot].classList.add('hit')
      cpuHitsTaken.push(playerShot)
      shipDestroyedCheck()
      playerWinCheck()
    } else {
      cpuCells[playerShot].classList.add('miss')
    }
    cpuCells[playerShot].disabled = true
  }

  function shipDestroyedCheck() {
    let searching = true
    let iterate = 0
    while (searching) {
      const foundIndexOfShipHit = enemyShips[iterate].position.includes(playerShot)
      if (foundIndexOfShipHit) {
        enemyShips[iterate].hitsTaken++
        if (enemyShips[iterate].hitsTaken >= parseInt(enemyShips[iterate].length)) {
          console.log('ship destroyed')
        }
        searching = false
      } else {
        iterate++
      }
    }
  }

  function playerWinCheck () {
    console.log(cpuHitsTaken.length)
    if (cpuHitsTaken.length >= 13) {
      lockEnemyGrid()
      forfeit.disabled = true
      console.log('Game Over')
    }
  }

  function unlockEnemyGrid() {
    cpuCells.forEach(btn => btn.disabled = false)
  }

  function lockEnemyGrid() {
    cpuCells.forEach(btn => btn.disabled = true)
  }

  // function disableShipBtns() {
  //   playerShipBtns.forEach(btn =>)
  // }

  // player press r to rotate ship, rotateShip()

  // player clicks to select ship to place, forEach
  playerShipBtns.forEach(btn => btn.addEventListener('click', selectShip))

  // player hovers to place ship, shadowPlacement()


  // playerGridBtns.forEach(btn => console.log(btn.value))

  // player clicks to place ship, placesShip()

  // computerShoots() if compPreviousShotHit >= 0
  // TRUE, compShotAfterHit()
  // ELSE, randCell on player grid, if compShots.includes(randCell) = true, restart function, else compShotCoordinate = randCell...
  // -> addCompShot(compShotCoordinate)

  // compShotAfterHit() check if surrounding cells in compShots[]; compPreviousShotHit +1 (right), -1 (left), - width (up), + width (down)
  // TRUE, nothing
  // ELSE, push to compShotAfterHitOptions[]. randIndex = floor(rand * compShotAfterHitOptions.length) -> compShotCoordinate = compShotAfterHitOptions[randIndex]
  // -> addCompShot(compShotCoordinate)

  // addCompShot(compShotCoordinate) if occupiedCellsPlayer.includes(compShotCoordinate)
  // TRUE, push cell to compShots[] + compPreviousShot = compShotCoordinate + checkPlayerShipDestroyed() + change colour of cell to hit colour + player turn
  // ELSE, push cell to compShots[] + change colour of cell to miss colour + compPreviousShotHit = -1 + player turn

  // checkPlayerShipDestroyed() identify ship hit in shipsPlayer[] using cell fired at, check if all shipsPlayer.position[] in compShots[]
  // TRUE,  playerShipDestroyed()
  // ELSE, nothing

  // playerShipDestroyed() playerShipsRemianing -= 1 + checkCompWon() + compPreviousShotHit = -1 + mark player ship as sunk in display

  // checkCompWon() playerShipsRemaining = 0
  // TRUE, compWins()
  // ELSE, nothing

  // compWins() message + disable grids & forfeit button

  // playerShoots() if occupiedCellsComputer.includes(this.value)
  // TRUE, push this.value to playerShots[] + checkComputerShipDestroyed() + change colour of cell to hit colour + computer turn
  // ELSE, push this.value to playerShots[] + change colour of cell to miss colour + computer turn

  // checkComputerShipDestroyed() identify ship hit in shipsComputer[] using cell fired at, check if all shipsComputer.position[] in playerShots[]
  // TRUE, computerShipDestroyed()
  // ELSE, nothing

  // computerShipDestroyed() computerShipsRemianing -= 1 + checkPlayerWon() + mark computer ship as sunk in display

  // checkPlayerWon() computerShipsRemaining = 0
  // TRUE, playerWins()
  // ELSE, nothing

  // playerWins() message + disable grids & forfeit button



  // shadowPlacement() add class to player grid outlining selected ship on hover

  // rotateShip() rotates around a central point

  // placesShip() cells occupied by ship are pushed into occupiedCellsPlayer[] + shipsPlaced +=1 + if(shipsPlaced < 5
  // TRUE, moves onto next ship in array
  // ELSE, disable ship buttons & player grid + enable computer grid + 'select a cell on enemy grid to fire a missile and begin the war!'

  // ! Events
  // click start, start()
  start.addEventListener('click', begin)
  // click reset
  // click forfeit

  // player clicks to shoot: forEach, playerShoots()

  // ! Page load

  // disbale grid buttons
  // gridBtns.forEach(btn => {
  //   btn.disabled
  // })

  // disable forfeit button

  // createGrids()
  createGrids()

  // placeCompShips() -> for loop iterating through compShips[], place in + to - order, random number generated to choose first 
  // cell to try, checks if available by searching occupiedCellsComputer[]...
  function placeCPUShips() {
    for (let i = 0; i < 5; i++) {
      const shipSize = parseInt(enemyShips[i].length)
      const possiblePositon = []
      let arrayOfPossibleCellArrays = []
      let randomCell
      const possiblePositonUp = []
      const possiblePositonDown = []
      const possiblePositonRight = []
      const possiblePositonLeft = []
      const randomDirection = 0

      // While loop checks random number to ensure ship can be placed in at least 1 of the 4 possible directions
      let looping = true
      while (looping) {
        const random = Math.floor(Math.random() * 100)
        requiredCellsUp(random, shipSize, possiblePositonUp)
        const requiredCellsU = possiblePositonUp
        arrayOfPossibleCellArrays.push(requiredCellsU)
        requiredCellsDown(random, shipSize, possiblePositonDown)
        const requiredCellsD = possiblePositonDown
        arrayOfPossibleCellArrays.push(requiredCellsD)
        requiredCellsRight(random, shipSize, possiblePositonRight)
        const requiredCellsR = possiblePositonRight
        arrayOfPossibleCellArrays.push(requiredCellsR)
        requiredCellsLeft(random, shipSize, possiblePositonLeft)
        const requiredCellsL = possiblePositonLeft
        arrayOfPossibleCellArrays.push(requiredCellsL)
        if (occupiedCheck(requiredCellsU, occupiedCellsCPU) === false && withinLowerLimit(requiredCellsU) === true) {
          looping = false
          randomCell = random
        } else if (occupiedCheck(requiredCellsD, occupiedCellsCPU) === false && withinUpperLimit(requiredCellsD) === true) {
          looping = false
          randomCell = random
          arrayOfPossibleCellArrays.splice(arrayOfPossibleCellArrays.indexOf(requiredCellsU), 1)
        } else if (occupiedCheck(requiredCellsR, occupiedCellsCPU) === false && width - random % width > shipSize - 1 && withinUpperLimit(requiredCellsR) === true) {
          looping = false
          randomCell = random
          arrayOfPossibleCellArrays.splice(arrayOfPossibleCellArrays.indexOf(requiredCellsU), 1)
          arrayOfPossibleCellArrays.splice(arrayOfPossibleCellArrays.indexOf(requiredCellsD), 1)
        } else if (occupiedCheck(requiredCellsL, occupiedCellsCPU) === false && random % width >= shipSize - 1 && withinLowerLimit(requiredCellsL) === true) {
          looping = false
          randomCell = random
          arrayOfPossibleCellArrays.splice(arrayOfPossibleCellArrays.indexOf(requiredCellsU), 1)
          arrayOfPossibleCellArrays.splice(arrayOfPossibleCellArrays.indexOf(requiredCellsD), 1)
          arrayOfPossibleCellArrays.splice(arrayOfPossibleCellArrays.indexOf(requiredCellsR), 1)
        } else {
          looping = true
          arrayOfPossibleCellArrays = []
        }
      }

      let iterating = true
      while (iterating) {
        const randomDirection = Math.floor(Math.random() * arrayOfPossibleCellArrays.length)
        const arrayToTest = arrayOfPossibleCellArrays[randomDirection]
        if (randomDirection === 0 && occupiedCheck(arrayToTest, occupiedCellsCPU) === false && withinLowerLimit(arrayToTest) === true) {
          pushToArraysIfCellsAvilable(arrayToTest, i)
          iterating = false
        } else if (randomDirection === 1 && occupiedCheck(arrayToTest, occupiedCellsCPU) === false && withinUpperLimit(arrayToTest) === true) {
          pushToArraysIfCellsAvilable(arrayToTest, i)
          iterating = false
          // right
        } else if (randomDirection === 2 && occupiedCheck(arrayToTest, occupiedCellsCPU) === false && width - randomCell % width > shipSize - 1 && withinUpperLimit(arrayToTest) === true) {
          pushToArraysIfCellsAvilable(arrayToTest, i)
          iterating = false
          // left
        } else if (randomDirection === 3 && occupiedCheck(arrayToTest, occupiedCellsCPU) === false && randomCell % width >= shipSize - 1 && withinLowerLimit(arrayToTest) === true) {
          pushToArraysIfCellsAvilable(arrayToTest, i)
          iterating = false
        } else {
          iterating = true
        }
      }
    }
    console.log(enemyShips[0])
    console.log(enemyShips[1])
    console.log(enemyShips[2])
    console.log(enemyShips[3])
    console.log(enemyShips[4])
    console.log(occupiedCellsCPU)

    // ? Exploring randomising direction before calculating cells to occupy
    // // Up
    // if (randomDirection === 0) {
    //   let looping = true
    //   while (looping) {
    //     const randomCell = Math.floor(Math.random() * (100 - width * (shipSize - 1))) + width * (shipSize - 1)
    //     requiredCellsUp(randomCell, shipSize, possiblePositon)
    //     const requiredCells = possiblePositon
    //     if (occupiedCheck(requiredCells, occupiedCellsCPU) === false) {
    //       looping = false
    //       pushToArraysIfCellsAvilable(requiredCells, i)
    //     } else {
    //       looping = true
    //     }
    //   }
    // }

    // // Down
    // if (randomDirection === 1) {
    //   let looping = true
    //   while (looping) {
    //     const randomCell = Math.floor(Math.random() * (100 - width * (shipSize - 1)))
    //     requiredCellsDown(randomCell, shipSize, possiblePositon)
    //     const requiredCells = possiblePositon
    //     if (occupiedCheck(requiredCells, occupiedCellsCPU) === false) {
    //       looping = false
    //       pushToArraysIfCellsAvilable(requiredCells, i)
    //     } else {
    //       looping = true
    //     }
    //   }
    // }

    // // Right
    // if (randomDirection === 2) {
    //   let looping = true
    //   while (looping) {
    //     const randomCell = Math.floor(Math.random() * 10) * 10 + (Math.floor(Math.random() * ((9 - shipSize) + 1)) + 1)
    //     requiredCellsRight(randomCell, shipSize, possiblePositon)
    //     const requiredCells = possiblePositon
    //     if (occupiedCheck(requiredCells, occupiedCellsCPU) === false) {
    //       looping = false
    //       pushToArraysIfCellsAvilable(requiredCells, i)
    //     } else {
    //       looping = true
    //     }
    //   }
    // }

    // // Left
    // if (randomDirection === 3) {
    //   let looping = true
    //   while (looping) {
    //     const randomCell = Math.floor(Math.random() * 10) * 10 + Math.floor(Math.random() * (9 - (shipSize - 1) + 1)) + (shipSize - 1)
    //     requiredCellsLeft(randomCell, shipSize, possiblePositon)
    //     const requiredCells = possiblePositon
    //     if (occupiedCheck(requiredCells, occupiedCellsCPU) === false) {
    //       looping = false
    //       pushToArraysIfCellsAvilable(requiredCells, i)
    //     } else {
    //       looping = true
    //     }
    //   }
    // }
  }

  // Creates array of cells required to place ship from random cell to the RIGHT and checks their availability 
  function requiredCellsRight(randomCell, shipSize, possiblePositonRight) {
    for (let i = randomCell; i < randomCell + shipSize; i++) {
      possiblePositonRight.push(i)
    }
  }

  // Creates array of cells required to place ship from random cell to the LEFT and checks their availability 
  function requiredCellsLeft(randomCell, shipSize, possiblePositonLeft) {
    for (let i = randomCell; i > randomCell - shipSize; i--) {
      possiblePositonLeft.push(i)
    }
  }

  // Creates array of cells required to place ship from random cell to the UP and checks their availability 
  function requiredCellsUp(randomCell, shipSize, possiblePositonUp) {
    for (let i = randomCell; i >= randomCell - ((shipSize - 1) * width); i -= width) {
      possiblePositonUp.push(i)
    }
  }

  // Creates array of cells required to place ship from random cell to the DOWN and checks their availability 
  function requiredCellsDown(randomCell, shipSize, possiblePositonDown) {
    for (let i = randomCell; i <= randomCell + ((shipSize - 1) * width); i += width) {
      possiblePositonDown.push(i)
    }
  }

  // Compares array of required cells to array of cells already occupied
  function occupiedCheck(requiredCells, occupiedCells) {
    return requiredCells.some(cell => occupiedCells.includes(cell))
  }

  // Cells >= 0
  function withinLowerLimit(requiredCells) {
    return requiredCells.every(num => num >= 0)
  }

  // Cells <= 99
  function withinUpperLimit(requiredCells) {
    return requiredCells.every(num => num < cellCount)
  }

  // Checks cells are on the same line 
  function sameLine(requiredCells) {
    const rowOfFirstNumInArray = requiredCells[0] - requiredCells[0] % width
    const rowOfLastNumInArray = requiredCells[requiredCells.length - 1] - requiredCells[requiredCells.length - 1] % width
    if (rowOfFirstNumInArray === rowOfLastNumInArray) {
      return true
    } else {
      return false
    }
  }


  // Pushes to required arrays if unoccupied
  function pushToArraysIfCellsAvilable(place, i) {
    pushToOccupiedCellsCPU(place)
    enemyShips[i].position = place
  }

  // Pushes cells to be taken up by ship to occupied cells array
  function pushToOccupiedCellsCPU(possiblePositon) {
    for (let i = 0; i < possiblePositon.length; i++) {
      occupiedCellsCPU.push(possiblePositon[i])
    }
  }

  // Pushes to required arrays if unoccupied
  function pushToPlayerArrays(possiblePositon, currentShipIndex) {
    for (let i = 0; i < possiblePositon.length; i++) {
      occupiedCellsPlayer.push(possiblePositon[i])
    }
    playerShips[currentShipIndex].position = possiblePositon
  }

  // playerGridBtns.forEach(btn => console.log(btn.className))
  playerCells.forEach(btn => {
    btn.addEventListener('click', placeShip)
  })

  cpuCells.forEach(btn => {
    btn.addEventListener('click', fireShot)
  })

  cpuCells.forEach(btn => btn.disabled = true)

  // forfeit.addEventListener('click', giveUp)
  forfeit.disable = true
  // forfeit.addEventListener('click', clear)
  reset.disable = true

  playerCells.forEach(btn => {
    btn.addEventListener('mouseover', updateCurrentCell)
    btn.addEventListener('mouseover', updateCellsRequired)
    btn.addEventListener('mouseover', outlineCellsRequired)
    btn.addEventListener('mouseleave', clearSelection)
    btn.addEventListener('mouseleave', removeOutline)
  })

  playerShipBtns.forEach(btn => btn.disabled = true)

  document.addEventListener('keydown', rotate)
}

window.addEventListener('DOMContentLoaded', init)