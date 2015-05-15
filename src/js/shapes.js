// Shapes for cells

// Wrappers for drawing
function moveTo(x,y){ context.moveTo(sx*x,sy*y) ; }
function lineTo(x,y){ context.lineTo(sx*x,sy*y) ; }
function  fillRect(x,y,w,h){ context. fillRect(sx*x,sy*y,sx*w,sy*h) ; }
function clearRect(x,y,w,h){ context.clearRect(sx*x,sy*y,sx*w,sy*h) ; }

function lines_intersect(l1, l2){
  // Taken from http://local.wasp.uwa.edu.au/~pbourke/geometry/lineline2d/
  var x1 = l1[0][0] ;
  var y1 = l1[0][1] ;
  var x2 = l1[1][0] ;
  var y2 = l1[1][1] ;
  var x3 = l2[0][0] ;
  var y3 = l2[0][1] ;
  var x4 = l2[1][0] ;
  var y4 = l2[1][1] ;

  var denom  = (y4-y3)*(x2-x1)-(x4-x3)*(y2-y1) ;
  var numer1 = (x4-x3)*(y1-y3)-(y4-y3)*(x1-x3) ;
  var numer2 = (x2-x1)*(y1-y3)-(y2-y1)*(x1-x3) ;

  // Protect from division by 0 first
  if(denom==0) return 0 ;

  // Get ua and ub, test those
  var ua = numer1/denom ;
  var ub = numer2/denom ;
  if(0<ua && ua<1 && 0<ub && ub<1) return 1 ;

  // Looks like there's no intersection after all
  return 0 ;
}

function shape(id, name, polygon){
  this.id   = id ;
  this.name = name ;
  this.array_ = new Array() ;
  this.polygon = polygon ;
  for(var i=0 ; i<ch ; i++){
    this.array_[i] = new Array() ;
    for(var j=0 ; j<cw ; j++){
      this.array_[i][j] = 0 ;
    }
  }

  this.isSolid = function(X,Y){
    if(Y<0 || Y>=this.array_   .length) return -1 ;
    if(X<0 || X>=this.array_[Y].length) return -1 ;
    return this.array_[Y][X] ;
  }

  for(var i=0 ; i<ch ; i++){
    for(var j=0 ; j<cw ; j++){
      var l1 = [ [i+0.,j+0.5] , [i+0.0,j+100.5] ] ;
      var nIntersect = 0 ;
      for(var k=0 ; k<this.polygon.length-1 ; k++){
        var p1 = this.polygon[k] ;
        var p2 = this.polygon[k+1] ;
        var l2 = [ p1 , p2 ] ;
        nIntersect += lines_intersect(l1, l2) ;
      }
      // If there are an odd number of intersections then this point is inside the shape
      this.array_[j][i] = nIntersect%2 ;
    }
  }

  this.draw = function(context,x,y){
    moveTo(x+this.polygon[0][0], y+this.polygon[0][1]) ;
    for(i=1 ; i<this.polygon.length ; i++){
      lineTo(x+this.polygon[i][0], y+this.polygon[i][1]) ;
    }
  }
}

var shapes = new Array() ;

function get_shape(id){
  for(var i=0 ; i<shapes.length ; i++){
    if(shapes[i].id==id){
      return shapes[i]
    }
  }
  alert('Failed to find shape with id ' + id) ;
  return get_shape(15) ;
}

// Empty
var polygon = [ [0,0] , [0,0] ] ;
var E_0 = new shape(0, 'empty', polygon) ;

///////////////////////
// Filled rectangles //
///////////////////////
polygon = [ [0     ,0.5*ch] , [cw    ,0.5*ch] , [cw    ,ch] , [0     ,ch    ] , [0,0.5*ch] ] ; var R_12 = new shape(12, 'upper_rectangle' , polygon) ;
polygon = [ [0.5*cw,0     ] , [cw    ,0     ] , [cw    ,ch] , [0.5*cw,ch    ] , [0.5*cw,0] ] ; var R_14 = new shape(14, 'left_rectangle'  , polygon) ;
polygon = [ [0     ,0     ] , [cw    ,0     ] , [cw    ,ch] , [0     ,ch    ] , [0     ,0] ] ; var R_15 = new shape(15, 'centre_rectangle', polygon) ;
polygon = [ [0     ,0     ] , [0.5*cw,0     ] , [0.5*cw,ch] , [0     ,ch    ] , [0     ,0] ] ; var R_16 = new shape(16, 'right_rectangle' , polygon) ;
polygon = [ [0     ,0     ] , [cw    ,0     ] , [cw,0.5*ch] , [0     ,0.5*ch] , [0     ,0] ] ; var R_18 = new shape(18, 'lower_rectangle' , polygon) ;
polygon = [ [0     ,1     ] , [cw    ,1     ] , [cw  ,  ch] , [0     ,ch    ] , [0     ,1] ] ; var R_10 = new shape(10, 'centre_rectangle', polygon) ;


