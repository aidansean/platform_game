var depressed_buttons = new Array() ;
depressed_buttons['up'   ] = false ;
depressed_buttons['down' ] = false ;
depressed_buttons['left' ] = false ;
depressed_buttons['right'] = false ;
depressed_buttons['space'] = false ;

function keyDown(e){
  if(collideDown()) nJumps = 0 ;
  var keyDownID = window.event ? event.keyCode : (e.keyCode != 0 ? e.keyCode : e.which) ;
  switch(keyDownID){
    case 37: case 65: case 97:           // Left
    case 39: case 68: case 100:          // Right
    case 32: case 38: case 87: case 119: // Up
    case 40: case 83: case 115:          // Down
      e.preventDefault() ;
      break ;
  }
  switch(keyDownID){
    case 37: case 65: case 97: // Left
      depressed_buttons['left' ] = true ;
      if(inWater()){
        vx = -swim ;
      }
      else if(collideDown()){
        fux = -fu ;
        vx  = -walk ;
      }
      else{
        fux = -flyx ;
        vx  = -walk ;
      }
      break ;

    case 39: case 68: case 100: // Right
      depressed_buttons['right'] = true ;
      if(inWater()){
        vx = swim ;
      }
      else if(collideDown()){
        fux =  fu ;
        vx  = walk ;
      }
      else{
        fux = flyx ;
        vx  = walk ;
      }
      break ;

    case 32: case 38: case 87: case 119:// Up
      depressed_buttons['up'   ] = true ;
      if(inWater()){
        vuy = -swim ;
      }
      else if(canJump()){
        vuy = -jump ;
      }
      else if(onClimbable()){
        vuy = -walk ;
      }
      break ;

    case 40: case 83: case 115: // Down
      depressed_buttons['down' ] = true ;
      vy = walk ;
      if(inWater()){
        vuy = swim ;
      }
      else if(onClimbable()){
        vuy = walk ;
      }
      break ;
  }
}
function keyUp(e){
  var keyDownID = window.event ? event.keyCode : (e.keyCode != 0 ? e.keyCode : e.which) ;
  switch(keyDownID){
    case 37: case 65: case 97:           // Left
    case 39: case 68: case 100:          // Right
    case 32: case 38: case 87: case 119: // Up
    case 40: case 83: case 115:          // Down
    case 27:                             // Escape
      e.preventDefault() ;
      break ;
  }
  switch(keyDownID){
    case 37: case 65: case 97: // Left
      depressed_buttons['left' ] = false ;
      vx  = 0 ;
      vux = 0 ;
      fx  = 0 ;
      break ;

    case 39: case 68: case 100: // Right
      depressed_buttons['right'] = false ;
      vx  = 0 ;
      vux = 0 ;
      fx  = 0 ;
      break ;

    case 32: case 38: case 87: case 119:// Up
      depressed_buttons['up'   ] = false ;
      if(onClimbable()){
        vy = 0 ;
      }
      vuy = 0 ;
      break ;

    case 40: case 83: case 115: // Down
    depressed_buttons['down' ] = false ;
      if(onClimbable()){
        vy = 0 ;
      }
      vuy = 0 ;
      break ;

    case 27: // Escape
      killPlayer() ;
      break ;
  }
}
