var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage, cloudImage,ob1,ob2,ob3,ob4,ob5,ob6;
var cloudGroup,obstaclesGroup;
var PLAY=1;
var END=0;
var gameState = PLAY;
var gameover, gameoverImage;
var restart, restartImage;
var score = 0;
function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  cloudImage = loadImage("cloud.png");
  ob1 = loadImage("obstacle1.png");
  ob2 = loadImage("obstacle2.png");
  ob3 = loadImage("obstacle3.png");
  ob4 = loadImage("obstacle4.png");
  ob5 = loadImage("obstacle5.png");
  ob6 = loadImage("obstacle6.png");
  gameoverImage = loadImage("gameOver.png");
  restartImage = loadImage("restart.png");
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided",trex_collided);
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
   cloudGroup = new Group();
   obstaclesGroup = new Group();
  
  gameover = createSprite(300,70);
  gameover.addImage(gameoverImage);
  gameover.visible = false;
  restart = createSprite(300,120);
  restart.addImage(restartImage);
  restart.scale = 0.7;
  restart.visible = false;
}

function draw() {
  background(220,200,0);
  if(gameState===PLAY) {
     if(keyDown("space") && trex.y>=160 ) {
    trex.velocityY = -10;
  }
     // console.log(trex.y)
  trex.velocityY = trex.velocityY + 0.8
   if (ground.x < 0  ){
    ground.x = ground.width/2;  
  
  }
   ground.velocityX = -(3 + score/100);
    spawnClouds()
  
  spawnObstacles()
    if(obstaclesGroup.isTouching(trex)){
       gameState = END;
       }
    score = score + Math.round(getFrameRate()/60);
     }
  else if(gameState===END) {
         ground.velocityX = 0;
          obstaclesGroup.setVelocityXEach(0);
         cloudGroup.setVelocityXEach(0);
        trex.velocityY = 0;
         trex.changeAnimation("collided",trex_collided);
         obstaclesGroup.setLifetimeEach(-1);
         cloudGroup.setLifetimeEach(-1);
    
        gameover.visible = true;
        restart.visible = true;
        if(mousePressedOver(restart)){
           reset();
           }
          }
 
 
  
  trex.collide(invisibleGround);
  
  
  
  drawSprites();
  textSize(18);
  text("score" + score,500,20);
  
}

function spawnClouds() {
  if(frameCount%80===0) {
var cloud = createSprite(600,30,10,10);
  cloud.addImage(cloudImage);
    cloud.y = random(10,150);
   cloud.velocityX = -(3 + score/100);
    cloud.lifetime = 200;
    trex.depth = cloud.depth + 1;
    cloudGroup.add(cloud);
    //console.log(cloud.depth)
}
}

function spawnObstacles(){
if(frameCount%100===0) {
   var obstacle = createSprite(600,160,10,10);
   obstacle.velocityX = -(3 + score/100);
  obstacle.scale = 0.5;
  obstacle.lifetime = 200;
  obstaclesGroup.add(obstacle);
  var ran = Math.round(random(1,6));
  switch(ran){
    case 1:obstacle.addImage(ob1);
      break;
      case 2:obstacle.addImage(ob2);
      break;
      case 3:obstacle.addImage(ob3);
      break;
      case 4:obstacle.addImage(ob4);
      break;
      case 5:obstacle.addImage(ob5);
      break;
      case 6:obstacle.addImage(ob6);
      break;
      default:break;
  }
   }
}
function reset() {
  gameState = PLAY;
  trex.changeAnimation("running", trex_running);
  gameover.visible = false;
  restart.visible = false;
  obstaclesGroup.destroyEach();
  cloudGroup.destroyEach();
  score = 0;
  
}




