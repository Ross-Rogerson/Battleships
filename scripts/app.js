function init() {
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
  const unoccupiedCellsPlayer = []
  const playerHitsTaken = []
  const cpuHitsTaken = []
  const playerMisses = []
  const cpuMisses = []
  const cpuPreviousAttacks = []
  const playerGrid = document.querySelector('.playerGrid')
  const cpuGrid = document.querySelector('.cpuGrid')
  const commentary = document.querySelector('.commentary')
  let currentAttackHits = []
  let currentAttack = []

  const start = document.querySelector('.start')
  const reset = document.querySelector('.reset')
  const forfeit = document.querySelector('.forfeit')
  const playerShipBtns = document.querySelectorAll('.playerShips Button')
  const playerGridContainer = document.querySelector('.playerComponents .gridContainer')
  const cpuGridContainer = document.querySelector('.cpuComponents .gridContainer')
  const audioclip = document.querySelector('.clip1')

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
  let playerAttack = 0
  let playerAttackResult = false
  let cpuAttackResult = true
  let cpuPreviousAttackHit = -1
  let cpuAttack = 0

  function createGrids() {
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('button')
      cell.dataset.index = i
      cell.innerText = 'O'
      cell.classList.add('normal')
      cell.id = i
      playerGrid.appendChild(cell)
      playerCells.push(cell)
    }
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('button')
      cell.dataset.index = i
      cell.innerText = 'O'
      cell.classList.add('normal')
      cpuGrid.appendChild(cell)
      cpuCells.push(cell)
    }
  }

  function populateUnoccupiedCellsPlayer() {
    for (let i = 0; i < cellCount; i++) {
      unoccupiedCellsPlayer.push(i)
    }
  }

  function clear() {
    clearGrids()
    clearGridsAnimation()
    resetCPUShips()
    resetPlayerships()
    clearCellArrays()
    populateUnoccupiedCellsPlayer()
    direction = 'down'
    cpuPreviousAttackHit = -1
    currentAttack = []
    currentAttackHits = []
    disableBtns()
    enableStart()
  }

  function clearGrids() {
    for (let i = 0; i < occupiedCellsPlayer.length; i++) {
      const index = occupiedCellsPlayer[i]
      playerCells[index].classList.remove('shipPlacedMarker')
      playerCells[index].classList.add('normal')
    }
    for (let i = 0; i < cpuHitsTaken.length; i++) {
      const index = cpuHitsTaken[i]
      cpuCells[index].classList.remove('hit')
      cpuCells[index].classList.add('normal')
    }
    for (let i = 0; i < playerHitsTaken.length; i++) {
      const index = playerHitsTaken[i]
      playerCells[index].classList.remove('hit')
      playerCells[index].classList.add('normal')
    }
    for (let i = 0; i < playerMisses.length; i++) {
      const index = playerMisses[i]
      cpuCells[index].classList.remove('miss')
      cpuCells[index].classList.add('normal')
    }
    for (let i = 0; i < cpuMisses.length; i++) {
      const index = cpuMisses[i]
      playerCells[index].classList.remove('miss')
      playerCells[index].classList.add('normal')
    }
  }

  function clearGridsAnimation() {
    playerGridContainer.classList.add('shake')
    setTimeout(() => {
      playerGridContainer.classList.remove('shake')
    }, 2000)
    cpuGridContainer.classList.add('shake')
    setTimeout(() => {
      cpuGridContainer.classList.remove('shake')
    }, 2000)
  }

  function disableBtns() {
    setTimeout(() => {
      playerShipBtns.forEach(btn => btn.disabled = true)
      playerCells.forEach(btn => btn.disabled = true)
      cpuCells.forEach(btn => btn.disabled = true)
    }, 100)
  }

  function enableStart() {
    setTimeout(() => {
      start.disabled = false
      forfeit.disabled = true
      reset.disabled = true
    }, 100)
  }

  function clearCellArrays() {
    unoccupiedCellsPlayer.splice(0)
    occupiedCellsCPU.splice(0)
    occupiedCellsPlayer.splice(0)
    playerHitsTaken.splice(0)
    cpuHitsTaken.splice(0)
    cpuPreviousAttacks.splice(0)
    playerMisses.splice(0)
    cpuMisses.splice(0)
  }

  function resetCPUShips() {
    for (let i = 0; i < enemyShips.length; i++) {
      enemyShips[i].position = []
      enemyShips[i].hitsTaken = 0
    }
  }

  function resetPlayerships() {
    for (let i = 0; i < enemyShips.length; i++) {
      playerShips[i].position = []
      playerShips[i].hitsTaken = 0
    }
  }

  // ! Executions
  // ? Possibly use a timer to create a delay comp shot after player's shot

  // start() -> enable ship placement buttons
  function begin() {
    start.disabled = true
    reset.disabled = false
    placeCPUShips()
    unlockShipBtns()
    instructPlaceShips()
  }

  function instructPlaceShips() {
    commentary.innerText = 'Select a ship to begin!'
  }


  function unlockShipBtns() {
    playerShipBtns.forEach(btn => btn.disabled = false)
  }

  function unlockPlayerGrid() {
    playerCells.forEach(btn => btn.disabled = false)
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
    currentShipLength = currentShip.length
    unlockPlayerGrid()
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
    for (let i = 0; i < unoccupiedCellsPlayer.length; i++) {
      const index = unoccupiedCellsPlayer[i]
      playerCells[index].classList.remove('shipOutline')
      playerCells[index].classList.add('normal')
    }
  }

  function placeShip() {
    if ((direction === 'up' || direction === 'down') && withinLowerLimit(cellsRequiredToPlace) && withinUpperLimit(cellsRequiredToPlace) && occupiedCheck(cellsRequiredToPlace, occupiedCellsPlayer) === false) {
      console.log('')
      pushToPlayerArrays(cellsRequiredToPlace, currentShipIndex)
      playerShipBtns[currentShipIndex].disabled = true
      shipPlaced()
      resetCurrentShip()
      startBattle()

    } else if ((direction === 'left' || direction === 'right') && withinLowerLimit(cellsRequiredToPlace) && withinUpperLimit(cellsRequiredToPlace) && occupiedCheck(cellsRequiredToPlace, occupiedCellsPlayer) === false &&
      sameLine(cellsRequiredToPlace)) {
      pushToPlayerArrays(cellsRequiredToPlace, currentShipIndex)
      playerShipBtns[currentShipIndex].disabled = true
      shipPlaced()
      resetCurrentShip()
      startBattle()
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

  function shipPlaced() {
    for (let i = 0; i < cellsRequiredToPlace.length; i++) {
      const index = cellsRequiredToPlace[i]
      unoccupiedCellsPlayer.splice(unoccupiedCellsPlayer.indexOf(index), 1)
      playerCells[index].classList.remove('shipOutline')
      playerCells[index].classList.add('shipPlacedMarker')
    }
  }

  function playerAttacks() {
    playerAttack = parseInt(this.dataset.index)
    playerAttackResult = occupiedCellsCPU.includes(playerAttack)
    updateTargetCell()
    // lockEnemyGrid()
  }

  function updateTargetCell() {
    cpuCells[playerAttack].classList.remove('normal')
    if (playerAttackResult) {
      cpuCells[playerAttack].classList.add('hit')
      cpuHitsTaken.push(playerAttack)
      shipDestroyedCheck()
      playerWinCheck()
    } else {
      cpuCells[playerAttack].classList.add('miss')
      playerMisses.push(playerAttack)
      cpuAttacks()
    }
    cpuCells[playerAttack].disabled = true
  }

  function shipDestroyedCheck() {
    let searching = true
    let iterate = 0
    while (searching) {
      const foundIndexOfShipHit = enemyShips[iterate].position.includes(playerAttack)
      if (foundIndexOfShipHit) {
        enemyShips[iterate].hitsTaken++
        if (enemyShips[iterate].hitsTaken >= parseInt(enemyShips[iterate].length)) {
          console.log('ship destroyed')
          searching = false
        } else {
          searching = false
        }
      } else {
        iterate++
      }
    }
  }

  function playerWinCheck() {
    if (cpuHitsTaken.length >= 13) {
      lockEnemyGrid()
      forfeit.disabled = true
      console.log('Game Over')
    } else {
      cpuAttacks()
    }
  }

  function unlockEnemyGrid() {
    cpuCells.forEach(btn => btn.disabled = false)
  }

  function lockEnemyGrid() {
    cpuCells.forEach(btn => btn.disabled = true)
  }

  // computerShoots() if compPreviousShotHit < 0
  // TRUE, randCell on player grid, if compShots.includes(randCell) = true, restart function, else compShotCoordinate = randCell...
  // ELSE, compShotAfterHit()
  function cpuAttacks() {
    if (cpuPreviousAttackHit < 0) {
      let targeting = true
      while (targeting) {
        const randomCell = Math.floor(Math.random() * 100)
        if (cpuPreviousAttacks.includes(randomCell)) {
          targeting = true
        } else {
          cpuAttack = randomCell
          cpuPreviousAttacks.push(cpuAttack)
          cpuAttackResult = occupiedCellsPlayer.includes(cpuAttack)
          updateAfterFirstAttackHit()
          targeting = false
        }
      }
    } else {
      coordinatedAttack()
    }
  }

  function coordinatedAttack() {
    // If only one shot has hit on this attack, that hit was the prev shot fired and the cell above within grid and has not been trgted previously
    if (currentAttack.length === 1 && cpuPreviousAttackHit - width >= 0 && cpuPreviousAttacks.includes(cpuPreviousAttackHit - width) === false) {
      cpuAttack = cpuPreviousAttackHit - width
      // If prev shot was a hit, up, within grid and has not been trgted previously, try up again
    } else if (currentAttack[currentAttack.length - 1] === cpuPreviousAttackHit && currentAttackHits[currentAttackHits.length - 2] - currentAttackHits[currentAttackHits.length - 1] === 10 &&
      cpuPreviousAttackHit - width >= 0 && cpuPreviousAttacks.includes(cpuPreviousAttackHit - width) === false) {
      cpuAttack = currentAttackHits[currentAttackHits.length - 1] - width
      // If prev shot was up and a miss (a hit would have executed prev), the cell below is within the grid and not trgted previously OR prev shot was the 1st hit and up was invalid, try 1st down shot
    } else if (((currentAttack[currentAttack.length - 2] - currentAttack[currentAttack.length - 1]) === 10 &&
      currentAttackHits[0] + width <= 99 && cpuPreviousAttacks.includes(currentAttackHits[0] + width) === false) || ((currentAttack.length === 1 &&
        (cpuPreviousAttackHit - width < 0 || cpuPreviousAttacks.includes(cpuPreviousAttackHit - width) === true)) &&
        currentAttackHits[0] + width <= 99 && cpuPreviousAttacks.includes(currentAttackHits[0] + width) === false)) {
      cpuAttack = currentAttackHits[0] + width
      // If prev shot was down and a hit, the cell below is within the grid and not trgted previously, try another shot down
    } else if (currentAttack[currentAttack.length - 1] === cpuPreviousAttackHit && currentAttackHits[currentAttackHits.length - 1] % width === currentAttackHits[currentAttackHits.length - 2] % width &&
      cpuPreviousAttackHit + width <= 99 && cpuPreviousAttacks.includes(cpuPreviousAttackHit + width) === false) {
      cpuAttack = currentAttackHits[currentAttackHits.length - 1] + width
      // If prev missed (hit would have executed above), down, cell+1 is on the same line as the orign hit and not already trgted OR prev shot was the 1st hit and down was invalid, try 1st shot to the right
    } else if ((Math.abs(currentAttack[currentAttack.length - 1] - currentAttack[currentAttack.length - 2]) >= 10 &&
      (currentAttackHits[0] + 1) % width <= 9 && cpuPreviousAttacks.includes(currentAttackHits[0] + 1) === false) || ((currentAttack.length === 1 &&
        (currentAttackHits[0] + width > 99 || cpuPreviousAttacks.includes(currentAttackHits[0] + width) === true)) &&
        (currentAttackHits[0] + 1) % width <= 9 && cpuPreviousAttacks.includes(currentAttackHits[0] + 1) === false)) {
      cpuAttack = currentAttackHits[0] + 1
      // If prev shot was to the right and a hit and the cell to the right is on the same line and hasn't already been trgted, try right again
    } else if (currentAttack[currentAttack.length - 1] === cpuPreviousAttackHit && currentAttack[currentAttack.length - 1] - currentAttackHits[currentAttackHits.length - 2] === 1 &&
      (cpuPreviousAttackHit + 1) % width <= 9 && cpuPreviousAttacks.includes(cpuPreviousAttackHit + 1) === false) {
      cpuAttack = cpuPreviousAttackHit + 1
      // Only option remaining is left
      // ! added below if statement, switched order of left options
    } else if (currentAttackHits[0] % width !== 0 && cpuPreviousAttacks.includes(currentAttackHits[0] - 1) === false) {
      cpuAttack = currentAttackHits[0] - 1
      // !Added occupied checks to below conditional
    } else if ((currentAttack[currentAttack.length - 2] - currentAttack[currentAttack.length - 1] === 1 || currentAttackHits[0] - currentAttack[currentAttack.length - 1] === 1) &&
      cpuPreviousAttackHit - 1 % width !== 0 && cpuPreviousAttacks.includes(cpuPreviousAttackHit - 1) === false) {
      cpuAttack = cpuPreviousAttackHit - 1
      console.log(currentAttack[currentAttack.length - 2])
      console.log(currentAttack[currentAttack.length - 1])
      console.log(currentAttack[currentAttack.length - 2] - currentAttack[currentAttack.length - 1])
      console.log(currentAttackHits[0] + width)
      console.log(cpuPreviousAttacks.includes(currentAttackHits[0] + width) === false)

    } else {
      cpuPreviousAttackHit = -1
      cpuAttacks()
    }

    console.log(cpuAttack)
    cpuPreviousAttacks.push(cpuAttack)
    currentAttack.push(cpuAttack)
    console.log('current attack ->' + currentAttack)
    // checks if shot hits a target
    cpuAttackResult = occupiedCellsPlayer.includes(cpuAttack)
    updateFollowingCPUAttack()
    console.log('current attack hits ->' + currentAttackHits)
  }

  function updateAfterFirstAttackHit() {
    playerCells[cpuAttack].classList.remove('normal')
    // if a hit (confirmed in coordinated attack function, above)
    if (cpuAttackResult) {
      playerCells[cpuAttack].classList.add('hit')
      currentAttackHits.push(cpuAttack)
      playerHitsTaken.push(cpuAttack)
      cpuPreviousAttackHit = cpuAttack
      ifFirstHitUpdateCurrentAttack()
      playerShipDestroyedCheck()
      cpuWinCheck()
      console.log(currentAttack)
    } else {
      cpuMisses.push(cpuAttack)
      cpuPreviousAttackHit = -1
      playerCells[cpuAttack].classList.add('miss')
    }
  }

  function updateFollowingCPUAttack() {
    playerCells[cpuAttack].classList.remove('normal')
    // if a hit (confirmed in coordinated attack function, above)
    if (cpuAttackResult) {
      playerCells[cpuAttack].classList.add('hit')
      currentAttackHits.push(cpuAttack)
      playerHitsTaken.push(cpuAttack)
      cpuPreviousAttackHit = cpuAttack
      ifFirstHitUpdateCurrentAttack()
      playerShipDestroyedCheck()
      cpuWinCheck()
      console.log(currentAttack)
    } else {
      cpuMisses.push(cpuAttack)
      playerCells[cpuAttack].classList.add('miss')
    }
  }

  function ifFirstHitUpdateCurrentAttack() {
    console.log('current attack length in ternary ->' + currentAttack.length)
    console.log('current attack in ternary ->' + currentAttack)
    if (currentAttack.length === 0) {
      currentAttack.push(cpuAttack)
    }
  }

  function playerShipDestroyedCheck() {
    let searching = true
    let iterate = 0
    while (searching) {
      const foundIndexOfShipHit = playerShips[iterate].position.includes(cpuAttack)
      if (foundIndexOfShipHit) {
        playerShips[iterate].hitsTaken++
        if (playerShips[iterate].hitsTaken >= parseInt(playerShips[iterate].length)) {
          console.log('ship destroyed')
          playerShipDestroyed(iterate)
          searching = false
        } else {
          searching = false
        }
      } else {
        iterate++
      }
    }
  }

  function playerShipDestroyed(iterate) {
    cpuPreviousAttackHit = -1
    currentAttackHits = []
    currentAttack = []
    playerShipDestoredisuals(iterate)
  }

  function playerShipDestoredisuals(iterate) {
    commentary.innerText = 'Oh no, one of your ships has been destroyed!'
    playerShipBtns[iterate].classList.add('destroyed')
  }

  function cpuWinCheck() {
    if (playerHitsTaken.length >= 13) {
      forfeit.disabled = true
      lockEnemyGrid()
      console.log('CPU Wins!')
    }
  }

  // placeCompShips() -> for loop iterating through compShips[], place in + to - order, random number generated to choose first 
  // cell to try, checks if available by searching occupiedCellsComputer[]...
  function placeCPUShips() {
    for (let i = 0; i < 5; i++) {
      const shipSize = parseInt(enemyShips[i].length)
      const randomDirection = Math.floor(Math.random() * 4)

      // Up
      if (randomDirection === 0) {
        let looping = true
        let possiblePositon = []
        while (looping) {
          const randomCell = Math.floor(Math.random() * (100 - width * (shipSize - 1))) + width * (shipSize - 1)
          requiredCellsUp(randomCell, shipSize, possiblePositon)
          if (occupiedCheck(possiblePositon, occupiedCellsCPU) === false) {
            looping = false
            pushToArraysIfCellsAvilable(possiblePositon, i)
          } else {
            looping = true
            possiblePositon = []
          }
        }
      }

      // Down
      if (randomDirection === 1) {
        let looping = true
        let possiblePositon = []
        while (looping) {
          const randomCell = Math.floor(Math.random() * (100 - width * (shipSize - 1)))
          requiredCellsDown(randomCell, shipSize, possiblePositon)
          if (occupiedCheck(possiblePositon, occupiedCellsCPU) === false) {
            looping = false
            pushToArraysIfCellsAvilable(possiblePositon, i)
          } else {
            looping = true
            possiblePositon = []
          }
        }
      }

      // Right
      if (randomDirection === 2) {
        let looping = true
        let possiblePositon = []
        while (looping) {
          // Generate a random multiple of the width and add a random integer between 0 and the width - (shipsize -1). Simplify as - (shipsize - 1) = - shipsize + 1
          const randomCell = Math.floor(Math.random() * width) * width + Math.floor(Math.random() * (width - shipSize + 1))
          requiredCellsRight(randomCell, shipSize, possiblePositon)
          if (occupiedCheck(possiblePositon, occupiedCellsCPU) === false) {
            looping = false
            pushToArraysIfCellsAvilable(possiblePositon, i)
          } else {
            looping = true
            possiblePositon = []
          }
        }
      }

      // Left
      if (randomDirection === 3) {
        let looping = true
        let possiblePositon = []
        while (looping) {
          // Generate a random multiple of the width, add a random integer between 0 and the width shipsize + 1 and add shipsize - 1
          const randomCell = Math.floor(Math.random() * width) * width + Math.floor(Math.random() * (width - shipSize + 1)) + (shipSize - 1)
          requiredCellsLeft(randomCell, shipSize, possiblePositon)
          if (occupiedCheck(possiblePositon, occupiedCellsCPU) === false) {
            looping = false
            pushToArraysIfCellsAvilable(possiblePositon, i)
          } else {
            looping = true
            possiblePositon = []
          }
        }
      }
      console.log(enemyShips[i])
    }
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

  // Creates array of cells required to place ship from random cell UP and checks their availability 
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

  // ! Page load
  createGrids()

  populateUnoccupiedCellsPlayer()

  // ! Events

  start.addEventListener('click', begin)

  // playerCells buttons for placing ships
  playerCells.forEach(btn => {
    btn.addEventListener('click', placeShip)
  })
  playerCells.forEach(btn => {
    btn.addEventListener('mouseover', updateCurrentCell)
    btn.addEventListener('mouseover', updateCellsRequired)
    btn.addEventListener('mouseover', outlineCellsRequired)
    btn.addEventListener('mouseleave', clearSelection)
    btn.addEventListener('mouseleave', removeOutline)
  })

  cpuCells.forEach(btn => {
    btn.addEventListener('click', playerAttacks)
  })

  cpuCells.forEach(btn => btn.disabled = true)

  playerCells.forEach(btn => btn.disabled = true)


  reset.addEventListener('click', clear)
  reset.disable = true

  playerShipBtns.forEach(btn => btn.addEventListener('click', selectShip))
  playerShipBtns.forEach(btn => btn.disabled = true)

  document.addEventListener('keydown', rotate)
}

window.addEventListener('DOMContentLoaded', init)