function mover_object(x0, y0, x1, y1, w, h, heartbeat){
  this.w = w  ;
  this.h = h  ;
  this.x = x0 ;
  this.y = y0 ;
  this.x_old = this.x ;
  this.y_old = this.y ;
  this.medium = 1 ;

  this.x0 = x0 ;
  this.y0 = y0 ;
  this.x1 = x1 ;
  this.y1 = y1 ;
  this.heartbeat = heartbeat ;

  var d2 = (this.x1-this.x0)*(this.x1-this.x0) + (this.y1-this.y0)*(this.y1-this.y0) ;
  this.nSteps = 2*Math.sqrt(d2)*this.heartbeat ;

  this.update = function(){
    var steps = count%this.nSteps ;
    if(steps>=0.5*this.nSteps) steps = this.nSteps - steps ;

    this.x_old = this.x ;
    this.y_old = this.y ;

    var dx = this.x0 + (2*steps/this.nSteps)*(this.x1-this.x0) - this.x ;
    var dy = this.y0 + (2*steps/this.nSteps)*(this.y1-this.y0) - this.y ;

    if(this.holdingPlayer()){
      pc.x += dx ;
      pc.y += dy ;

      var playerMoved = true ;
      if(dy!=0){
        for(var i=pc.x-0.5*pw ; i<=pc.x+0.5*pw ; i++){
          if(W(i,pc.y-0.5*ph+1)==1 && dy<0){
            // Reset coordinates before painting out player
            pc.x -= dx ;
            pc.y -= dy ;
            killPlayer() ;
            playerMoved = false ;
            break ;
          }
          if(W(i,pc.y+0.5*ph-1)==1 && dy>0){
            // Player does not move
            pc.x -= dx ;
            pc.y -= dy ;
            playerMoved = false ;
            break ;
          }
        }
      }
      if(dx!=0){
        for(var i=pc.y-0.5*ph ; i<=pc.y+0.5*ph ; i++){
          if(W(pc.x+0.5*pw+1,i)==1 && dx>0){
            // Player does not move
            pc.x -= dx ;
            pc.y -= dy ;
            playerMoved = false ;
            break ;
          }
          if(W(pc.x-0.5*pw-1,i)==1 && dx<0){
            // Player does not move
            pc.x -= dx ;
            pc.y -= dy ;
            playerMoved = false ;
            break ;
          }
        }
      }
      if(playerMoved){
        var changeRoom = false ;
        if(pc.x<0){
          pc.A-- ;
          pc.x = cw*emptyRoom[0].length ;
          changeRoom = true ;
        }
        else if(pc.x>=cw*emptyRoom[0].length){
          pc.A++ ;
          pc.x = 0 ;
          changeRoom = true ;
        }
        if(pc.y<0){
          pc.B-- ;
          pc.y = ch*emptyRoom.length ;
          changeRoom = true ;
        }
        else if(pc.y>=ch*emptyRoom.length){
          pc.B++ ;
          pc.y = 0 ;
          changeRoom = true ;
        }
        if(changeRoom){
          movers = rooms[pc.B][pc.A].movers ;
          drawFullRoom = true ;
          roomCount = 0 ;
          pc.xIn = pc.x ;
          pc.yIn = pc.y ;
        }
      }
    }
    else if(this.overlapsPlayer()){
      this.collideWithPlayer() ;
    }
    this.x += dx ;
    this.y += dy ;
  }

  this.draw = function(){
    context.fillStyle = '#000000' ;
    context.fillRect(sx*(this.x_old-0.5*this.w),sy*(this.y_old-0.5*this.h),sx*this.w,sx*this.h) ;
    context.fillStyle = '#ff00ff' ;
    context.fillRect(sx*(this.x-0.5*this.w),sy*(this.y-0.5*this.h),sx*this.w,sy*this.h) ;
  }

  this.contains = function(X,Y){
    return (X>=this.x-0.5*this.w && X<=this.x+0.5*this.w && Y>=this.y-0.5*this.h && Y<=this.y+0.5*this.h) ;
  }

  this.holdingPlayer = function(){
    if( Math.abs( (this.y-0.5*this.h-1) - (pc.y+0.5*ph) ) > 0.1 ) return false ;
    if( this.x-0.5*this.w > pc.x+0.5*pw ) return false ;
    if( this.x+0.5*this.w < pc.x-0.5*pw ) return false ;
    return true ;
  }

  this.overlapsPlayer = function(){
    if(this.x-0.5*this.w > pc.x+0.5*pw) return false ;
    if(this.x+0.5*this.w < pc.x-0.5*pw) return false ;
    if(this.y-0.5*this.h > pc.y+0.5*ph) return false ;
    if(this.y+0.5*this.h < pc.y-0.5*ph) return false ;
    return true ;
  }

  this.collideWithPlayer = function(){
    // If the player is sitting on the mover, try to move the player with it
    pc.y = this.y - this.h - ph*0.5 - 2 ;
    // If pushing the player, see what happens
  }
}
