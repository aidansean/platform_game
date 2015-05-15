function clear(){ clearRect(0,0,w,h) ; }
function drawRoom(){
  var room = get_room_coords(pc.A,pc.B).rows ;
  var AA = AAFromX(pc.x) ;
  var BB = BBFromY(pc.y) ;
  var AAStart = (AA==0)                ? AA : AA-1 ;
  var BBStart = (BB==0)                ? BB : BB-1 ;
  var AAEnd   = (AA==room[0].length-1) ? AA : AA+1 ;
  var BBEnd   = (BB==room   .length-1) ? BB : BB+1 ;
  if(drawFullRoom==true){
    AAStart = 0 ;
    BBStart = 0 ;
    AAEnd   = room[0].length-1 ;
    BBEnd   = room.length-1 ;
    context.fillStyle = color_room ;

    updateTheseCells = [] ;
    fillRect(0-cw,0-ch,w+2*cw,h+2*ch) ;
    for(var i=AAStart ; i<=AAEnd ; i++){
      for(var j=BBStart ; j<=BBEnd ; j++){
        var added_cell = false ;
        switch( room[j][i][3] ){
          case 3:
          updateTheseCells.push([i,j]) ;
          added_cell = true ;
          break ;
          default:
          break ;
        }
        if(added_cell) continue ;
        switch( room[j][i][4] ){
          case 3:
          updateTheseCells.push([i,j]) ;
          break ;
          default:
          break ;
        }
      }
    }
  }
  for(var i=AAStart ; i<=AAEnd ; i++){
    for(var j=BBStart ; j<=BBEnd ; j++){
      if(drawFullRoom==false){
      	clearRect(i*cw,j*ch,cw,ch) ;
      	context.fillStyle = color_room ;
      	fillRect(i*cw,j*ch,cw,ch) ;
      }
      if(j>=room   .length || j<0) continue ;
      if(i>=room[j].length) continue ;

      if(room[j][i]){
        cells[j][i].populate(room[j][i],i,j) ;
        cells[j][i].draw() ;
      }
    }
  }
  //alert(updateTheseCells.length) ;
  for(var i=0 ; i<updateTheseCells.length ; i++){
    var m = updateTheseCells[i][1] ;
    var n = updateTheseCells[i][0] ;
    cells[m][n].populate(room[m][n],n,m) ;
    cells[m][n].draw() ;
  }
}
function drawSquare(){
  if(invisible_player) return ;
  if(pc.dead){
    context.fillStyle = 'rgb(' + (6*(freeze+1)) + ',' + (6*(freeze+1)) + ',' + (6*(freeze+1)) + ')' ;
    fillRect(pc.xDeath-pw*0.5,pc.yDeath-ph*0.5,2*pw*0.5+1,2*ph*0.5+1) ;
    context.fillStyle = 'rgb(0,' + (6*freeze) + ',0)' ;
    fillRect(pc.xDeath-pw*0.5+1,pc.yDeath-ph*0.5+1,2*pw*0.5-1,2*ph*0.5-1) ;
  }
  else{
    context.fillStyle = 'rgb(255,255,255)' ;
    fillRect(pc.x-pw*0.5,pc.y-ph*0.5,2*pw*0.5+1,2*ph*0.5+1) ;
    context.fillStyle = color_square ;
    fillRect(pc.x-pw*0.5+1,pc.y-ph*0.5+1,2*pw*0.5-1,2*ph*0.5-1) ;
  }
}
function erasePlayer(){
  drawRoom() ;
}
function drawGrid(){
  context.lineWidth = 0.5 ;
  context.beginPath() ;
  for(var i=1 ; i<=nCols ; i++){
    moveTo(i*spacing, 0 ) ;
	lineTo(i*spacing, ch) ;
  }
  for(var i=1 ; i<=nRows ; i++){
    moveTo(0 , i*spacing) ;
	lineTo(cw, i*spacing) ;
  }
  context.stroke() ;
}
function drawMovers(){
  for(var i=0 ; i<movers.length ; i++){
    movers[i].draw() ;
  }
}
function draw(){
  if(drawFullRoom){
    clear() ;
    Get('room_name').innerHTML = get_room_coords(pc.A,pc.B).name ;
  }
  drawRoom() ;
  drawMovers() ;
  drawSquare() ;
  drawFullRoom = false ;
}
