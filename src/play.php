<?php
$title = 'Generic platform game' ;
$js_scripts = array() ;
$js_scripts[] = 'js/sprintf.js'    ;
$js_scripts[] = 'js/settings.js'   ;
$js_scripts[] = 'js/colors.js'     ;
$js_scripts[] = 'js/patterns.js'   ;
$js_scripts[] = 'js/shapes.js'     ;
$js_scripts[] = 'js/inventory.js'  ;
$js_scripts[] = 'js/physics.js'    ;
$js_scripts[] = 'js/draw.js'       ;
$js_scripts[] = 'js/controls.js'   ;
$js_scripts[] = 'js/block.js'      ;
$js_scripts[] = 'js/room.js'       ;
$js_scripts[] = 'js/movers.js'     ;
$js_scripts[] = 'js/rooms_data.js' ;
$js_scripts[] = 'js/main.js'       ;
$stylesheets = array('style.css') ;
include_once($_SERVER['FILE_PREFIX'] . '/_core/preamble.php') ;
?>

<h2 id="room_name"></h2>
<canvas id="canvas" width="500" height="375"></canvas>
<table id="stats">
  <tbody>
    <tr><th>xy</th><td id="xy"></td></tr>
    <tr><th>AB</th><td id="AB"></td></tr>
    <tr><th>Health</th> <td id="health"></td></tr>
    <tr><th>Pain</th>   <td id="pain"  ></td></tr>
    <tr><th>Deaths</th> <td id="deaths"  ></td></tr>
  </tbody>
</table>

<h2>Inventory</h2>
<table id="inventory">
  <tbody>
    <tr>
      <td class="inventory" id="inventory_0">&nbsp;</td>
      <td class="inventory" id="inventory_1">&nbsp;</td>
      <td class="inventory" id="inventory_2">&nbsp;</td>
      <td class="inventory" id="inventory_3">&nbsp;</td>
      <td class="inventory" id="inventory_4">&nbsp;</td>
      <td class="inventory" id="inventory_5">&nbsp;</td>
      <td class="inventory" id="inventory_6">&nbsp;</td>
      <td class="inventory" id="inventory_7">&nbsp;</td>
      <td class="inventory" id="inventory_8">&nbsp;</td>
      <td class="inventory" id="inventory_9">&nbsp;</td>
      <td class="inventory" id="inventory_10">&nbsp;</td>
      <td class="inventory" id="inventory_11">&nbsp;</td>
      <td class="inventory" id="inventory_12">&nbsp;</td>
    </tr>
  </tbody>
</table>

<h2>Screengrab</h2>
<button id="button_save_image" onclick="save_image()">Save image</button>
<div id="debug"></div>
<img id="canvas_img" width="500px" height="375px"/>
<?php foot() ; ?>
