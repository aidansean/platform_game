
function drawMask(){
  var AA = AAFromX(x) ;
  var BB = BBFromY(y) ;
  var AAStart = (AA==0) ? 0 : -1 ;
  var BBStart = (BB==0) ? 0 : -1 ;
  var AAEnd   = (AA==rooms[0][0][0][0].length-1) ? 0 :  1 ;
  var BBEnd   = (BB==rooms[0][0][0]   .length-1) ? 0 :  1 ;
  context.fillStyle = 'rgba(255,255,255,0.8)' ;
  for(var iAA=AAStart ; iAA<=AAEnd ; iAA++){
    for(var iBB=BBStart ; iBB<=BBEnd ; iBB++){
      fillRect((AA+iAA)*cw,(BB+iBB)*ch,cw,ch) ;
    }
  }
}

// from function "start()":
  if(showMask){
    var tbody = Get("tbody_mask") ;
    for(var i=0 ; i<mask[0].length ; i++){
      var tr = Create('tr') ;
      tbody.appendChild(tr) ;
      tr.id = 'tr_mask_' + i ;
      for(var j=0 ; j<mask.length ; j++){
        var td = Create('td') ;
        td.id = 'td_mask_' + i + '_' + j ;
        td.className = 'mask' ;
        td.innerHTML = '&nbsp;' ;
        td.style.backgroundColor = 'white' ;
        tr.appendChild(td) ;
      }
    }
  }


// from function "update()":
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