// Update settings
var count     =     0 ; // How many updates have there been?
var roomCount =     0 ; // How many updates have there been since we entered this room?
var stop      =   -10 ; // When to stop (negative means never)
var delay     =    20 ; // Delay between updates
var ndp       =     3 ; // Number of decimal places to use
var freeze    =     0 ;

// Position
var A   =   1 ; // x component of room
var B   =   2 ; // y component of room
var x   = 460 ; // x position of player
var y   = 315 ; // y position of player

var canvas  ;
var context ;

var drawFullRoom = true  ;
var showMask     = false ;
var updateTheseCells = [] ;
var drawScale = 1.0 ;

var nDeaths = 0 ;

// Variables for ignoring gravity when on trampolines
var gravity_counter = 0 ;
var suppress_gravity = 0 ;

// Dimensions
var w  =  500 ; // canvas width
var h  =  500 ; // canvas height
var m  =   25 ; // margin
var cw =   25 ; // cell width
var ch =   25 ; // cell height
var s  =    1 ; // scale
var sx =    s ; // scale x
var sy =    s ; // scale y
var r  =   16 ; // radius of player

var mask_overlap = -1 ;
var mask = new Array() ;
for(var i=0 ; i<3*ch ; i++){
  mask[i] = new Array() ;
  for(var j=0 ; j<3*cw ; j++){
    mask[i][j] = 0 ;
  }
}

// Physics
var M   =  10 ; // mass of ball
var g   = 0.5 ; // gravity 0.4
var pw  = r ; // player width
var ph  = r ; // player height
var swim  =  2 ; // swimming speed
var walk  =  5 ; // walking speed
var jump  =  9 ; // jumping speed
var fly   =  4 ; // flying speed
var fall  =  9 ; // terminal falling speed
var climb =  5 ; // climbing speed

// Health etc
var health = 100 ;
var pain   = 0 ;

var nJumps        = 0 ;
var nAllowedJumps = 1 ;

// When did we last collide down?
var lastCollideDown = 0 ;
var lastCollideDownThreshold = 2 ;

var invisible_player = false ;

var dux =   0 ; // user x displacement of ball
var duy =   0 ; // user y displacement of ball
var vx  =   0 ; // x velocity of ball
var vy  =   0 ; // y velocity of ball
var ax  =   0 ; // x acceleration of ball
var ay  =   0 ; // y acceleration of ball
var fx  =   0 ; // x force on ball
var fy  =   0 ; // y force on ball
var fux =   0 ; // temporary (user) x force on ball
var fuy =   0 ; // temporary (user) y force on ball
var flyx = 10 ; // temporary (user) x force on ball in air
var vux =   0 ; // temporary (user) x velocity of ball
var vuy =   0 ; // temporary (user) y velocity of ball
var fu  =  10*M ; // temporary (user) y force on ball

var coordinates_object = function(){
  this.A   = 0 ; //  First level: Row in atlas
  this.B   = 0 ; //  First level: Column in atlas
  this.AA  = 0 ; // Second level: Row in room
  this.BB  = 0 ; // Second level: Column in room
  this.AAA = 0 ; //  Third level: Row in cell
  this.BBB = 0 ; //  Third level: Column in cell
  this.x   = 0 ; // Physical horizontal position (relative to lower left of room)
  this.y   = 0 ; // Physical vertical   position (relative to lower left of room)
  this.xIn = 0 ; // x when player entered the room
  this.yIn = 0 ; // y when player entered the room

  // Temporary values
  this.A_   = this.A   ;
  this.B_   = this.B   ;
  this.AA_  = this.AA  ;
  this.BB_  = this.BB  ;
  this.AAA_ = this.AAA ;
  this.BBB_ = this.BBB ;

  // Manage death fadeout
  this.dead = false ;
  this.xDeath = this.x ;
  this.yDeath = this.y ;

  update_coords = function(){
    this.AA  =  AAFromX(this.x) ;
    this.BB  =  BBFromY(this.y) ;
    this.AAA = AAAFromX(this.x) ;
    this.BBB = BBBFromY(this.y) ;
  }
}

// Player coordinates
var pc = new coordinates_object() ;
pc.A = A ;
pc.B = B ;
pc.x = x ;
pc.y = y ;
pc.xIn = pc.x ;
pc.yIn = pc.y ;
