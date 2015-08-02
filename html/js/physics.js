function  AAFromX(X){ return Math.floor(X/cw)    ; }
function  BBFromY(Y){ return Math.floor(Y/ch)    ; }
function AAAFromX(X){ return Math.abs((X+cw)%cw) ; }
function BBBFromY(Y){ return Math.abs((Y+ch)%ch) ; }
function W(X,Y){
  var A_  = pc.A ;
  var B_  = pc.B ;
  var AA  =  AAFromX(X) ;
  var BB  =  BBFromY(Y) ;
  var AAA = AAAFromX(X) ;
  var BBB = BBBFromY(Y) ;
  var otherRoom = (X<0) ;
  // Transition to different rooms
  if(BB>=emptyRoom.length){
    B_++ ;
    BB = 0 ;
  }
  else if(BB<0){
    B_-- ;
    BB = emptyRoom.length-1 ;
  }
  if(AA>=emptyRoom[BB].length){
    A_++ ;
    AA = 0 ;
  }
  else if(AA<0){
    A_-- ;
    AA = emptyRoom[BB].length-1 ;
  }

  // Empty rooms
  if(B_<0 || B_>=rooms    .length) return 0 ;
  if(A_<0 || A_>=rooms[B_].length) return 0 ;

  // Real rooms
  //var the_room = get_room_coords(A_,B_) ;
  var the_room = rooms[B_][A_] ;
  var value = the_room.rows[BB][AA] ;
  // Shorthand for things
  if(value==0) return 0 ;
  if(value.length==1){
    var shape = get_shape(value) ;
    result = (shape.isSolid(AAA,BBB)) ;
  }
  else{
    var shape = get_shape(value[0]) ;
    result = (shape.isSolid(AAA,BBB)) ? the_room.rows[BB][AA][3] : the_room.rows[BB][AA][4] ;
  }
  return result ;
}

function populateMask(){
  var AA = AAFromX(pc.x) ;
  var BB = BBFromY(pc.y) ;
  mask_overlap = 0 ;
  for(var i=0 ; i<mask.length ; i++){
    for(var j=0 ; j<mask[i].length ; j++){
      var X = (AA-1)*cw+j ;
      var Y = (BB-1)*ch+i ;
      mask[i][j] = W(X,Y) ;
      for(var k=0 ; k<movers.length ; k++){
        if(movers[k].contains(X,Y)){
          mask[i][j] = movers[k].medium ;
        }
      }
      if(X>=pc.x-pw*0.5 && X<=pc.x+pw*0.5 && Y>=pc.y-ph*0.5 && Y<=pc.y+ph*0.5){
        if(mask[i][j]>0) mask_overlap++ ;
      }
    }
  }
}

function placeMovers(){
  for(var k=0 ; k<movers.length ; k++){
    movers[k].update() ;
  }
}

function overlap(X,Y){
  var AA = AAFromX(pc.x) ;
  var BB = BBFromY(pc.y) ;
  var isClimbing = 0 ;
  var isSwimming = 0 ;
  var overlap = 0 ;
  for(var i=0 ; i<mask.length ; i++){
    for(var j=0 ; j<mask[i].length ; j++){
      var X_ = (AA-1)*cw+j ;
      var Y_ = (BB-1)*ch+i ;
      if(X_>=X-pw*0.5 && X_<=X+pw*0.5 && Y_>=Y-ph*0.5 && Y_<=Y+ph*0.5){
        switch(mask[i][j]){
        case 2:
          isSwimming++ ;
          break ;
        case 3:
          pain++ ;
          break ;
        case 4:
          isClimbing++ ;
          break ;

        // Items
        case 5:
          // 5 (door)
          if(!isInInventory(6)) overlap++ ;
          break ;
        case 6:
          // 6 (key)
          break ;

        //
        default:
          if(mask[i][j]>0) overlap++ ;
        }
      }
    }
  }
  return overlap ;
}

