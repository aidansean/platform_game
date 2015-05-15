var emptyRoom = 0 ;
var movers = [] ;

function start(){
  emptyRoom = get_room_coords(-1,-1).rows ;
  canvas  = Get('canvas') ;
  context = canvas.getContext('2d') ;

  document.addEventListener('keydown', keyDown, false) ;
  document.addEventListener('keyup'  , keyUp  , false) ;
  window.setTimeout('delayed_start()',1000,false) ;
  
  Get('button_save_image').addEventListener('click', save_image, false) ;
}

function delayed_start(){
  if(document.URL.split('?').length==1) window.location = document.URL + '?' ;
  createPatterns() ;
  update() ;
  save_image() ;
}

function update(){
  pain = 0 ;
  count++ ;
  roomCount++ ;
  if(count>=stop && stop>=0) return ;
  if(freeze>0){ freeze-- ; }
  else{
    if(pc.dead) drawFullRoom = true ;
    pc.dead = false ;
    applyPhysics() ;
    update_stats() ;
  }
  draw() ;
  if(false){
    var string = '' ;
    for(var i=0 ; i<mask.length ; i++){
      for(var j=0 ; j<mask[i].length ; j++){
        string = string + ' ' + mask[i][j] ;
      }
      string = string + '<br />\n' ;
    }
    Get('debug').innerHTML = string ;
  }

  window.setTimeout('update()', delay) ;
}

function update_stats(){
  if(pain>1e-6) health = health - 0.1 ;
  Get('health' ).innerHTML = sprintf('%d'  ,health) ;
  Get('pain'   ).innerHTML = sprintf('%.2f',pain  ) ;
  Get('AB'     ).innerHTML = pc.A + ',' + pc.B ;
  Get('xy'     ).innerHTML = Math.floor(pc.x) + ',' + Math.floor(pc.y) ;
  Get('deaths' ).innerHTML = nDeaths ;
}

function save_image(){
  invisible_player = true ;
  window.setTimeout('do_save_image()', 2*delay) ;
  window.setTimeout('make_player_visible()', 2*delay) ;
}
function do_save_image(){
  var dataURL = canvas.toDataURL('image/png') ;
  Get('canvas_img').src = dataURL ;
}
function make_player_visible(){
  invisible_player = false ;
}

// Helper functions
function Get(id){ return document.getElementById(id) ; }
function Create(type) { return document.createElement(type) ; }
