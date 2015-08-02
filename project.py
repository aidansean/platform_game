from project_module import project_object, image_object, link_object, challenge_object

p = project_object('platform_game', 'Generic platform game')
p.domain = 'http://www.aidansean.com/'
p.path = 'platform_game'
p.preview_image    = image_object('%s/images/project.jpg'   %p.path, 150, 250)
p.preview_image_bw = image_object('%s/images/project_bw.jpg'%p.path, 150, 250)
p.folder_name = 'aidansean'
p.github_repo_name = 'platform_game'
p.mathjax = True
p.tags = 'Games'
p.technologies = 'canvas,CSS,HTML,JavaScript'
p.links.append(link_object(p.domain, '%s/play.php'%p.path, 'Live page (Play)'))
p.links.append(link_object(p.domain, '%s/edit.php'%p.path, 'Live page (Edit)'))
p.introduction = 'This project is something I\'ve been working for a long time and something I have wanted to develop for as long as I can remember.  It\'s a platform game strongly inspired by the BBC Micro game, Citadel.  (I have another project dedicated to mapping <a href="http://aidansean.com/projects/?p=141">Citadel</a>.)  When I was younger I would dream about playing non-existant extra levels in Citadel, and when I started recreational programming I would sometimes dream about making new levels for the game.'
p.overview = '''The game is organised into a two dimensional array of rooms, which are subsequently split into blocks.  Each block is then specified using a shape, foreground, background, obstacle, medium, and objects.  The medium can be air, water, fire, solid rock etc, and the obstacle is wall, ladder etc.  The foreground and background are purely cosmetic.  The objects are things like coins, doors, keys etc.

Motion is controlled using the keyboard and is handled on a pixel-by-pixel basis.  The function defining the motion are very loosely inspired by <a href="http://www.codeproject.com/Articles/22423/Tom-s-Halls-A-JavaScript-Platform-Game-Engine"></a>, although all the code and algorithms are my own.  The player is modeled by a rectangle which is moved across the blocks pixel by pixel, searching for collisions.  When a collision is detected movement is stopped along that axis.  If movement along the other axis means there is no longer a collision then movement along the first axis resumes.  This is how collisions were handled in Citadel, and was something I wanted to replicate.  When the collision happens at \(45\deg\) the ambiguity is resolved by the direction of movement of the player.  (For example if the player is moving down along the \(y\) axis and collides with a corner the player will move down instead of horizontally.)  The movement was initially monitored using a "mask" of pixels surrounding the player, with a special mask view for debugging, but this has since been retired due to the huge CPU demands.

This game is in progress, so at the moment there is very limited functionality.  The physics engine is pretty much complete, although it would benefit from some optimisations.  The main environment types have already been developed, including air, water, solid, fire, and ladder.  A few extra features have been added including trampolines and the double jump feature.  The features I was working on when I paused development were interactions with objects and the inventory, and adding a "pain" feature instead of instant death (another feature of Citadel that I very much enjoyed.)

The game has an editor so that the developer can "draw" rooms onto the canvas directly instead of writing things in a text editor, as it was arranged initially.  This speeds up content writing a lot, but there are almost certainly some features that need to be added to make this better, and probably a handful of bugs that need to be fixed as well.

When the player or editor goes into a room that does not exist, a new room with the name "Nothingness" is automatically added to the map.  This is very important because players always find new ways to break the map.  In fact this is something that was handled very well in the original Citadel, although it did lead to a serious exploit, where players could "fall off of the edge of the map" and end up elsewhere.

This game needs some more development, but already it has potential to be very interesting.  As well as adding more content and assets it's necessary to optimise the game play so that it can be played on lower end computers.'''

p.challenges.append(challenge_object('This game needed a decent physics engine.', 'This was my first time writing a physics engine, and being a physicist I thought it would be easy.  I was wrong.  I love classical physics and its inherent beauty, but writing code for a classical physics enging is hard.  I started out with a ball bouncing around a square room, followed by adding gravity, then adding player controls.  I built up the model step by step until I had something reasonabe and intuitive.  It was a very informative experience.', 'Resolved, to be revisited'))

p.challenges.append(challenge_object('The rooms needed to have some kind of model that was both versatile and had good performance.', 'I built the rooms out of blocks.  Each block had a shape and this allows the developer to create a detailed room for the game, as well as having pixel perfect control over the player\'s movements.  however this comes at the cost of performance, so some additional gains needs to made with the physics engine.  The versatility of the room design is excellent and I am very happy with the amount of creative freedom the developer has in assembling the rooms.', 'Resolved'))

p.challenges.append(challenge_object('The double jump feature needed to be added.', 'One of the options I wanted to add was a double (and triple etc) jump to make some areas accessible only once this feature is enabled.  Doing this meant keeping track of how many jumps had already been made, and from what kind of surface.  This was not a trivial thing to do and it helped make the physics engine more robust.', 'Resolved'))

p.challenges.append(challenge_object('The rooms has to be stored in an array, which could be turned into a map.', 'Storing the rooms in an array makes it easier to access them and reduces memory usage.  At the same time it means keeping track of additional coordinates which brings their own problem  As the player (or game developer) moves into new rooms, new rows and columns are added to the array, meaning that indices must be updated.  This caused a few bugs, but was finally resolved.  The developer also has access to a map of the rooms, which is something I may add for the player as well.', 'Resolved'))

p.challenges.append(challenge_object('This game requires quite a bit of pixel art.', 'The style of the art in this game is heavily inspired by Citadel, but there are other parts I made myself.  The pixel art used to make the blocks was made using the <a href="http://aidansean.com/projects/?p=284">Painter</a> project, which was in fact written explicitly for this game..', 'Resolved'))