function vSteps(){
  var v2 = vx*vx+vy*vy ;
  if(v2<1e-6){ return ; }
  var v = Math.ceil(Math.sqrt(v2)) ;

  var vx_sign = (vx<0) ? -1 : 1 ;
  var vy_sign = (vy<0) ? -1 : 1 ;
  var X = pc.x ;
  var Y = pc.y ;
  if(Math.abs(vx)<2){
    for(var i=0 ; i<Math.abs(vy) ; i++){
      var Y0 = Y ;
      Y = pc.y+i*vy_sign ;
      if(overlap(X,Y)>0){
        if(overlap(X-1,Y)==0){
          X-- ;
        }
        else if(overlap(X+1,Y)==0){
          X++ ;
        }
        else{
          pc.x = X  ;
          pc.y = Y0 ;
          return ;
        }
      }
    }
    pc.y = Y ;
    pc.x = X ;
    return ;
  }
  if(Math.abs(vy)<2){
    for(var i=0 ; i<Math.abs(vx) ; i++){
      var X0 = X ;
      X = pc.x+i*vx_sign ;
      if(overlap(X,Y)>0){
        if(overlap(X,Y-1)==0){
          Y-- ;
        }
        else if(overlap(X,Y+1)==0){
          Y++ ;
        }
        else{
          pc.x = X0 ;
          pc.y = Y  ;
          return ;
        }
      }
    }
    pc.x = X ;
    pc.y = Y ;
    return ;
  }

  var vxr = Math.abs(vx/v) ;
  var vyr = Math.abs(vy/v) ;

  var xStep = 0 ;
  var yStep = 0 ;
  for(var i=0 ; i<=v ; i++){
    var X0 = X ;
    var Y0 = Y ;
    X = pc.x+Math.floor(i*vxr)*vx_sign ;
    Y = pc.y+Math.floor(i*vyr)*vy_sign ;
    var overlap_X  = overlap(X ,Y0) ;
    var overlap_Y  = overlap(X0,Y ) ;
    var overlap_XY = overlap(X ,Y ) ;
    if(overlap_XY>0){
      if(vy>0){ // Are we moving up or down?
        // Moving down
        // Try moving down before moving to the side
        if(overlap_Y==0){
          X = X0 ;
        }
        else if(overlap_X==0){
          Y = Y0 ;
        }
        else{
          X = X0 ;
          Y = Y0 ;
        }
      }
      else{
        // Moving up or stationary
        // Try moving to the side before moving up
        if(overlap_X==0){
          Y = Y0 ;
        }
        else if(overlap_Y==0){
          X = X0 ;
        }
        else{
          X = X0 ;
          Y = Y0 ;
        }
      }
    }
  }
  pc.x = X ;
  pc.y = Y ;
}

function vxmax(){
  if(onWater() || inWater()) return swim  ;
  if(onClimbable()) return climb ;
  for(var xi=-pw*0.5 ; xi<=pw*0.5 ; xi++){
    var w = W(pc.x+xi,pc.y+ph*0.5+1) ;
    switch(w){
      case 1:
      case 11:
      case 13:
      case 17:
      case 19:
        return walk ;
        break ;
      default : break ;
    }
  }
  return fly ;
}
function vymax(){
  if(inWater())     return swim  ;
  if(onClimbable()) return climb ;
  return fall ;
}
function friction(){
  if(inWater()){
    return 0.05 ;
  }
  else if(onClimbable()){
    return 0.25 ;
  }
  return 0 ;
}

