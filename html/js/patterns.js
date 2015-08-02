var image_clouds       = new Image() ;
var image_ladder       = new Image() ;
var image_bricks       = new Image() ;
var image_water_top    = new Image() ;
var image_fire_top_1   = new Image() ;
var image_fire_top_2   = new Image() ;
var image_door_blue    = new Image() ;
var image_key_blue     = new Image() ;
var image_spring       = new Image() ;
var image_coin_1_large = new Image() ;
image_clouds.src       = 'images/clouds.jpg'        ;
image_ladder.src       = 'images/ladder_cy.png'     ;
image_bricks.src       = 'images/bricks.png'        ;
image_bricks.src       = 'images/mosiac_purple.png' ;
image_water_top.src    = 'images/water_top.png'     ;
image_fire_top_1.src   = 'images/fire_top_1.png'    ;
image_fire_top_2.src   = 'images/fire_top_2.png'    ;
image_door_blue.src    = 'images/door_blue.png'     ;
image_key_blue.src     = 'images/key_blue.png'      ;
image_spring.src       = 'images/spring.png'        ;
image_coin_1_large.src = 'images/coin_1_large.png'  ;

function createPatterns(){
  patterns[1] = new pattern_collection(['images/bricks.png'       ]) ;
  patterns[2] = new pattern_collection(['images/water_top.png'    ]) ;
  patterns[3] = new pattern_collection(['images/fire_top_1.png','images/fire_top_2.png']) ;
  patterns[4] = new pattern_collection(['images/ladder_cy.png'    ]) ;
  patterns[5] = new pattern_collection(['images/door_blue.png'    ]) ;
  patterns[6] = new pattern_collection(['images/key_blue.png'     ]) ;
  patterns[7] = new pattern_collection(['images/mosiac_purple.png']) ;
  patterns[8] = new pattern_collection(['images/spring.png'       ]) ;
  patterns[9] = new pattern_collection(['images/coin_1_large.png' ]) ;
}

function pattern_collection(paths){
  var results = [] ;
  for(var i=0 ; i<paths.length ; i++){
    var image = new Image() ;
    image.src = paths[i] ;
    results.push(context.createPattern(image,'repeat')) ;
  }
  return results ;
}

var patterns = new Array() ;


