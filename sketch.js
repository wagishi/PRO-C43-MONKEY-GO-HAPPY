var backImage,backgr;
var player, player_running;
var ground,ground_img;

var END =0;
var PLAY =1;
var gameState = PLAY;
var score = 0;
var banana;
var FoodGroup;
var spawnfood;
var obstacle;
var spwanObstacle;


function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaImage = loadImage("banana.png");
  stone = loadImage("stone.png");
  gameOver = loadImage("gameOver.png");
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;

  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.25;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;
  
  FoodGroup = new Group();
  obstacleGroup = new Group();
}

function draw() { 
  background(0);

  if(gameState===PLAY){
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }

  spawnfood();

    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);

    spwanObstacle();
    
    if(obstacleGroup.isTouching(player)){
     gameState = END;
   }
 }else if(gameState === END){
         backgr.velociyX = 0;
         player.visible = false;

         obstacleGroup.destroyEach();
         FoodGroup.destroyEach();

         textSize(30);
         fill (255);
         text("Game Over !!",300,200);

  }

  drawSprites();
  fill ("black");
  textSize(25);
  text("Score : "+score, 600,100);
}

function spawnfood(){
  if(frameCount %80 === 0){
    var banana = createSprite(600,250,40,10);
    banana.y = random(50,200);
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -4;

    banana.lifetime = 150;
    player.depth = banana.depth + 1;
    FoodGroup.add(banana);
  }
  for(var i=0;i<FoodGroup.length;i++){

    if(FoodGroup.get(i).isTouching(player)){
       FoodGroup.get(i).destroy();
       score = score+2
      }
    }
}

function spwanObstacle(){
  if(frameCount % 100 === 0){
    var obstacle = createSprite(750,340,40,40);
    obstacle.addImage(stone);
    obstacle.scale = 0.3;
    obstacle.velocityX = -6;
    obstacle.lifetime = 150;
    obstacleGroup.add(obstacle);
  }
}