function applyPhysics(){
  // Apply forces
  fx = 0 ;
  if(collideDown() || onClimbable()) fy = 0 ;
  if(gravity_counter>0){
    gravity_counter-- ;
    fy = 0 ;
  }
  else{
    fy = g ;
  }
  if(onClimbable()) fy = 0 ;

  vx += fx ;
  vy += fy ;

  if(vuy!=0){
    vy += vuy ;
    if(!onClimbable()) vuy = 0 ;
  }

  // Slow vx and vy
  vy = vy*(1-friction()) ;

  // Trampoline
  if(onSolid() || onClimbable() || inWater()) suppress_gravity = 0 ;
  if(onTrampoline()){
    if(depressed_buttons['up'   ]){
      vy = -jump ;
      suppress_gravity = suppress_gravity+5 ;
      if(suppress_gravity>25) suppress_gravity = 25 ;
    }
    else if(depressed_buttons['down' ]){
      suppress_gravity = 0 ;
      vy = 0 ;
    }
    else{
      vy = -vy ;
    }
    gravity_counter = suppress_gravity ;
  }
  if(inWater()){
    if(depressed_buttons['up'   ]){
      vy = -swim ;
    }
    else if(depressed_buttons['down' ]){
      vy = swim ;
    }
    if(depressed_buttons['left' ]){
      vx = -swim ;
    }
    else if(depressed_buttons['right']){
      vx = swim ;
    }
  }
  if(onClimbable()){
    if(depressed_buttons['up'   ]){
      vy = -climb ;
    }
    else if(depressed_buttons['down' ]){
      vy = climb ;
    }
    if(depressed_buttons['left' ]){
      vx = -climb ;
    }
    else if(depressed_buttons['right']){
      vx = climb ;
    }
  }
  if(onSolid()){
    if(depressed_buttons['left' ]){
      vx = -walk ;
    }
    else if(depressed_buttons['right']){
      vx = walk ;
    }
  }

  // Cap speed
  if(vx<-vxmax()) vx = -vxmax() ;
  if(vx> vxmax()) vx =  vxmax() ;
  if(vy<-vymax()) vy = -vymax() ;
  if(vy> vymax()) vy =  vymax() ;

  // Update various counters for fudging controls
  lastCollideDown++ ;

  // Find new position
  placeMovers() ;
  populateMask() ;
  vSteps() ;

  // Change rooms if necessary
  var AA  =  AAFromX(pc.x) ;
  var BB  =  BBFromY(pc.y) ;
  var AAA = AAAFromX(pc.x) ;
  var BBB = BBBFromY(pc.y) ;
  var changeRoom = false ;
  if(pc.x<0){
    pc.A-- ;
    pc.x = cw*emptyRoom[0].length+pc.x ;
    changeRoom = true ;
  }
  else if(pc.x>=cw*emptyRoom[0].length){
    pc.A++ ;
    pc.x = pc.x%cw ;
    changeRoom = true ;
  }
  if(pc.y<0){
    pc.B-- ;
    pc.y = ch*emptyRoom.length+pc.y ;
    changeRoom = true ;
  }
  else if(pc.y>=ch*emptyRoom.length){
    pc.B++ ;
    pc.y = pc.y%ch ;
    changeRoom = true ;
  }
  if(changeRoom){
    movers = rooms[pc.B][pc.A].movers ;
    drawFullRoom = true ;
    roomCount = 0 ;
    pc.xIn = pc.x ;
    pc.yIn = pc.y ;
  }

  // Check for items
  switch(W(pc.x,pc.y)){
  case 3:
    pain = 1 ;
    break ;
  case 5:
    if(isInInventory(6)){
      rooms[pc.B][pc.A][0][BB][AA] = [0] ;
      removeFromInventory(6) ;
    }
    break ;
  case 6:
    rooms[pc.B][pc.A][0][BB][AA] = [0] ;
    addToInventory(6,'images/key_blue.png') ;
    break ;
  }
  if(pain!=0) killPlayer() ;
}
function collideDown(){
  if(vx!=0 && lastCollideDown<lastCollideDownThreshold) return true ;
  for(var i=0 ; i<movers.length ; i++){
    if(movers[i].holdingPlayer()){
      vy = 0 ;
      lastCollideDown = 0 ;
      return true ;
    }
  }
  for(var xi=-pw*0.5 ; xi<=pw*0.5 ; xi++){
    var w = W(pc.x+xi,pc.y+ph*0.5+1) ;
    switch(w){
      case 2:
      case 4:
        break ;
      default:
        switch(w){
        case 2:
        case 3:
        case 4:
        case 6:
          break ;
        case 8:
          vy = 0 ;
          lastCollideDown = 0 ;
          return true ;
          break ;

        default:
          if(w>0){
            vy = 0 ;
            lastCollideDown = 0 ;
            return true ;
          }
          break ;
      }
    }
  }
  return false ;
}

function killPlayer(){
  nDeaths++ ;
  erasePlayer() ;
  pc.dead = true ;
  pc.xDeath = pc.x ;
  pc.yDeath = pc.y ;
  pc.x = pc.xIn ;
  pc.y = pc.yIn ;
  roomCount = 0 ;
  freeze = 40 ;
  vx = 0 ;
  vy = 0 ;
}

function isSolid(X,Y){
  var type = W(X,Y) ;
  switch(type){
    case 1: return true ; break ;
    case 5:
      for(var i=0 ; i<inventory.length ; i++){
  		if(inventory[i]==6){
  		  return false ;
  		  break ;
  		}
  	  }
  	  return true ; break ;
    default : return false ; break ;
  }
}
function onSolid(){
  if(W(pc.x,pc.y+ph*0.5+1)==1) return true ;
  return false ;
}
function onClimbable(){
  if(isClimbable(W(pc.x,pc.y+ph*0.5+1))) return true ;
  return false ;
}
function isClimbable(type){
  if(canFly()) return true ;
  switch(type){
  case 2:
  case 4:
    return true ; break ;
  default : return false ; break ;
  }
}
function inWater(){
  if(W(pc.x,pc.y)==2) return true ;
  return false ;
}
function onWater(){
  if(W(pc.x,pc.y+0.5*ph+1)==2) return true ;
  return false ;
}
function onTrampoline(){
  if(W(pc.x,pc.y+0.5*ph+1)==8) return true ;
  return false ;
}

function canFly(){
  return false ;
}
function canJump(){
  if(nJumps>=nAllowedJumps) return false ;
  if(nJumps>0){
    if(suppress_gravity>0) return false ;
    nJumps++;
    return true ;
  }
  for(var i=0 ; i<movers.length ; i++){
    if(movers[i].holdingPlayer()){
      nJumps++;
      return true ;
    }
  }
  if(collideDown()){
    nJumps++;
    return true ;
  }
  return false ;
}
