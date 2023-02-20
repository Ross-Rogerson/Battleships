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
    hitsTaken: [],
  }
  const cpuMediumBoat = {
    name: 'medium',
    length: 3,
    position: [],
    hitsTaken: [],
  }
  const cpuMediumBoat2 = {
    name: 'medium2',
    length: 3,
    position: [],
    hitsTaken: [],
  }
  const cpuSmallBoat = {
    name: 'small',
    length: 2,
    position: [],
    hitsTaken: [],
  }
  const cpuXSmallBoat = {
    name: 'xsmall',
    length: 1,
    position: [],
    hitsTaken: [],
  }
  const playerLargeBoat = {
    name: 'large',
    length: 4,
    position: [],
    hitsTaken: [],
  }
  const playerMediumBoat = {
    name: 'medium',
    length: 3,
    position: [],
    hitsTaken: [],
  }
  const playerMediumBoat2 = {
    name: 'medium2',
    length: 3,
    position: [],
    hitsTaken: [],
  }
  const playerSmallBoat = {
    name: 'small',
    length: 2,
    position: [],
    hitsTaken: [],
  }
  const playerXSmallBoat = {
    name: 'xsmall',
    length: 1,
    position: [],
    hitsTaken: [],
  }
  const enemyShips = [cpuLargeBoat, cpuMediumBoat, cpuMediumBoat2, cpuSmallBoat, cpuXSmallBoat]
  const playerShips = [playerLargeBoat, playerMediumBoat, playerMediumBoat2, playerSmallBoat, playerXSmallBoat]
  const occupiedCellsCPU = []
  const playerGrid = document.querySelector('.playerGrid')
  const cpuGrid = document.querySelector('.cpuGrid')
  const gridBtns = document.querySelectorAll('.grid Button')
  const start = document.querySelector('.start')
  const playerShipBtns = document.querySelectorAll('.playerShips Button')

  const width = 10
  const cellCount = width * width
  const playerCells = []
  const cpuCells = []
  let currentShip = {}

  // ? class for each ship direction?
  function createGrids() {
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('button')
      cell.innerText = i
      cell.dataset.index = i
      playerGrid.appendChild(cell)
      playerCells.push(cell)
    }
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('button')
      cell.innerText = i
      cell.dataset.index = i
      cpuGrid.appendChild(cell)
      cpuCells.push(cell)
    }
  }

  // ! Executions
  // ? MIGHT ADD HITPOSITIONS[] TO SHIP[] AND PUSH INTO THIS AS HITS ARE MADE SO I CAN THEN USE ARRAY.LENGTH TO CHECK FOR DESTROYED SHIPS
  // ? Possibly use a timer to create a delay comp shot after player's shot

  // start() -> select ship you wish to place' + on hover shadowPlacement()
  function begin() {
    placeCPUShips()
    placePlayerShips()
  }

  function placePlayerShips() {

  }

  function selectShip() {
    const shipIndex = parseInt(this.value) - 1
    currentShip = playerShips[shipIndex]
    console.log(currentShip)
  }

  // player press r to rotate ship, rotateShip()
  
  // player clicks to select ship to place, forEach
  playerShipBtns.forEach(btn => btn.addEventListener('click', selectShip))

  // player hovers to place ship, shadowPlacement()
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
        } else if (randomDirection === 2 && occupiedCheck(arrayToTest, occupiedCellsCPU) === false && width - randomCell % width > shipSize - 1 && withinUpperLimit(arrayToTest) === true) {
          pushToArraysIfCellsAvilable(arrayToTest, i)
          iterating = false
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
}

window.addEventListener('DOMContentLoaded', init)