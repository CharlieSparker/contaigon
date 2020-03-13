let createWorldView = (nRows, nCols, onClick) => {
  let cells   = [] // 2d array of cells stored column-first
  let element = document.createElement('div')
  let panel = document.createElement('div')
  panel.classList.add('panel')
  element.classList.add('world')

  // Initialise by creating all the rows and cells in them
  for(let i=0; i<nCols; i++) {
    let column = []
    for(let j=0; j<nRows; j++) {
      let cell = document.createElement('div')
      cell.classList.add('cell')
      cell.style.gridColumn = `${i+1}`
      cell.style.gridRow    = `${j+1}`
      cell.onclick = () => onClick(i, j)
      column.push(cell)
      element.appendChild(cell)
    }
    cells.push(column)
  }

  function update(world) {
    for(let i=0; i<nCols; i++) {
      for(let j=0; j<nRows; j++) {
        let cell = cells[i][j]
        if(world[i][j]) {
          (world[i][j]===1) ? cell.classList.add('on'): cell.classList.add('out')
        } else {
          cell.classList.remove('on')
        }
      }
    }
  }


  return { cells, element, update, panel }
}
