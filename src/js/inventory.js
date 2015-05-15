var inventory      = new Array() ;
var inventorySlots = new Array() ;
var nInventorySlots = 10 ;
for(var i=0 ; i<nInventorySlots ; i++){
  inventory[i] = 0 ;
}

function addToInventory(item,image){
  var n = getEmptyInventorySlot() ;
  if(n==-1){
    alert('No space left in invetory!') ;
    return ;
  }
  Get('inventory_'+n).innerHTML='<img src="' + image + '"/>' ;
  inventory[n] = item ;
}

function getEmptyInventorySlot(){
  for(var i=0 ; i<nInventorySlots ; i++){
    if(inventory[i]==0) return i ;
  }
  return -1 ;
}

function isInInventory(item){
  for(var i=0 ; i<inventory.length ; i++){
    if(inventory[i]==item) return true ;
  }
  return false ;
}

function removeFromInventory(item){
  for(var i=0 ; i<inventory.length ; i++){
    if(inventory[i]==item){
      Get('inventory_'+i).innerHTML='' ;
      inventory[i] = 0 ;
    }
  }
}

