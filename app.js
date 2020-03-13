'use strict'



window.onload = () => {
  let view = createWorldView(Game.config.nRows, Game.config.nCols, Game.click)
  document.body.appendChild(view.panel)
  document.body.appendChild(view.element)
  setInterval(() => {
    Game.step()
    view.update(Game.world)
  }, Game.config.settings.stepTime)
}