//////////////////////
// Filled triangles //
//////////////////////
polygon = [ [cw,0 ] , [cw,ch] , [0 ,ch] , [cw,0 ] ] ; var T_11 = new shape(11, 'upper_left_triangle' , polygon) ;
polygon = [ [0 ,0 ] , [cw,ch] , [0 ,ch] , [0 ,0 ] ] ; var T_13 = new shape(13, 'upper_right_triangle', polygon) ;
polygon = [ [0 ,0 ] , [cw,0 ] , [cw,ch] , [0 ,0 ] ] ; var T_17 = new shape(17, 'lower_left_triangle' , polygon) ;
polygon = [ [0 ,0 ] , [cw,0 ] , [0 ,ch] , [0 ,0 ] ] ; var T_19 = new shape(19, 'lower_right_triangle', polygon) ;

//////////////////
// Filled ramps //
//////////////////
polygon = [ [0 ,ch    ] , [cw,0.5*ch] , [cw,ch] , [0,ch ] ]               ; var R_21 = new shape(21, 'upper_left_ramp_short' , polygon) ;
polygon = [ [0 ,0.5*ch] , [cw,0     ] , [cw,ch] , [0,ch ] , [0 ,0.5*ch] ] ; var R_22 = new shape(22, 'upper_left_ramp_tall'  , polygon) ;
polygon = [ [cw,0.5*ch] , [0 ,0     ] , [0 ,ch] , [cw,ch] , [cw,0.5*ch] ] ; var R_23 = new shape(23, 'upper_right_ramp_tall' , polygon) ;
polygon = [ [cw,ch    ] , [0 ,0.5*ch] , [0 ,ch] , [cw,ch] ]               ; var R_24 = new shape(24, 'upper_right_ramp_short', polygon) ;
polygon = [ [0 ,0     ] , [cw,0.5*ch] , [cw,0 ] , [0 ,0 ] ]               ; var R_25 = new shape(25, 'lower_left_ramp_short' , polygon) ;
polygon = [ [0 ,0.5*ch] , [cw,ch    ] , [cw,0 ] , [0 ,0 ] , [0 ,0.5*ch] ] ; var R_26 = new shape(26, 'lower_left_ramp_tall'  , polygon) ;
polygon = [ [cw,0.5*ch] , [0 ,ch    ] , [0 ,0 ] , [cw,0 ] , [cw,0.5*ch] ] ; var R_27 = new shape(27, 'lower_right_ramp_tall' , polygon) ;
polygon = [ [cw,0     ] , [0 ,0.5*ch] , [0 ,0 ] , [cw,0 ] ]               ; var R_28 = new shape(28, 'lower_right_ramp_short', polygon) ;

polygon = [ [cw    ,0 ] , [cw,ch] , [0.5*cw,ch] , [cw,0 ] ]               ; var R_31 = new shape(31, 'upper_left_steep_ramp_short' , polygon) ;
polygon = [ [0     ,0 ] , [0 ,ch] , [0.5*cw,ch] , [0 ,0 ] ]               ; var R_32 = new shape(32, 'upper_right_steep_ramp_short', polygon) ;
polygon = [ [0.5*cw,0 ] , [cw,0 ] , [cw    ,ch] , [0 ,ch] , [0.5*cw,0 ] ] ; var R_33 = new shape(33, 'upper_left_steep_ramp_tall'  , polygon) ;
polygon = [ [0.5*cw,0 ] , [0 ,0 ] , [0     ,ch] , [cw,ch] , [0.5*cw,0 ] ] ; var R_34 = new shape(34, 'upper_right_steep_ramp_tall' , polygon) ;
polygon = [ [0.5*cw,ch] , [cw,ch] , [cw    ,0 ] , [0 ,0 ] , [0.5*cw,ch] ] ; var R_35 = new shape(35, 'lower_left_steep_ramp_short' , polygon) ;
polygon = [ [0.5*cw,ch] , [0 ,ch] , [0     ,0 ] , [cw,0 ] , [0.5*cw,ch] ] ; var R_36 = new shape(36, 'lower_right_steep_ramp_short', polygon) ;
polygon = [ [cw    ,0 ] , [cw,ch] , [0.5*cw,0 ] , [cw,0 ] ]               ; var R_37 = new shape(37, 'lower_left_steep_ramp_tall'  , polygon) ;
polygon = [ [0     ,ch] , [0 ,0 ] , [0.5*cw,0 ] , [0 ,ch] ]               ; var R_38 = new shape(38, 'lower_right_steep_ramp_tall' , polygon) ;

