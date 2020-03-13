let Game = (() => {

  const chance = (perc) => !Math.floor(Math.random()* (100/perc));
  //returns true if perc% roll hits, ie 20% will hit 1 true for every 4 false
  let config = {
    nRows: 32,
    nCols: 32,
    settings: {
      pInfect: 37,
      pRecover: 100,
      pStartInfected: 50,
      pStartRemoved: 1,
      stepTime: 100,
    }

  }
  function settingAdvanced(setting) {
    return { id, name, curVal, interval, minVal, maxVal }
  }

  let world = [] // 2d array of binary-valued cells, stored such that world[x][y] = 0 or 1 or 2

  // create all the cells and set their initial value to 0
  for(let i=0; i<config.nCols; i++) {
    let column = []
    for(let j=0; j<config.nRows; j++)
      chance(config.settings.pStartRemoved) ? column.push(2):
      chance(config.settings.pStartInfected) ? column.push(1): column.push(0);
    world.push(column)
  }


  /* step - update the game world
   *
   * this function is called periodically
   */
  function step() {
    //takes snapshot of world, updates result of 20% chance of infection for each cell uninfected + near infected cells,
    const clone = (arr) => arr.map(ele => Array.isArray(ele) ? clone(ele) : ele);
    let oldWorld = clone(world);
    for(let i=0; i<config.nCols; i++) {
      for(let j=0; j<config.nRows; j++) {
        let up = (i>0) ? oldWorld[i-1][j]:undefined;
        let down = (i<config.nCols-1) ? oldWorld[i+1][j]:undefined;
        let left = (j>0) ? oldWorld[i][j-1]:undefined;
        let right = (j<config.nRows-1) ? oldWorld[i][j+1]:undefined;
        if (oldWorld[i][j]) {
          //percentage chance infected cell heals
          if(oldWorld[i][j]===1) {
            chance(config.settings.pRecover) ? world[i][j]=0: world[i][j]=1;
          }
        } else if (up==1||down==1||left==1||right==1) {
          //percentage chance uninfected cell next to infected cell(s) also gets infected
            chance(config.settings.pInfect) ? world[i][j]=1:world[i][j]=0;
          }
        }
      }
  }


  function click(x, y) {
    if (world[x][y]!==2) {
      world[x][y] = 1
    }
  }

  return { click, config, step, world }
})()
