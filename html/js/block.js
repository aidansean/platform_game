// Blocks are defined by an array that specifies all their properties
// The array specifies all the information about the block:
// [S,F,B,M,O,T] (Shape, Foreground pattern, Background pattern, Obstacle, Medium)
// For example, triangle made of bricks against sky in the lower right of a block would be:
// [11,1,0,0,1,[]]

function block(){
  // Positional information:
  //   x and y
  //   A and B
  // Shape infomration:
  //   shape
  // Patterns information:
  //   foreground pattern
  //   background pattern
  // Obstacle information:
  //   obstacle (solid, climbable)
  //   medium (air, water, fire)
  // Things
  //   things is an array (order may matter)

  // In a cell:
  // S,F,B,O,M,[T]

  this.x = -1 ;
  this.y = -1 ;
  this.A = -1 ;
  this.B = -1 ;
  this.i = (this.x<0) ? -1 : this.x%cw ;
  this.j = (this.y<0) ? -1 : this.y%ch ;
  this.shape = null ;
  this.background = 0 ; // black
  this.foreground = 0 ; // black
  this.medium     = 0 ; // air
  this.obstacle   = 0 ; // none
  this.things = new Array() ;
  this.draw = function(force_draw_empty){
    if(this.shape_index==0){
      if(force_draw_empty==false && this.background==0) return ;
      if(this.background){
        context.fillStyle = this.background ;
      }
      else{
        context.fillStyle = '#000000' ;
      }
      fillRect(drawScale*this.x,drawScale*this.y,drawScale*cw,drawScale*ch) ;
      return ;
    }
    context.beginPath() ;
    // Fill in background with background pattern
    if(this.background){
      if(this.background.substring){
        context.fillStyle = this.background ;
        fillRect(drawScale*this.x,drawScale*this.y,drawScale*cw,drawScale*ch) ;
      }
      else{
        context.fillStyle = this.background[Math.floor(roomCount/10)%this.background.length] ;
        fillRect(drawScale*this.x,drawScale*this.y,drawScale*cw,drawScale*ch) ;
      }
    }
    // Fill in obstacle with foreground pattern
    if(this.foreground){
      context.fillStyle = this.foreground[Math.floor(roomCount/10)%this.foreground.length] ;
      this.shape.draw(context,this.x,this.y) ;
    }
    context.closePath() ;
    context.fill() ;
  } ;
  this.populate = function(inputs,i,j){
    this.shape_index = inputs[0] ;
    this.shape       = get_shape(inputs[0]) ;
    this.foreground  = patterns[inputs[1]] ;
    this.background  = colors[inputs[2]] ;
    if(inputs[2]>1000) this.background = patterns[inputs[2]-1000] ;
    this.obstacle    = inputs[3] ;
    this.medium      = inputs[4] ;
    this.things      = inputs[5] ;
    this.x = i*cw ;
    this.y = j*ch ;
  }
}