///////////////////////
// Octagonal corners //
///////////////////////
polygon = [ [0.5*cw,0] , [cw    ,0] , [cw,ch    ] , [0     ,ch] , [0,0.5*ch] , [0.5*cw,0] ] ; var O_41 = new shape(41, 'upper_left_octogan' , polygon) ;
polygon = [ [0     ,0] , [0.5*cw,0] , [cw,0.5*ch] , [cw    ,ch] , [0,ch    ] , [0     ,0] ] ; var O_43 = new shape(43, 'upper_right_octogan', polygon) ;
polygon = [ [0     ,0] , [cw    ,0] , [cw,ch    ] , [0.5*cw,ch] , [0,0.5*ch] , [0     ,0] ] ; var O_47 = new shape(47, 'lower_left_octogan' , polygon) ;
polygon = [ [0     ,0] , [cw    ,0] , [cw,0.5*ch] , [0.5*cw,ch] , [0,ch    ] , [0     ,0] ] ; var O_49 = new shape(49, 'lower_right_octogan', polygon) ;

polygon = [ [0.5*cw,ch] , [cw    ,ch] , [cw,0.5*ch] , [0.5*cw,ch] ] ; var O_42 = new shape(42, 'upper_left_octogan_triangle' , polygon) ;
polygon = [ [0     ,ch] , [0.5*cw,ch] , [0 ,0.5*ch] , [0     ,ch] ] ; var O_44 = new shape(44, 'upper_right_octogan_triangle', polygon) ;
polygon = [ [0.5*cw,0 ] , [cw    ,0 ] , [cw,0.5*ch] , [0.5*cw,0 ] ] ; var O_46 = new shape(46, 'lower_left_octogan_triangle' , polygon) ;
polygon = [ [0     ,0 ] , [0.5*cw,0 ] , [0 ,0.5*ch] , [0     ,0 ] ] ; var O_48 = new shape(48, 'lower_right_octogan_triangle', polygon) ;

//////////////
// L joints //
//////////////
polygon = [ [0,ch ] , [0 ,0.5*ch] , [0.5*cw,0.5*ch] , [0.5*cw,0 ] , [cw,0 ] , [cw,ch] , [0 ,ch ] ] ; var L_51 = new shape(51, 'upper_rectangle' , polygon) ;
polygon = [ [cw,ch] , [cw,0.5*ch] , [0.5*cw,0.5*ch] , [0.5*cw,0 ] , [0 ,0 ] , [0 ,ch] , [cw,ch ] ] ; var L_53 = new shape(53, 'left_rectangle'  , polygon) ;
polygon = [ [0,0  ] , [0 ,0.5*ch] , [0.5*cw,0.5*ch] , [0.5*cw,ch] , [cw,ch] , [cw, 0] , [0 ,0  ] ] ; var L_57 = new shape(57, 'centre_rectangle', polygon) ;
polygon = [ [cw,0 ] , [cw,0.5*ch] , [0.5*cw,0.5*ch] , [0.5*cw,ch] , [0 ,ch] , [0 , 0] , [cw ,0 ] ] ; var L_59 = new shape(59, 'right_rectangle' , polygon) ;

//////////////////////////////
// Populate array of shapes //
//////////////////////////////
shapes.push(E_0 ) ;

shapes.push(R_12) ;
shapes.push(R_14) ;
shapes.push(R_15) ;
shapes.push(R_16) ;
shapes.push(R_18) ;
shapes.push(R_10) ;

shapes.push(T_11) ;
shapes.push(T_13) ;
shapes.push(T_17) ;
shapes.push(T_19) ;

shapes.push(R_21) ;
shapes.push(R_22) ;
shapes.push(R_23) ;
shapes.push(R_24) ;
shapes.push(R_25) ;
shapes.push(R_26) ;
shapes.push(R_27) ;
shapes.push(R_28) ;

shapes.push(R_31) ;
shapes.push(R_32) ;
shapes.push(R_33) ;
shapes.push(R_34) ;
shapes.push(R_35) ;
shapes.push(R_36) ;
shapes.push(R_37) ;
shapes.push(R_38) ;

shapes.push(O_41) ;
shapes.push(O_42) ;
shapes.push(O_43) ;
shapes.push(O_44) ;
shapes.push(O_46) ;
shapes.push(O_47) ;
shapes.push(O_48) ;
shapes.push(O_49) ;

shapes.push(L_51) ;
shapes.push(L_53) ;
shapes.push(L_57) ;
shapes.push(L_59) ;
