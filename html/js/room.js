var X_offset = 0 ;
var Y_offset = 0 ;

var nCols = 20 ;
var nRows = 15 ;
var cells = new Array()
for(var i=0 ; i<nRows ; i++){
  cells[i] = new Array() ;
  for(var j=0 ; j<nCols ; j++){
    cells[i][j] = new block() ;
  }
}

function empty_room(){ return new room_object('', null) ; }

function empty_row(){
  var emptyRow  = new Array() ;
  for(var i=0 ; i<nCols ; i++){ emptyRow.push( [0,0,0,0,0,[]] ) ; }
  return emptyRow ;
}

function room_object(name, rows, movers){
  if(name=='') name = 'Nothingness' ;
  this.name = name ;
  this.movers = movers ;
  if(rows==null){
    var emptyRows = new Array() ;
    for(var i=0 ; i<nRows ; i++){ emptyRows.push(new empty_row() )  ; }
    this.rows = emptyRows ;
  }
  else{
    this.rows = rows ;
  }
}

function try_insert_empty_room(){
  // See if the given room exists, and if it doesn't then insert the relevant row and column to make it exist
  if(pc.B>=0 && pc.B<rooms.length){
    if(pc.A>=0 && pc.A<rooms[pc.B].length) return ; // The room already exists
  }
  if(pc.A==-1){ // Add a new room to the start of each row
    for(var B_=0 ; B_<rooms.length ; B_++){
      rooms[B_].splice(0,0,new room_object('',null)) ;
    }
    X_offset++ ;
  }
  else if(pc.A==rooms[0].length){ // Add a new room to the end of each row
    for(var B_=0 ; B_<rooms.length ; B_++){
      rooms[B_].push(new room_object('',null)) ;
    }
  }
  if(pc.B==-1 || pc.B==rooms.length){ // Add a new row either before or after the existing rows
    var row = new Array() ;
    for(var A_=0 ; A_<rooms[0].length ; A_++){
      row.push(new room_object('',null)) ;
    }
    if(pc.B==-1){
      rooms.splice(0,0,row) ;
      Y_offset++ ;
    }
    else if(pc.B==rooms.length){
      rooms.push(row) ;
    }
  }
}

function get_room(){
  try_insert_empty_room() ;
  pc.A = A_from_X() ;
  pc.B = B_from_Y() ;
  return rooms[pc.B][pc.A] ;
}

function get_room_coords(A_,B_){
  var Atmp = pc.A ;
  var Btmp = pc.B ;
  pc.A = A_ ;
  pc.B = B_ ;
  try_insert_empty_room() ;
  pc.A = Atmp ;
  pc.B = Btmp ;
  return rooms[pc.B][pc.A] ;
}

//(Shape, Foreground pattern, Background pattern, Obstacle, Medium)
var default_block_settings = [1,0,1,0] ;
